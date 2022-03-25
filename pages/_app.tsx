import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  user: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/profile');
    const data = await response.json();
    console.log(data);

    if ('errors' in data) {
      console.log(data.errors);
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0%;

            box-sizing: border-box;
            font-family: sans-serif;
            font-size: 17px;
            font-weight: 500;
            line-height: 1.5em;

            background-color: #3f55b6;
          }

          main {
            margin: 0 0em;
          }
        `}
      />
      {/* Component for each one of the pages */}

      <Component
        {...pageProps}
        userObject={user}
        refreshUserProfile={refreshUserProfile}
      />
    </>
  );
}

export default MyApp;
