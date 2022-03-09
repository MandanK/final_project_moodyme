import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

export type Mood = {
  id: number;
  name: string;
  image: string;
};

export async function getMoods() {
  const moods = await sql<Mood[]>`
SELECT * FROM moods;
`;
  return moods;
}

export async function getMood(id: number) {
  const [mood] = await sql<[Mood | undefined]>`
  SELECT * FROM moods WHERE id = ${id}
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
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
  SELECT
  id,
  username
  FROM
    users
  WHERE
   id = ${id}
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
  password_hash
  FROM
    users
  WHERE
   username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function createUser(username: string, passwordHash: string) {
  const [user] = await sql<[User]>`
  INSERT INTO users
  (username, password_hash)
  VALUES
  (${username}, ${passwordHash})
  RETURNING
  id,
  username
    `;
}
