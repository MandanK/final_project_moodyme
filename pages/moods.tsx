import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getMoods } from '../util/database';

const containerStyle = css`
  background: linear-gradient(
    to right,
    #23aad4 0%,
    #23aad4 50%,
    #3f55b6 50%,
    #3f55b6 100%
  );
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const moodStyle = css`
  border: none;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props = {
  userObject: { username: string };
  moods: Mood[];
};

export default function Moods(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Moods</title>
        <meta name="description" content="A list of different moods" />
      </Head>
      <div css={containerStyle}>
        <h1>How are you feeling today?</h1>
        {props.moods.map((mood) => {
          return (
            <div key={`mood-${mood.id}`} css={moodStyle}>
              <Link href={`/moods/${mood.id}`}>
                <a data-test-id={`mood-${mood.id}`}>
                  <img
                    src={'/images/' + mood.image}
                    width="220"
                    alt="Mood Emojis"
                  />
                </a>
              </Link>
            </div>
          );
        })}
      </div>
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

export async function getServerSideProps() {
  const moods = await getMoods();
  return {
    props: { moods: moods },
  };
}

{
  /*
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
*/
}
