import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getMoods, getValidSessionByToken, Mood } from '../../util/database';

const moodStyles = css`
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
`;

type Props =
  | {
      moods: Mood[];
    }
  | {
      error: string;
    };

export default function MoodsRestricted(props: Props) {
  if ('error' in props) {
    return (
      <Layout>
        <Head>
          <title>Moods Error</title>
          <meta name="description" content="An error about a mood " />
        </Head>
        <h1>Moods Error</h1>
        {props.error}
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Moods</title>
        <meta name="description" content="A list of moods" />
      </Head>
      <h1>Moods</h1>
      {props.moods.map((mood) => {
        return (
          <div key={`mood-${mood.id}`} css={moodStyles}>
            {/* Dynamic link, eg. /moods/1, /moods/2, etc */}
            <Link href={`/mood-management-naive-dont-copy/read/${mood.id}`}>
              <a>{mood.name}</a>
            </Link>{' '}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = context.req.cookies.sessionToken;
  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return {
      props: {
        error: 'You are not allowed to see moods today',
      },
    };
  }

  const moods = await getMoods();
  return {
    props: {
      moods: moods,
    },
  };
}
