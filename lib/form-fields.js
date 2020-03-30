import { prop } from 'ramda';

export const textyTypes = ['text', 'password', 'email'];

export const roles = [
	{
		_id: 'to-help',
		needsHelp: false,
		selectable: true,
	}, {
		_id: 'zone-captain',
		needsHelp: false,
		selectable: false,
	}, {
		_id: 'for-help',
		needsHelp: true,
		selectable: true,
	},
];

const selectableRoles = roles.filter(prop('selectable'));

export const fields = [
	{
		_id: 'role',
		label: 'Role *',
		type: 'select',
		options: selectableRoles.map(prop('_id')),
		required: true,
	},
	{
		_id: 'name',
		label: 'Name *',
		description: 'What would you like to be called?',
		required: true,
	},
	// {
	// 	_id: 'username',
	// 	label: 'Username *',
	// 	description: 'How would you like to log in?',
	// 	required: true,
	// },
	{
		_id: 'email',
		type: 'email',
		label: 'E-mail *',
		description: 'You\'ll use this to log in, and if we ever need to contact you.',
		required: true,
	},
	{
		_id: 'password',
		type: 'password',
		label: 'Password *',
		description: 'password for the system',
		required: true,
	},
	{
		_id: 'confirmPassword',
		type: 'password',
		label: 'Confirm Password *',
		description: 'keep it safe!',
		required: true,
	},
	{
		_id: 'phoneNumber',
		label: 'Phone Number',
		description: 'Text/Voice is the fastest way for us to get in touch.'
	},
	{
		_id: 'message',
		label: 'Message for your zone captain',
		description: 'Anything else you might want to say.',
		type: 'textarea',
	},
];

export const extraFields = [
	{
		_id: 'address',
		required: true,
	},
	{
		_id: 'geometry',
		required: true,
	},
	{
		_id: 'geographyContext',
		required: true,
	},
];
