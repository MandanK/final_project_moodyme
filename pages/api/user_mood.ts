import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../utils/auth';
import { createSerializedUserMoodSessionTokenCookie } from '../../utils/cookies';
import {
  createSession,
  createUserMood,
  UserMood,
  getUserByUsername, //delete if not needed
  User, // delete if not needed
} from '../../utils/database';

type UserMoodRequestBody = {
  id: number;
  mood_id: number;
  type: string;
  text: string;
  image: string;
  created_at: Date;
  csrfToken: string; //delete if not needed
};

type UserMoodNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: UserMoodRequestBody;
};

export type UserMoodResponseBody =
  | { errors: { message: string }[] }
  | { user_mood: UserMood }; // check if this should be converted to mood => | { user: User };

export default async function userMoodHandler(
  request: UserMoodNextApiRequest,
  response: NextApiResponse<UserMoodResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.id !== 'number' ||
      !request.body.id ||
      typeof request.body.mood_id !== 'number' ||
      !request.body.mood_id ||
      typeof request.body.created_at !== 'object' ||
      !request.body.created_at ||
      typeof request.body.csrfToken !== 'string' ||
      !request.body.csrfToken
    ) {
      response.status(400).json({
        errors: [
          {
            message:
              'User id, mood id, creation date or CSRF token not provided',
          },
        ],
      });

      return; //Important: will prevent "Headers already sent" error
    }

    // Verify CSRF Token
    const csrfTokenMatches = verifyCsrfToken(request.body.csrfToken);

    if (!csrfTokenMatches) {
      response.status(403).json({
        errors: [
          {
            message: 'Invalid CSRF token',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // The following pattern can be "modified" and used, if there is a need to only save one mood per day,
    // return error message
    //if (await getUserByUsername(request.body.username)) {
    //  response
    //    .status(409)
    //    .json({ errors: [{ message: 'Username already taken' }] });
    //  return; // Important: will prevent "Headers already sent" error
    //}

    //const passwordHash = await bcrypt.hash(request.body.password, 12);

    // id: number, // id is the user id
    // mood_id: number,
    // type: string,
    // text: string,
    // image: string,
    // created_at: Date,

    const user_mood = await createUserMood(
      request.body.id,
      request.body.mood_id,
      request.body.type,
      request.body.text,
      request.body.image,
      request.body.created_at,
    );

    // 1. Create a new token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. Create the session
    const session = await createSession(token, request.body.id);

    // 3. Serialize the cookie
    const serializedCookie = await createSerializedUserMoodSessionTokenCookie(
      session.token,
    );

    // 4. Add the cookie to the header response

    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user_mood: user_mood });
    return; // Important: will prevent "Headers already sent" error
  }

  response
    .status(405)
    .json({ errors: [{ message: 'Method not supported, try POST instead' }] });
}
