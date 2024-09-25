import bcrypt from 'bcrypt';
// import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '@/database/dbconfig';

import userModel from '@/model/user.model';
// import { GMAIL_PASS, GMAIL_USER } from '@/config';

connect();

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    const finduser = await userModel.findOne({
      email: email,
    });
    if (finduser) {
      return res.status(400).json({ message: 'User already exist' });
    }
    const usernamExist = await userModel.findOne({
      username: username,
    });
    if (usernamExist) {
      return res.status(400).json({
        message: 'Username already has been taken! Please, choose another',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
      firstName,
      lastName,
    });
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: GMAIL_USER,
    //     pass: GMAIL_PASS,
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    // const mailOptions = {
    //   from: GMAIL_USER,
    //   to: newUser.email,
    //   subject: 'Welcome to Our Platform!',
    //   text: 'Thank you for signing up. We are excited to have you on board!',
    // };

    // await transporter.sendMail(mailOptions);
    res
      .status(201)
      .json({ message: 'user created succussfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await createUser(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
export default user;
