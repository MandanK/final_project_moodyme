import { css } from '@emotion/react';
import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const containerStyle = css`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const mainStyle = css`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const descriptionStyle = css`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`;

const gridStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  margin-top: 3rem;
`;

const cardStyle = css`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
`;

const footerStyle = css`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const logoStyle = css`
  height: 1em;
`;

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
};

export default function Home(props: Props) {
  // ! This is the part to remove profile after login, but not working

  useEffect(() => {
    props.refreshUserProfile;
  }, [props]);

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="You're here to feel better" />
      </Head>

      <div css={containerStyle}>
        <main css={mainStyle}>
          <h1 css={titleStyle}>Mood Changer!</h1>

          <p css={descriptionStyle}>How do you feel now?</p>

          <div css={gridStyle}>
            <a href="https://nextjs.org/docs" css={cardStyle}>
              <h3>Happy! &rarr;</h3>
              <p>Find how you can feel even better.</p>
            </a>

            <a href="https://nextjs.org/learn" css={cardStyle}>
              <h3>Sad &rarr;</h3>
              <p>Learn how you can feel better!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              css={cardStyle}
            >
              <h3>Angry &rarr;</h3>
              <p>Learn how you cen feel better.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              css={cardStyle}
            >
              <h3>Stressed &rarr;</h3>
              <p>Learn how you can feel better!</p>
            </a>
          </div>
        </main>

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
  );
}
