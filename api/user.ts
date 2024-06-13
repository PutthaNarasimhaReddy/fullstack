import { NextApiRequest, NextApiResponse } from 'next';
import authenticate from '..\api\authMiddleware.ts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ user: req.user });
};

export default authenticate(handler);
