import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { has, __ } from 'ramda';

const handler = nextConnect();

handler.use(middleware);

const hasAllKeys = qKeys => obj => qKeys.every(has(__, obj));
const requiredKeys = ['password', 'name', 'profile', 'email'];
const hasRequiredKeys = hasAllKeys(requiredKeys);

handler.post(async (req, res) => {
	const {body, db} = req;
	if (!hasRequiredKeys(body)) {
		const status = `The request you sent is lacking one of the following keys: ${requiredKeys}`
		res.status(400).send(status);
		console.error(status, body);
		return;
	}
  const {password, name, profile} = body;
  const email = normalizeEmail(body.email);
  if (!isEmail(email)) {
		const status = 'The email you entered is invalid.';
    res.status(400).send(status);
		console.error(status, body);
    return;
  }
  if (!password || !name) {
		const status = 'Missing Password or Name';
    res.status(400).send(status);
		console.error(status, body);
    return;
  }
  if ((await db.collection('users').countDocuments({ email })) > 0) {
		const status = 'The email has already been used';
    res.status(403).send(status);
		console.error(status, body);
		return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db
    .collection('users')
    .insertOne({ email, password: hashedPassword, name, profile})
    .then(({ ops }) => ops[0]);
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user: extractUser(req.user),
    });
  });
});

export default handler;
