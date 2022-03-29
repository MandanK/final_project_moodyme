import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { createCsrfToken } from '../utils/auth';
import { getValidSessionByToken } from '../utils/database';
import { RegisterResponseBody } from './api/register';

const logoStyle = css`
  display: flex;
  margin-top: 100px;
  margin-bottom: -25px;
  text-align: center;
  justify-content: center;
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
  font-weight: bold;
  margin-top: 30px;
  padding-left: 50px;
`;

const inputStyle = css`
  display: block;
  width: 320px;
  height: 35px;
  margin-top: 10px;
  margin-bottom: 15px;
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
  height: 40px;
  margin-top: 25px;
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

const errorStyle = css`
  color: red;
`;

type Errors = { message: string }[];

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register on this website" />
      </Head>
      <div css={logoStyle}>
        <a href="/moods">
          <img src="/images/logo.png" width="113" alt="emotional emojis" />
        </a>
      </div>
      <form
        css={formStyle}
        onSubmit={async (event) => {
          event.preventDefault();

          const registerResponse = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              firstname: firstname,
              csrfToken: props.csrfToken,
            }),
          });

          const registerResponseBody =
            (await registerResponse.json()) as RegisterResponseBody;

          if ('errors' in registerResponseBody) {
            setErrors(registerResponseBody.errors);
            return;
          }

          // When the user is registered we want to send her to home page or any page you want.

          props.refreshUserProfile();
          await router.push('/'); // Here I am telling to take the user to the home page.
        }}
      >
        <div css={labelStyle}>
          <label>
            Name{' '}
            <input
              css={inputStyle}
              type="firstname"
              value={firstname}
              onChange={(event) => setFirstName(event.currentTarget.value)}
            />
          </label>
          <label>
            Email{' '}
            <input
              css={inputStyle}
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label>
            Password{' '}
            <input
              css={inputStyle}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
        </div>
        <button css={buttonStyle}>Register</button>
      </form>

      <div css={errorStyle}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // ! Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // 1. check if there is a token and is valid from the cookie
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. if it is valid and redirect
    const session = await getValidSessionByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. otherwise render the page

  return {
    props: { csrfToken: createCsrfToken() },
  };
}
