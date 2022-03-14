import Head from 'next/head';
import Layout from '../../components/Layout';
import { getMood } from '../../util/database';

export default function SingleMood(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>{props.mood.name}</title>
        <meta description={`${props.mood.name} mood`} />
      </Head>
      <h1>{props.mood.name}</h1>
      <img
        src={'/images/' + props.mood.image}
        width="300"
        height="300"
        alt="Mood Emojis"
      />
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const moodId = context.query.moodId;

  //const moodDatabase = await getMoods(); We need this line for the database

  const mood = await getMood(moodId);

  return {
    props: {
      mood: mood,
    },
  };
}
