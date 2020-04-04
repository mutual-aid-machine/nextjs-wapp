import { useEffect } from "react";

export const indexIfUndefined = (user, index = '/') => () => { if (user) router.push(index); };

const HomePage = ({
}) => {
  const [user, { mutate }] = useUser();

	useEffect(indexIfUndefined(user), [user]);

	return (
		<div>
			<h2>
				hello, ${user.name}
			</h2>
		</div>
	);
};

export default HomePage;
