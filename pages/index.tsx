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

const containerStyle = css`
  text-align: center;
  padding-top: 30px;
`;

const logoStyle = css`
  display: flex;
  margin-top: 60px;
  margin-bottom: -15px;
  text-align: center;
  justify-content: center;
`;

const h1Style = css`
  font-size: 16px;
  color: white;
  font-weight: bold;
  line-height: 0.7;
  padding-top: 42px;
  margin-left: -5px;
`;

const rowStyle = css`
  width: 44.33%;
  margin-left: 0px;
  display: inline-block;
  margin-top: 30px;
`;

const noteLabel = css`
  display: inline-block;
  color: white;
  border-radius: 20px;
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-top: 55px;
  margin-left: -50px;
`;

const noteInput = css`
  display: inline-block;
  border-radius: 25px;
  width: 230px;
  background-color: #fff5ee;
  height: 95px;
  font-family: sans-serif;
  font-size: 16px;
  color: #484848;
  border: none;
  box-sizing: border-box;
  margin-left: 3px;
`;

const noteButton = css`
  background-color: #deb1ae;
  width: 230px;
  border-radius: 20px;
  height: 38px;
  margin-top: 15px;
  text-align: center;
  padding-bottom: 4px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
`;

const formStyle = css`
  margin: 0;
  position: relative;
  padding-top: 0px;
  color: white;
  text-align: center;
`;

const labelStyle = css`
  text-align: left;
  display: block;
  font-family: sans-serif;
  font-size: 18px;
  margin-top: 30px;
  padding-left: 50px;
`;

const inputStyle1 = css`
  display: block;
  width: 320px;
  height: 35px;
  margin-top: 10px;
  margin-bottom: -10px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 18px;
  color: #484848;
  border: none;
  box-sizing: border-box;
`;

const inputStyle2 = css`
  display: block;
  width: 320px;
  height: 35px;
  margin-top: 10px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 18px;
  color: #484848;
  border: none;
  box-sizing: border-box;
`;

const buttonStyle = css`
  display: block;
  background-color: #deb1ae;
  width: 320px;
  border-radius: 20px;
  height: 35px;
  margin-top: -10px;
  margin-left: 50px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration-line: none;
`;

const textStyle = css`
  display: block;
  background-color: #f8f8f8;
  width: 320px;
  border-radius: 20px;
  height: 35px;
  margin-top: -10px;
  margin-left: 50px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 14px;
  padding-top: 7px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
`;

const registerStyle = css`
  text-decoration-line: none;
`;

const privacyStyle = css`
  width: 290px;
  height: 45px;
  padding: 50px;
  border-radius: 10px;
  box-sizing: content-box;
  margin-top: 60px;
  margin-left: 43px;
  background-color: #f5e7e6;
  padding-top: 18px;
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 40px;
  text-align: left;
  font-size: 14px;
  color: #484848;
  line-height: 1.7em;
`;

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
  color: #f00;
  margin-left: 50px;
  padding-top: 5px;
`;

type Errors = { message: string }[];

let moodClicked = false;
let currentClickedMood = 0;

//let currentSuggestions: Suggestion[];

async function moodImageClick(mood_id: number) {
  // change the background color base on moods
  console.log(mood_id);
  if (mood_id === 1) {
    document.body.style.backgroundColor = '#f2658c';
  } else if (mood_id === 2) {
    document.body.style.backgroundColor = '#23AAD4';
  } else if (mood_id === 3) {
    document.body.style.backgroundColor = '#F23255';
  } else {
    document.body.style.backgroundColor = '#8d8db9';
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
      {
        //show the moods
        props.authorized ? (
          <div css={containerStyle}>
            {props.moods.map((mood) => {
              return (
                <div key={`mood-${mood.mood_id}`} css={rowStyle}>
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
                </div>
              );
            })}
            <div id="take-a-note" className="form__group field">
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  // console.log(props.csrfToken); for debugging purposes

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
                      created_at: new Date(Date.now()),
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

                  setNote('');

                  if (moodClicked) {
                    location.href = '/moods/' + currentClickedMood;
                  }
                }}
              >
                <label css={noteLabel}>
                  {' '}
                  Note{' '}
                  <input
                    css={noteInput}
                    value={note}
                    onChange={(event) => setNote(event.currentTarget.value)}
                  />
                </label>
                <br />

                <button css={noteButton}>save</button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <div css={logoStyle}>
              <div>
                <Link href="/moods">
                  <a>
                    <img
                      src="/images/logo.png"
                      width="113"
                      alt="emotional emojis"
                    />
                  </a>
                </Link>
              </div>
              <h1 css={h1Style}>Moody Me!</h1>
            </div>
            <form
              css={formStyle}
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
              <div css={labelStyle}>
                <label>
                  Email{' '}
                  <input
                    css={inputStyle1}
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                  />
                </label>
                <br />
                <label>
                  Password{' '}
                  <input
                    css={inputStyle2}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </label>
                <br />
              </div>
              <button css={buttonStyle}>Login</button>
            </form>

            <div css={errorStyle}>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>
            <br />
            <br />
            <div>
              <a css={registerStyle} href="/register">
                <button css={textStyle}>Don't have an account?</button>
              </a>
            </div>
            <div css={privacyStyle}>
              We use essential cookies to allow users to login. To refuse
              consent, please leave. By logging in you agree to our Terms of
              use.
            </div>
          </div>
        )
      }
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
          csrfToken: createCsrfToken(), // check this
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
