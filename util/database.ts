import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

export type Mood = {
  mood_id: number;
  name: string;
  image: string;
};

export type Suggestions = {
  /// attributes...
};

export async function getMoods() {
  const moods = await sql<Mood[]>`
SELECT * FROM moods;
`;
  return moods;
}

export async function getMood(mood_id: number) {
  const [mood] = await sql<[Mood | undefined]>`
  SELECT * FROM moods WHERE mood_id = ${mood_id}
  `;
  return mood && camelcaseKeys(mood);
}

//const moods = [
//{ id: 1, name: 'Happy', image: 'Image1.jpg' },
//{ id: 2, name: 'Sad', image: 'Image2.jpg' },
//{ id: 3, name: 'Angry', image: 'Image3.jpg' },
//{ id: 4, name: 'Stressed', image: 'Image4.jpg' },
//];

//export default moods;

export type User = {
  id: Number;
  username: String;
  firstname: String;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
  SELECT
  id,
  username,
  firstname
  FROM
    users
  WHERE
   id = ${id}
  `;
  return user && camelcaseKeys(user);
}

export async function getSuggestionsByMoodId(mood_id: number) {
  const [suggestions] = await sql<[Suggestions | undefined]>`
  SELECT
  id,
  username,
  firstname
  FROM
    suggestions
  WHERE
   mood_id = ${mood_id}
  `;
  return suggestions && camelcaseKeys(suggestions);
}

// This is joint query
export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.firstname
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
  SELECT id FROM users WHERE username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
  SELECT
  id,
  username,
  password_hash,
  firstname
  FROM
    users
  WHERE
   username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function createUser(
  username: string,
  passwordHash: string,
  firstname: string,
) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash, firstname)
  VALUES
  (${username}, ${passwordHash}, ${firstname})
  RETURNING
  id,
  username,
  firstname
    `;
  return camelcaseKeys(user);
}

type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
  INSERT INTO sessions
  (token, user_id)
  VALUES
  (${token}, ${userId})
  RETURNING
  id,
  token
    `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
  DELETE FROM
  sessions
  WHERE
  token = ${token}
  RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
  DELETE FROM
   sessions
  WHERE
   expiry_timestamp < NOW()
  RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}
