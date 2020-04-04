import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Mutual Aid Aid</title>
				<link 
					href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=DM+Serif+Display&family=Lato&display=swap" 
					rel="stylesheet"
				/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
