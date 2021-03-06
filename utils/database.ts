import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    const { parse } = require('pg-connection-string');

    // Extract the connection information from the Heroku environment variable
    const { host, database, user, password } = parse(process.env.DATABASE_URL);

    // Set standard environment variables
    process.env.PGHOST = host;
    process.env.PGDATABASE = database;
    process.env.PGUSERNAME = user;
    process.env.PGPASSWORD = password;
  }
};

config();

// Heroku needs SSL connections but
// has an "unauthorized" certificate
// https://devcenter.heroku.com/changelog-items/852
const sql = postgres({ ssl: { rejectUnauthorized: false } });

export type Mood = {
  mood_id: number;
  name: string;
  image: string;
};

export type UserMood = {
  id: number;
  mood_id: number;
  type: string;
  text: string;
  image: string;
  created_at: Date;
};

export type Suggestion = {
  suggestion_id: number;
  mood_id: number;
  name: string;
  image: string;
  link: string;
  image_extra: string;
  description: string;
  type: string;
  is_enabled: Boolean;
};

export async function getMoods() {
  const moods = await sql<Mood[]>`
SELECT * FROM moods;
`;
  return moods;
}

export async function getSuggestions() {
  const suggestions = await sql<Suggestion[]>`
SELECT * FROM suggestions;
`;
  return suggestions;
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
  id: number;
  username: string;
  firstname: string;
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

export async function getUserMoodByUserId(id: number) {
  const userMood = await sql<UserMood[]>`
  SELECT
  *
  FROM
    user_moods
  WHERE
   id = ${id}
  `;
  return userMood; //&& camelcaseKeys(suggestions);
}

export async function getSuggestionsByMoodId(mood_id: number) {
  const suggestions = await sql<Suggestion[]>`
  SELECT
  *
  FROM
    suggestions
  WHERE
   mood_id = ${mood_id}
  `;
  return suggestions; //&& camelcaseKeys(suggestions);
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

export async function createUserMood(
  id: number, // id is the user id
  mood_id: number,
  type: string,
  text: string,
  image: string,
  created_at: Date,
) {
  const [user_mood] = await sql<[UserMood]>`
  INSERT INTO user_moods
  (
    id,
    mood_id,
    type,
    text,
    image,
    created_at)
  VALUES
  (${id}, ${mood_id}, ${type}, ${text}, ${image}, ${created_at})
  RETURNING
  id,
  mood_id,
  type,
  text,
  image,
  created_at
    `;
  return user_mood; //camelcaseKeys(user_mood);
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
