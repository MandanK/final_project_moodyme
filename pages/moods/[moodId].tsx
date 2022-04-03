import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { getMood, getSuggestions } from '../../utils/database';
import { Mood, Suggestion } from '../../utils/database';
import { createCsrfToken } from '../../utils/auth';

import {
  getUserByValidSessionToken,
  getValidSessionByToken,
} from '../../utils/database';
import { isPropertySignature } from 'typescript';

const containerStyle = css`
  text-align: center;
  display: table;
`;

const moodEmojiStyle = css`
  margin-top: 15px;
  margin-bottom: 25px;
`;

const boxStyle = css`
  display: inline-flex;
`;

const textStyle = css`
  font-size: 18px;
  padding-top: 15px;
`;

const catStyle = css`
  padding-top: 13px;
`;
const rowStyleSuggestions = css`
  width: 27%;
  margin-left: 2px;
  display: table-cell;
  padding: 4px;
  padding-bottom: 20px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const suggestionDescriptionBox = css`
  width: 300px;
  height: 135px;
  padding: 50px;
  border-radius: 30px;
  box-sizing: content-box;
  margin-left: 36px;
  background-color: #f8f8f8;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 46px;
  text-align: center;
  font-size: 14px;
  color: #484848;
  line-height: 1.7em;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

const suggestionNameStyle = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 2em;
`;

// first login page
const logoStyle = css`
  display: flex;
  margin-top: 230px;
  margin-bottom: -15px;
  text-align: center;
  justify-content: center;
`;

const pStyle = css`
  font-size: 16px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: -5px;
`;

const messageStyle = css`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: -5px;
`;

const aStyle = css`
  color: #deb1ae;
  cursor: pointer;
`;

type Props = {
  moodId: number;
  userObject: { username: string; firstname: string };
  mood: Mood;
  refreshUserProfile: () => void;
  authorized: Boolean;
  user: { id: number; username: string };
  csrfToken: string;
  suggestions: Suggestion[];
};

const errorStyle = css`
  color: red;
`;

type Errors = { message: string }[];

let moodClicked = false;
let currentClickedMood = 0;

//let currentSuggestions: Suggestion[];

async function moodImageClick(mood_id: number) {
  // change the background color base on moods
  console.log(mood_id);
  if (mood_id === 1) {
    document.body.style.backgroundColor = 'green';
  } else if (mood_id === 2) {
    document.body.style.backgroundColor = 'grey';
  } else if (mood_id === 3) {
    document.body.style.backgroundColor = 'red';
  } else {
    document.body.style.backgroundColor = 'violet';
  }
  moodClicked = true;
  currentClickedMood = mood_id;
}

export default function Home(props: Props) {
  // Similar to componentDidMount and componentDidUpdate:

  // For changing the background color on page load based on user's mood
  //useEffect(() => {
  // Update the document title using the browser API
  //  moodImageClick(props.moodId);
  //});

  const [suggestionLink, setSuggestionLink] = useState('');
  const [suggestionImageExtra, setSuggestionImageExtra] = useState('');
  const [suggestionName, setSuggestionName] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>MoodyMe!</title>
        <meta name="description" content="Track/Change Your Mood!" />
      </Head>
      {
        //show the moods
        props.authorized ? (
          <div css={containerStyle}>
            <div css={moodEmojiStyle}>
              <Link href="/">
                <a>
                  <img
                    src={'/images/moods/image' + props.moodId + '.png'}
                    width="190"
                    alt="Mood image"
                  />
                </a>
              </Link>
            </div>

            {
              //show the suggestions
              props.suggestions.map((suggestion) => {
                let isShown = false;
                if (suggestion.mood_id === props.moodId) {
                  isShown = true;
                }
                return (
                  <div
                    className="suggestion"
                    key={`suggestion-${suggestion.suggestion_id}`}
                    css={rowStyleSuggestions}
                    style={{ display: isShown ? 'inline-block' : 'none' }}
                  >
                    <img
                      src={suggestion.image}
                      width="110"
                      alt="suggestions images"
                      //width="100%"
                      //height="100%"
                      //layout="responsive"
                      //objectFit="cover"
                      onClick={() => [
                        setSuggestionDescription(suggestion.description),
                        setSuggestionName(suggestion.name),
                        setSuggestionLink(suggestion.link),
                        setSuggestionImageExtra(suggestion.image_extra),
                        (moodClicked = true),
                      ]}
                    />
                  </div>
                );
              })
            }
            <div id="suggestion-description" css={suggestionDescriptionBox}>
              {!moodClicked ? (
                <div css={boxStyle}>
                  <p css={textStyle}>
                    We are here to make you feel better. Go ahead and press ☝
                  </p>
                  <img
                    css={catStyle}
                    src="/images/moods/cat.gif"
                    width="146"
                    alt="emotional emojis"
                  />{' '}
                </div>
              ) : (
                <div>
                  <div css={suggestionNameStyle}>{suggestionName}</div>
                  <div className="suggestionDescription">
                    {suggestionDescription}{' '}
                  </div>
                  {suggestionImageExtra === 'none' || !moodClicked ? (
                    <div></div>
                  ) : (
                    <div className="suggestionExtraImage">
                      {' '}
                      <img
                        src="/images/suggestions/breath-main.gif"
                        width="146"
                        alt="emotional emojis"
                      />
                    </div>
                  )}
                  {suggestionLink === 'none' || !moodClicked ? (
                    <div></div>
                  ) : (
                    <div className="suggestionLink">
                      {' '}
                      <a href={suggestionLink}>Click here!</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div css={logoStyle}>
              <Link href="/">
                <a>
                  <img
                    src="/images/logo.png"
                    width="113"
                    alt="emotional emojis"
                  />
                </a>
              </Link>
            </div>
            <br />
            <p css={pStyle}>Please login first</p>
            <div css={messageStyle}>
              <a css={aStyle} href="/">
                {' '}
                Go to Home
              </a>
            </div>
          </div>
        )
      }
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const moodId = parseInt(context.query.moodId as string);
  const mood = await getMood(moodId);

  const suggestions = await getSuggestions();

  // ! Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/root`,
        permanent: true,
      },
    };
  }
  // 1. Get a user from the cookie sessionToken
  const token = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(token);

  // 2. If there is a user, return that and render page

  if (token) {
    // 2. if it is valid and redirect
    const session = await getValidSessionByToken(token);
    if (user) {
      return {
        props: {
          moodId: moodId,
          mood: mood,
          user: user,
          suggestions: suggestions,
          authorized: true,
          csrfToken: createCsrfToken(), // check this
        },
      };
    }

    // 3. otherwise redirect to login
    return {
      props: { authorized: false },
      //redirect: {
      //  destination: `/login?returnTo=/users/protected-user`,
      //  permanent: false,
      //},
    };
  }
  return {
    props: {
      authorized: false,
      csrfToken: createCsrfToken(),
    },
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
