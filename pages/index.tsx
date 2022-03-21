import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const containerStyle = css`
  display: flex;
  margin-top: 17%;
  text-align: center;
  justify-content: center;
`;

const logoStyle = css`
  background-color: #3f55b6;
`;

const h1Style = css`
  font-size: 18px;
  color: #e5e5e5;
  font-weight: bold;
  line-height: 0.7;
  padding-top: 52px;
  margin-left: -10px;

  p {
    color: #e5e5e5;
    font-size: 14px;
  }
`;

{
  /*
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
*/
}

type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
};

export default function Home(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="We are here for you!" />
      </Head>

      <div css={containerStyle}>
        <div css={logoStyle}>
          <Link href="/moods">
            <a>
              <img src="/images/logo.jpg" width="163" alt="emotional emojis" />
            </a>
          </Link>
        </div>
        <h1 css={h1Style}>
          Moody Me!
          <br />
          <p>We are here for you!</p>
        </h1>
      </div>
    </Layout>
  );
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
  </footer> */
}
