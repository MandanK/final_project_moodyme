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
  // padding: 0 100px;
  min-height: 100vh;
  text-align: center;
`;

const h1Style = css`
  color: #e5e5e5;
  padding-top: 85px;
`;

const rowStyle = css`
  width: 33.33%;
  padding: 1px;
  margin-left: 0px;
  margin-top: 40px;
  display: inline-block;
`;

//const columnStyle = css`
//float: left;
//padding: 5px;
// `;

type Props = {
  userObject: { username: string; firstname: string };
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
        <h1 css={h1Style}>How are you feeling now?</h1>
        {props.moods.map((mood) => {
          return (
            <div key={`mood-${mood.mood_id}`} css={rowStyle}>
              <Link href={`/moods/${mood.mood_id}`}>
                <a data-test-id={`mood-${mood.mood_id}`}>
                  <img
                    src={'/images/' + mood.image}
                    width="250"
                    alt="Mood Emojis"
                    //width="100%"
                    //height="100%"
                    //layout="responsive"
                    //objectFit="cover"
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
