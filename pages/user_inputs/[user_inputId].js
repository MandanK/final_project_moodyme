import Head from 'next/head';
import Layout from '../../components/Layout';

export default function UserNote(props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>{props.user_inputId}</title>
        <meta description={`${props.user_inputId} mood`} />
      </Head>
      <h1>{props.user_inputId}</h1>
      <img
        src={'/images/' + props.user_inputId}
        width="300"
        height="300"
        alt="Mood Emojis"
      />
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
      />
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const user_inputId = context.query.user_inputId;

  //const moodDatabase = await getMoods(); We need this line for the database

  //const mood = await getMood(user_inputId);

  return {
    props: {
      user_inputId: user_inputId,
    },
  };
}
