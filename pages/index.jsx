import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { sendHomeIfDefined } from './login';
import { WildLink, wildStyle} from '../components/layout';
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
		<WildLink
			href={href}
			title={text}
			color='pink'
			key={`menuItem-${idx}`}
		/>
	);
};

const IndexPage = () => {
  const [user] = useUser();
  const router = useRouter();

	useEffect(() => sendHomeIfDefined(user, router, '/home'), [user]);

  return (
    <>
      <style jsx global>{`
				h2, h3 {
					text-align: left;
					font-size: 1.5em;
				}
      `}</style>
			<div>
				<h2 style={wildStyle()}>
					Welcome to Mutual Aid.
					<br/>
					Are you:
				</h2>
				{links.map(MenuItem)}
			</div>
    </>
  );
};

export default IndexPage;
