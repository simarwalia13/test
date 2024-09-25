import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '@/database/dbconfig';

import { EXPIRE_DAY, NEXTAUTH_SECRET } from '@/config';
import userModel from '@/model/user.model';

connect();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'email & password are required' });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res
        .status(404)
        .json({ message: 'Please enter correct email and password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = sign(tokenData, NEXTAUTH_SECRET as string, {
      expiresIn: EXPIRE_DAY,
    });
    res
      .status(200)
      .json({ message: 'login successfull', token, data: user.role });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const log = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await login(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
export default log;
