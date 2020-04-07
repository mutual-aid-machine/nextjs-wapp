import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';
export const sendHomeIfDefined = (user, router, home = '/home') => { if (user) router.push(home); };

const formMargin = 8;

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();
  // useEffect(() => sendHomeIfDefined(user, router), [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
			res.json();
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <div
					style={{
						paddingLeft: `${formMargin}px`,
						display: 'flex',
					}}
				>
        	<button type="submit">Sign in</button>
        	<div
						style={{
							paddingLeft: '10px'
						}}
					>
        		<Link href="/forgot-password">
        		  <a>Forgot password</a>
        		</Link>
        	</div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
