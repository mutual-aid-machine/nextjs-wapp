import { useFormik } from 'formik';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { adjust, findIndex, mergeLeft, omit, propEq } from 'ramda';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { fields, textyTypes } from '../lib/form-fields';
import { useUser } from '../lib/hooks';
import Geocoder from 'react-mapbox-gl-geocoder';

const FormRow = ({children, _id, label}) => {
	const { Row, Label } = Form;
	return (
		<Row>
			<Label
				htmlFor={_id}
			>{label}</Label>
			{children}
			<style jsx>{`
				.form-row {
					padding-bottom: 5px;
				}
			`}</style>
		</Row>
	);
};

const FormControl = ({
	_id, description, value, handleChange, handleBlur,
	options = [''],
	required = false,
	rows = 2,
	errors = {},
	type = 'text',
}) => {
	const {Control} = Form;
	const common = {
		required, value,
		name: _id,
		id: _id,
		placeholder: description,
		onChange: handleChange,
		onBlur: handleBlur,
	};

	const control = textyTypes.includes(type) ? (
		<Control
			{...common}
			type={type}
			isInvalid={errors[_id]}
		/>
	) : type === 'textarea' ? (
		<Control
			{...common}
			as={type}
			rows={rows}
		/>
	) : type === 'select' ? (
		<Control
			{...common}
			as={type}
			size='sm'
		>
			{options.map(s => (
				<option key={`${_id}-${s}`}>
					{s}
				</option>
			))}
			<style jsx>{`
				select {
					margin 0 0 0 8px;
				}
			`}</style>
		</Control>
	) : (
		<div>bottom text</div>
	);

	return control;
};

export const MyForm = ({handleSave, errorMsg, role}) => {
	const formFields = adjust(
		findIndex(propEq('_id', 'role')) (fields),
		mergeLeft({initialValue: role}),
		fields
	);
	const {Control, Group} = Form;
	const viewport = {};
	const [address, setAddress] = useState();
	const [geometry, setGeometry] = useState();
	const [geographyContext, setGeographyContext] = useState();
	const handleGeocoderSelect = (viewport, item) => {
		const {place_name, geometry, context} = item;
		setAddress(place_name);
		setGeometry(geometry);
		setGeographyContext(context);
	};
	const formik = useFormik({
		initialValues: Object.fromEntries(
			formFields.map(({_id, initialValue = ''}) => [_id, initialValue])
		),
		//TODO otherStuff
		onSubmit: ({email, password, name, ...profile}, otherStuff) => {
			handleSave({
				email, password, name, profile: mergeLeft({
					address, geometry, geographyContext,
				}, profile),
			});
		},
	});
	const {values, handleChange, handleBlur} = formik;
	return (
		<form onSubmit={formik.handleSubmit}>
			<Group>
				{errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
				{fields.map(f => (
					<FormRow key={f._id} _id={f._id} label={f.label}>
						<FormControl
							{...f}
							value={values[f._id]}
							handleChange={handleChange}
							handleBlur={handleBlur}
						/>
					</FormRow>
				))}
				<FormRow
					_id='address'
					label='Address *'
				>
					<Geocoder
						//TODO .env
						mapboxApiAccessToken={'pk.eyJ1IjoibXV0dWFsLWFpZC1tYWNoaW5lIiwiYSI6ImNrODB5MDkzazA0enYzZXA0ZWR6YzRoMjAifQ.rcm8hbqaYNN4B47JkKasiQ'}
						onSelected={handleGeocoderSelect}
						inputComponent={props => (
							<Control 
								required={true} 
								placeholder={'Wherever you\'re comfortable meeting us.'} 
								{...props}
							/>
						)}
						viewport={viewport}
						hideOnSelect={false}
						updateInputOnSelect={true}
					/>
				</FormRow>
				<button type="submit">Sign up</button>
				<style>{`
					button {
						margin-top: 4px;
						margin-left: 3px;
					}
				`}</style>
			</Group>
		</form>
	);
};

const SignupPage = () => {
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
	const {query: {role}} = useRouter();
	const [form, setForm] = useState(null);

	const handleSave = async ({email, name, password, profile}) => {
		const finalRole = profile.role || role;
		const body = {
			email, name, password, profile: omit(
				['confirmPassword'], 
				mergeLeft({role: finalRole}, profile)
			)
		};
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
			const text = await res.text();
			console.error(text);
      setErrorMsg(text);
    }
	};

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/');
  }, [user]);

	useEffect(() => {
		setForm(role ? (
			<MyForm
				handleSave={handleSave}
				errorMsg={errorMsg}
				role={role}
			/>
		) : null);
	}, [role, errorMsg]);

  return (
    <>
      <Head>
        <title>Sign up</title>
				<link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
					integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
					crossOrigin="anonymous"
				/>
      </Head>
      <div>
        <h2>Sign up</h2>
				{form}
      </div>
    </>
  );
};

export default SignupPage;
