async function getCurrentSuggestionsbyClickedMoodId(mood_id: number) {
  const currentSuggestions = await getSuggestionsByMoodId(1);
  console.log('hearrrrrrrrrr');
  console.log(currentSuggestions[1].name);
  return {
    suggestions: {
      name: currentSuggestions[1].name,
    },
  };
}



key={`mood-${mood.mood_id}`} css={rowStyle}


var elements =
                          document.getElementsByClassName('suggestion');
                        if (elements !== null) {
                          for (var i = elements.length - 1; i > 0; i--) {
                            if (elements[i] !== null) {
                              elements[i].remove();
                            }
                          }



                          const noteResponse = await fetch('/api/note', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // ADD DATE AND MODE
                    note: note,
                    mode_id: currentClickedMood,
                    csrfToken: props.csrfToken,
                  }),
                });

                const noteResponseBody = await noteResponse.json();

                if ('errors' in noteResponseBody) {
                  setErrors(noteResponseBody.errors);
                  return;
                }

                // If for some reason a page is locked for the user and they need to log in before accessing to that page. We they loge in, the will be directed to the page they wanted to access before log in.

                //const returnTo = router.query.returnTo;
                //console.log('returnTo', returnTo);

                if (
                  returnTo &&
                  !Array.isArray(returnTo) &&
                  // Security: Validate returnTo parameter against valid path
                  // (because this is untrusted user input)
                  /^\/[a-zA-Z0-9-?=]*$/.test(returnTo)
                ) {
                  await router.push(returnTo);
                  return;
                }

                // When the user is registered we want to send her to home page or any page you want.

                // Login worked, clear the errors and redirected to the homepage.

                setErrors([]);
                props.refreshUserProfile();
                await router.push(`/`); // Here I am telling to take the user to the home page.




                createUserMood(
                  1,
                  1,
                  'none',
                  'note',
                  '/images/user_moods/happy.png',
                  new Date(),
                );


                const moodId = context.query.moodId;




                import Head from 'next/head';
import Layout from '../../components/Layout';
import { getMood } from '../../utils/database';
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









                    <Link href={`#suggestion-description`}>
