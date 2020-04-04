import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '../lib/hooks';
import { mergeLeft } from 'ramda';
import Navbar from 'react-bootstrap/Navbar';
const handleLogoutUncurried = (mutate) => () => {
	fetch('/api/auth', {
		method: 'DELETE',
	}).then(() => mutate(null));
};
export const wildColor = c => {
	switch(c) {
		case 'pink':
			return '#d2738b';
		case 'teal':
			return '#559a82';
		case 'green':
			return '#c9dd79';
		default:
			return '#ffffff';
	}
};
export const wildStyle = ({color = 'white', width = 'fit-content'} = {}) => ({
	width,
	color: wildColor(color),
	background: 'black',
	padding: '5px',
	// fontStyle: 'italic',
});

//color in pink | teal | green
export const WildLink = ({
	href, title, color, component, long = false, style: pStyle = {}
}) => {
	const style = mergeLeft(wildStyle({
		color,
		width: long ? '100%' : 'fit-content'
	}), pStyle);

	const text = component ? (
		<component style={style}>{title}</component>
	) : (
		<h3 style={style}>{title}</h3>
	);

	return (
		<Link href={href}>
			<a>
				{text}
			</a>
		</Link>
	);
};

export const MeNavBar = ({
	title, user
}) => {
	const {Brand} = Navbar;
	const signInOutButtons = !user ? (
		<>
			<WildLink
				href="/login"
				title='Sign in'
				color='green'
				component={props => <p {...props}/>}
			/>
			<WildLink
				href="/signup"
				title='Sign up'
				color='green'
				component={props => <p {...props}/>}
			/>
		</>
	) : (
		<>
			<WildLink
				href="/profile"
				title='Profile'
				color='green'
				component={props => <p {...props}/>}
			/>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<a tabIndex={0} role="button" onClick={handleLogout}>
				Logout
			</a>
		</>
	);

	return (
		<Navbar>
			<Brand>
				<WildLink 
					href='/'
					title={title}
					color='pink'
					style={{
						fontWeight: 'bold',
					}}
					component={props => <h1 {...props} />}
				/>
			</Brand>
			<div>
				{signInOutButtons}
			</div>
		</Navbar>
	);
};

export default ({ children }) => {
  const [user, { mutate }] = useUser();
	const title = 'Mutual Aid Aid';
	const handleLogout = handleLogoutUncurried(mutate);
  return (
    <>
      <style jsx global>
        {`
          a {
            text-decoration: none !important;
            cursor: pointer;
            color: #0070f3;
          }
          a:hover {
            color: #0366d6;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: 'DM Serif Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
						font-size: 1.5em;
            background-color: #fff;
          }
          h2 {
            color: #333;
            text-align: center;
          }
          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
					/*
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
					*/
          input,
          textarea {
            font-family: monospace;
            flex: 1 1 0%;
            margin-left: 0.5rem;
            box-shadow: none;
            width: 100%;
            color: #000;
            background-color: transparent;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            outline: 0px;
            padding: 10px 25px;
          }
          button {
            display: block;
            margin-bottom: 0.5rem;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #000;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 10px 25px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
          }
          button:hover,
          button:active {
            transform: translate3d(0px, -1px, 0px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          header {
            border-bottom: 1px solid #d8d8d8;
          }
          nav {
            max-width: 1040px;
            margin: auto;
            padding: 1rem 2rem;
          }
          nav div {
            float: right;
          }
          nav div a {
            font-size: 0.9rem;
            margin-left: 1rem;
          }
          nav h1 {
            font-size: 1rem;
            color: #444;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
          main {
            padding: 1rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          footer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
        `}
      </style>
      <Head>
        <title>Next.js + MongoDB App</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta
          property="og:description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <header>
				<MeNavBar
					title={title}
					user={user}
				/>
      </header>
      <main>{children}</main>
      <footer>
      </footer>
    </>
  );
};
