import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

const users = new Map();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (users.has(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(username, hashedPassword);

  res.status(200).json({ message: 'User registered successfully' });
};
