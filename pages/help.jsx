const sourceRepo = 'https://github.com/mutual-aid-machine/nextjs-wapp';

export const HelpPage = ({}) => {
	return (
		<div>
			the lead dev is a cat named daxi. you can reach them here:
			<br/>
			<a href="mailto:aljedaxi@gmail.com">
				email
			</a>
			<br/>
			<a href="web.telegram.org/#/im?p=@aljedaxi">
				telegram
			</a>
			<br/>
			or you can see the source code <a href={sourceRepo}> here </a>
		</div>
	);
};

export default HelpPage;
