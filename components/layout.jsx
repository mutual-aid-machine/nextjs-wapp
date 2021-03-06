import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '../lib/hooks';
import { mergeLeft } from 'ramda';
import Navbar from 'react-bootstrap/Navbar';
const description = "mutual aid aid is means of connecting people for mutual aid."
const defaultFont = "'DM Serif Display'";
const handleLogoutUncurried = (mutate) => () => {
	fetch('/api/auth', {
		method: 'DELETE',
	}).then(() => mutate(null));
};

const colors = {
	pink: '#d2738b',
	'light-teal': '#80d3d0',
	'lighter-teal': '#78aca8',
	'teal': '#4d8d89',
	'yellow': '#d8e27c',
	white: '#ffffff',
};

export const wildColor = c => {
	// https://paletton.com/#uid=35s0u0keusT5fMy9E-UjEnGoNiv
	switch(c) {
		case 'pink':
			return '#d2738b';
		case 'light-teal':
			return '#80d3d0';
		case 'lighter-teal':
			return '#78aca8';
		case 'teal':
			return '#4d8d89';
		case 'yellow':
			return '#d8e27c';
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

export const WildLink = ({
	href, title, color, component = null, long = false, style: pStyle = {}
}) => {
	const width = long ? '100%' : 'fit-content';
	const style = mergeLeft(wildStyle({color, width}), pStyle);
	const className = `wildin-at-${color}`;

	const text = component ? (
		<component style={style}>
			<a>
				{title}
			</a>
		</component>
	) : (
		<h3 style={style}>
			<a style={style}>
				{title}
			</a>
		</h3>
	);

	return (
		<Link href={href}>
			{text}
		</Link>
	);
};

export const MeNavBar = ({
	title, user, handleLogout
}) => {
	const {Brand} = Navbar;
	const signInOutButtons = !user ? (
		<>
			<WildLink
				href="/login"
				title='Sign in'
				color='yellow'
				component={props => <p {...props}/>}
			/>
			<WildLink
				href="/signup"
				title='Sign up'
				color='yellow'
				component={props => <p {...props}/>}
			/>
		</>
	) : (
		<>
			<WildLink
				href="/profile"
				title='Profile'
				color='yellow'
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
	const isntLightest = c => !c.includes('est');
  return (
    <>
      <style jsx global>
        {`
          a {
            text-decoration: none !important;
            cursor: pointer;
            color: ${wildColor('teal')};
						background-color: #000;
						padding: 5px;
          }
					a:hover {
						color: ${wildColor('light-teal')};
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
						font-family: ${defaultFont};
						font-size: 1.17em;
            display: block;
            margin-bottom: 0.5rem;
            color: ${wildColor('yellow')};
            border: none;
            background-color: #000;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 5px 25px;
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
        <title>Mutual Aid Aid</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content={description}
        />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta
          property="og:description"
          content={description}
        />
				{/*
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
				*/}
      </Head>
      <header>
				<MeNavBar
					title={title}
					user={user}
					handleLogout={handleLogout}
				/>
      </header>
      <main>{children}</main>
      <footer>
      </footer>
    </>
  );
};
