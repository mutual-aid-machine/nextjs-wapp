import { useEffect } from "react";
import { useUser } from '../lib/hooks';
import { useRouter } from 'next/router';

export const indexIfUndefined = (user, router, index = '/') => () => { if (user) router.push(index); };

const HomePage = ({
}) => {
  const [user, { mutate }] = useUser();
  const router = useRouter();

	useEffect(() => indexIfUndefined(user, router), [user]);

	if (!user) { return null; }

	return (
		<div>
			<h2>
				hello, {user.name}
			</h2>
		</div>
	);
};

export default HomePage;
