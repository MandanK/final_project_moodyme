import Head from 'next/head';
import Layout from '../../components/Layout';
import { getMood } from '../../util/database';
import UserNote from '../user_inputs/[user_inputId]';

export default function SingleMood(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>{props.mood.name}</title>
        <meta description={`${props.mood.name} mood`} />
      </Head>
      <h1>{props.mood.name}</h1>
      <div>
        <a href="../user_inputs/1-note">
          <img
            src={'/images/' + props.mood.image}
            width="300"
            height="300"
            alt="Mood Emojis"
            onClick={makeNote}
          />
        </a>
      </div>
    </Layout>
  );
}

const makeNote = () => UserNote;

export async function getServerSideProps(context) {
  const moodId = context.query.moodId;

  // suggestions.mood_id === props.mood.mood_id

  //const moodDatabase = await getMoods(); We need this line for the database

  const mood = await getMood(moodId);

  return {
    props: {
      mood: mood,
      // !!! suggestions: suggestions,
    },
  };
}
