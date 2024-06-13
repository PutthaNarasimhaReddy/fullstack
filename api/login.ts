import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = new Map();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.get(username);
  if (!user || !(await bcrypt.compare(password, user))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  res.status(200).json({ token });
};
