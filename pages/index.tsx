import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getMoods, getSuggestions } from '../utils/database';
import { Mood, Suggestion, createUserMood } from '../utils/database';
import { createCsrfToken } from '../utils/auth';
import { UserMoodResponseBody } from './api/user_mood';
import {
  getUserByValidSessionToken,
  getValidSessionByToken,
} from '../utils/database';
import styled from 'styled-components';
import hello from './api/hello';

const styles = {};

const containerStyle = css`
  // padding: 0 100px;
  min-height: 100vh;
  text-align: center;
`;

const h1Style = css`
  color: #e5e5e5;
  padding-top: 85px;
`;

const rowStyle = css`
  width: 44.33%;
  //padding: 1px;
  margin-left: 0px;
  //margin-top: 40px;
  display: inline-block;
`;

const rowStyleSuggestions = css`
  width: 30.33%;
  //padding: 1px;
  margin-left: 0px;
  //margin-top: 40px;
  display: inline-block;
`;

//const columnStyle = css`
//float: left;
//padding: 5px;
// `;

type Props = {
  userObject: { username: string; firstname: string };
  moods: Mood[];
  refreshUserProfile: () => void;
  authorized: Boolean;
  user: { id: number; username: string };
  csrfToken: string;
  suggestions: Suggestion[];
};

const errorStyle = css`
  color: red;
`;

type Errors = { message: string }[];

let moodClicked = false;
let currentClickedMood = 0;

//let currentSuggestions: Suggestion[];

async function moodImageClick(mood_id: number) {
  // change the background color base on moods
  console.log(mood_id);
  if (mood_id === 1) {
    document.body.style.backgroundColor = 'green';
  } else if (mood_id === 2) {
    document.body.style.backgroundColor = 'grey';
  } else if (mood_id === 3) {
    document.body.style.backgroundColor = 'red';
  } else {
    document.body.style.backgroundColor = 'violet';
  }
  moodClicked = true;
  currentClickedMood = mood_id;
}

export default function Home(props: Props) {
  const [note, setNote] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>MoodyMe!</title>
        <meta name="description" content="Track/Change Your Mood!" />
      </Head>
      {props.authorized ? (
        <div css={containerStyle}>
          {props.moods.map((mood) => {
            return (
              <div key={`mood-${mood.mood_id}`} css={rowStyle}>
                <Link href={`#take-a-note`}>
                  <a data-test-id={`mood-${mood.mood_id}`}>
                    <img
                      src={'/images/' + mood.image}
                      width="170"
                      alt="Mood Emojis"
                      //width="100%"
                      //height="100%"
                      //layout="responsive"
                      //objectFit="cover"
                      onClick={() => {
                        moodImageClick(mood.mood_id);
                      }}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
          <div id="take-a-note" className="form__group field">
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                const registerResponse = await fetch('/api/user_mood', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: props.user.id,
                    mood_id: currentClickedMood,
                    type: 'note',
                    text: note, // the note that the user takes
                    image: 'image', //if the user's taken photo should be added to the database, this field can be used
                    created_at: Date,
                    csrfToken: props.csrfToken,
                  }),
                });

                const registerResponseBody =
                  (await registerResponse.json()) as UserMoodResponseBody;

                if ('errors' in registerResponseBody) {
                  setErrors(registerResponseBody.errors);
                  return;
                }

                // When the user is registered we want to send her to home page or any page you want.

                props.refreshUserProfile();
                await router.push('/'); // Here I am telling to take the user to the home page.
              }}
            >
              <label>
                note:{' '}
                <input
                  value={note}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </label>

              <button>save</button>
            </form>
          </div>

          {props.suggestions.map((suggestion) => {
            let isShown = false;
            if (suggestion.mood_id == currentClickedMood) {
              isShown = true;
            }
            return (
              <div
                className="suggestion"
                key={`suggestion-${suggestion.mood_id}`}
                css={rowStyleSuggestions}
                style={{ display: isShown ? 'inline-block' : 'none' }}
              >
                <Link href={`#take-a-note`}>
                  <a data-test-id={`suggestion-${suggestion.mood_id}`}>
                    <img
                      src={suggestion.image}
                      width="170"
                      alt="Mood Emojis"
                      //width="100%"
                      //height="100%"
                      //layout="responsive"
                      //objectFit="cover"
                      onClick={() => moodImageClick(suggestion.mood_id)}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>LOGIN</h1>
          <h1>Login</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              const loginResponseBody = await loginResponse.json();

              if ('errors' in loginResponseBody) {
                setErrors(loginResponseBody.errors);
                return;
              }

              // If for some reason a page is locked for the user and they need to log in before accessing to that page. We they loge in, the will be directed to the page they wanted to access before log in.

              const returnTo = router.query.returnTo;
              console.log('returnTo', returnTo);

              if (
                returnTo &&
                !Array.isArray(returnTo) &&
                // Security: Validate returnTo parameter against valid path
                // (because this is untrusted user input)
                /^\/[a-zA-Z0-9-?=]*$/.test(returnTo)
              ) {
                await router.push(returnTo);
                return;
              }

              // When the user is registered we want to send her to home page or any page you want.

              // Login worked, clear the errors and redirected to the homepage.

              setErrors([]);
              props.refreshUserProfile();
              await router.push(`/`); // Here I am telling to take the user to the home page.
            }}
          >
            <label>
              Username:{' '}
              <input
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
            <label>
              Password:{' '}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button>Login</button>
          </form>

          <div css={errorStyle}>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>

          <div>
            <div>Have you account? sign-in</div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Code in getServerSideProps runs only in
// Node.js, and allows you to do fancy things:
// - Read files from the file system
// - Connect to a (real) database
//
// getServerSideProps is exported from your files
// (ONLY FILES IN /pages) and gets imported
// by Next.js

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const suggestions = await getSuggestions();
  const moods = await getMoods();
  // ! Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/root`,
        permanent: true,
      },
    };
  }
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return that and render page

  if (token) {
    // 2. if it is valid and redirect
    const session = await getValidSessionByToken(token);
    if (user) {
      return {
        props: {
          moods: moods,
          user: user,
          suggestions: suggestions,
          authorized: true,
        },
      };
    }

    // 3. otherwise redirect to login
    return {
      props: { authorized: false },
      //redirect: {
      //  destination: `/login?returnTo=/users/protected-user`,
      //  permanent: false,
      //},
    };
  }
  return {
    props: {
      authorized: false,
      csrfToken: createCsrfToken(),
    },
  };
}

{
  /*
<footer css={footerStyle}>
  <a
    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
  >
    Powered by{' '}
    <img src="/vercel.svg" alt="Vercel Logo" css={logoStyle} />
  </a>
</footer>
</div>
</Layout>
*/
}
