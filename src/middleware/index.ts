/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '@/database/dbconfig';

import { NEXTAUTH_SECRET } from '@/config';
import userModel from '@/model/user.model';

connect();
export function auth(req: NextApiRequest, res: NextApiResponse) {
  try {
    let tokenCheck;
    const token: any = req.headers.authorization;
    if (!token) throw new Error('Token not found');

    const decodeToken: any = jwt.verify(
      token,
      NEXTAUTH_SECRET as string,
      (err: any, decode: any) => {
        if (err) {
          return 'Token Expired';
        } else {
          tokenCheck = decode;
          return decode;
        }
      },
    );
    if (decodeToken === 'Token Expired') {
      res.status(401).send({
        status: false,
        data: 'Token expired',
      });
    }

    (req as any).user = tokenCheck;
    return decodeToken.id;
  } catch (err: any) {
    throw new Error(err);
  }
}
export async function userMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = auth(req, res);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    (req as any).user = user;
  } catch (error: any) {
    res.status(401).json({ message: 'Unauthorized', error });
  }
}
