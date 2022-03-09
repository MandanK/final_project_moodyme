import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import ResponseCache from 'next/dist/server/response-cache';
import {
  createUser,
  getUserByUsername,
  getUserWithPasswordHashByUsername,
} from '../../util/database';

export default async function loginHandler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response
        .status(400)
        .json({ errors: [{ message: 'Username or password not provided' }] });

      return; //Important: will prevent "Headers already sent" error
    }

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.body.username,
    );

    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return; //Important: will prevent "Headers already sent" error
    }

    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );

    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return; //Important: will prevent "Headers already sent" error
    }

    //TODO: Return created session in cookie

    response.status(201).json({ user: { id: userWithPasswordHash.id } });
    return; // Important: will prevent "Headers already sent" error
  }

  response
    .status(405)
    .json({ errors: [{ message: 'Method not supported, try POST instead' }] });
}
