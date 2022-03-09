import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';

const errorStyle = css`
  color: red;
`;

type Errors = { message: string }[];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login on this website" />
      </Head>

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
          await router.push(`/users/${loginResponseBody.user.id}`); // Here I am telling to take the user to the home page.
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
    </Layout>
  );
}
