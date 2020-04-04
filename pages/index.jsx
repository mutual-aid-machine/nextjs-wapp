import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '../lib/hooks';
import { sendHomeIfDefined } from './login';
const links = [
	{
		href: "/signup?role=to-help",
		text: 'Looking to Help?',
	}, {
		href: "/signup?role=for-help",
		text: 'Looking for Help?',
	}, {
		href: "/login",
		text: 'Looking to sign in?',
	}, {
		href: "/help",
		text: 'Looking for an Explanation?',
	}
]

export const MenuItem = ({href, text, component}, idx) => {
	const textyBit = component ? (
		<a>
			<component>
				{text}
			</component>
		</a>
	) : (
		<a>
			<h3>{text}</h3>
		</a>
	);
	return (
		<Link
			key={idx}
			href={href}
		>
			{textyBit}
		</Link>
	);
};

const IndexPage = () => {
  const [user] = useUser();

	useEffect(sendHomeIfDefined(user, '/home'), [user]);

	const body = user ? (
		<div>
			meme
		</div>
	) : (
		<div
		>
			<h2>
				Welcome to Mutual Aid.
				<br/>
				Are you:
			</h2>
			{links.map(MenuItem)}
		</div>
	);

  return (
    <>
      <style jsx global>{`
          h2, h3 {
            text-align: left;
						font-size: 1.5em;
          }
      `}</style>
			{body}
    </>
  );
};

export default IndexPage;
