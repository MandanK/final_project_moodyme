import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getMoods } from '../util/database';

const moodStyle = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props = {
  moods: Mood[];
};

export default function Moods(props: Props) {
  return (
    <Layout>
      <Head>
        <title>Moods</title>
        <meta description="A list of different moods" />
      </Head>
      <h1>How are you feeling?</h1>
      {props.moods.map((mood) => {
        return (
          <div key={`mood-${mood.id}`} css={moodStyle}>
            <Link href={`/moods/${mood.id}`}>
              <a data-test-id={`mood-${mood.id}`}>
                <img src={'/images/' + mood.image} alt="Mood Emojis" />
              </a>
            </Link>
          </div>
        );
      })}
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
