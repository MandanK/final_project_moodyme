import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import ResponseCache from 'next/dist/server/response-cache';
import { createUser, getUserByUsername } from '../../util/database';

export default async function registerHandler(
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

    if (await getUserByUsername(request.body.username)) {
      response
        .status(409)
        .json({ errors: [{ message: 'Username already taken' }] });
      return; // Important: will prevent "Headers already sent" error
    }

    const passwordHash = await bcrypt.hash(request.body.password, 12);

    const user = await createUser(request.body.username, passwordHash);

    response.status(201).json({ user: user });
    return; // Important: will prevent "Headers already sent" error
  }

  response
    .status(405)
    .json({ errors: [{ message: 'Method not supported, try POST instead' }] });
}
