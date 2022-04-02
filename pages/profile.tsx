import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getMoods, getSuggestions } from '../utils/database';
import { Mood, UserMood, Suggestion, createUserMood } from '../utils/database';
import { createCsrfToken } from '../utils/auth';
import { UserMoodResponseBody } from './api/user_mood';
import {
  getUserByValidSessionToken,
  getValidSessionByToken,
  getUserMoodByUserId,
} from '../utils/database';

export type UserMoodSerialized = {
  id: number;
  mood_id: number;
  type: string;
  text: string;
  image: string;
  created_at: string; //serialised date
};

const containerStyle = css`
  text-align: center;
  padding-top: 55px;
`;

const calendarStyle = css`
  margin-left: 29px;
  margin-bottom: 38px;
`;

const label1Style = css`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

const input1Style = css`
  margin-right: 15px;
  margin-bottom: 40px;
  width: 19px;
  height: 19px;
`;

const input2Style = css`
  margin-bottom: 40px;
  margin-right: -5px;
  width: 19px;
  height: 19px;
`;

const ulListStyle = css`
  list-style: none;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding-right: 46px;
`;

const rowStyle = css`
  width: 44.33%;
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 0px;
`;

const lineStyle = css`
  width: 70px;
  text-align: center;
`;

const logoStyle = css`
  display: flex;
  margin-top: 60px;
  margin-bottom: -15px;
  text-align: center;
  justify-content: center;
`;

const h1Style = css`
  font-size: 16px;
  color: white;
  font-weight: bold;
  line-height: 0.7;
  padding-top: 42px;
  margin-left: -5px;
`;

const noteLabel = css`
  display: inline-block;
  color: white;
  border-radius: 20px;
  font-family: sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-top: 55px;
  margin-left: -50px;
`;

const noteInput = css`
  display: inline-block;
  border-radius: 25px;
  width: 230px;
  background-color: #fff5ee;
  height: 95px;
  font-family: sans-serif;
  font-size: 16px;
  color: #484848;
  border: none;
  box-sizing: border-box;
  margin-left: 3px;
`;

const noteButton = css`
  background-color: #deb1ae;
  width: 230px;
  border-radius: 20px;
  height: 38px;
  margin-top: 15px;
  text-align: center;
  padding-bottom: 4px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
`;

const formStyle = css`
  margin: 0;
  position: relative;
  padding-top: 0px;
  color: white;
  text-align: center;
`;

const labelStyle = css`
  text-align: left;
  display: block;
  font-family: sans-serif;
  font-size: 18px;
  margin-top: 30px;
  padding-left: 50px;
`;

const inputStyle1 = css`
  display: block;
  width: 320px;
  height: 35px;
  margin-top: 10px;
  margin-bottom: -10px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 18px;
  color: #484848;
  border: none;
  box-sizing: border-box;
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

const inputStyle2 = css`
  display: block;
  width: 320px;
  height: 35px;
  margin-top: 10px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 18px;
  color: #484848;
  border: none;
  box-sizing: border-box;
`;

const buttonStyle = css`
  display: block;
  background-color: #deb1ae;
  width: 320px;
  border-radius: 20px;
  height: 35px;
  margin-top: -10px;
  margin-left: 50px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration-line: none;
`;

const textStyle = css`
  display: block;
  background-color: #f8f8f8;
  width: 320px;
  border-radius: 20px;
  height: 35px;
  margin-top: -10px;
  margin-left: 50px;
  padding: 10px;
  font-family: sans-serif;
  font-size: 14px;
  padding-top: 7px;
  font-weight: bold;
  color: #484848;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
`;

const registerStyle = css`
  text-decoration-line: none;
`;

const privacyStyle = css`
  width: 290px;
  height: 45px;
  padding: 50px;
  border-radius: 10px;
  box-sizing: content-box;
  margin-top: 60px;
  margin-left: 43px;
  background-color: #f5e7e6;
  padding-top: 18px;
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 40px;
  text-align: left;
  font-size: 14px;
  color: #484848;
  line-height: 1.7em;
`;

type Props = {
  user_moods: UserMoodSerialized[];
  userObject: { username: string; firstname: string };
  moods: Mood[];
  refreshUserProfile: () => void;
  authorized: Boolean;
  user: { id: number; username: string };
  csrfToken: string;
  suggestions: Suggestion[];
};

const errorStyle = css`
  color: #f00;
  margin-left: 50px;
  padding-top: 5px;
`;

type Errors = { message: string }[];

let moodClicked = false;
let currentClickedMood = 0;

//let currentSuggestions: Suggestion[];

async function moodImageClick(mood_id: number) {
  // change the background color base on moods
  console.log(mood_id);
  if (mood_id === 1) {
    document.body.style.backgroundColor = '#f2658c';
  } else if (mood_id === 2) {
    document.body.style.backgroundColor = '#23AAD4';
  } else if (mood_id === 3) {
    document.body.style.backgroundColor = '#F23255';
  } else {
    document.body.style.backgroundColor = '#8d8db9';
  }
  moodClicked = true;
  currentClickedMood = mood_id;
}

const ColoredLine = ({ color = 'green' }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 6,
      width: 300,
    }}
  />
);

export default function Home(props: Props) {
  const [showAll, setShowAll] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  let offset = dateValue.getTimezoneOffset();
  let dateValueCorrected = dateValue;
  const [note, setNote] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  const handleChange = () => {
    setShowAll(!showAll);
  };

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
            <div css={calendarStyle}>
              <Calendar onChange={setDateValue} value={dateValue} />
            </div>

            <label css={label1Style}>
              <input
                css={input1Style}
                type="checkbox"
                checked={showAll}
                onChange={handleChange}
              />
              Show All
            </label>

            <div>
              <label>
                <input
                  css={input2Style}
                  type="checkbox"
                  checked={showAll}
                  onChange={handleChange}
                />
                <img
                  src={'/images/moods/image1.png'}
                  width="70"
                  alt="Mood Emojis"
                  //width="100%"
                  //height="100%"
                  //layout="responsive"
                  //objectFit="cover"
                  //onClick={() => {
                  //  moodImageClick(mood.mood_id);
                  //}}
                />
              </label>

              <label>
                <input
                  css={input2Style}
                  type="checkbox"
                  checked={showAll}
                  onChange={handleChange}
                />
                <img
                  src={'/images/moods/image2.png'}
                  width="70"
                  alt="Mood Emojis"
                  //width="100%"
                  //height="100%"
                  //layout="responsive"
                  //objectFit="cover"
                  //onClick={() => {
                  //  moodImageClick(mood.mood_id);
                  //}}
                />
              </label>

              <label>
                <input
                  css={input2Style}
                  type="checkbox"
                  checked={showAll}
                  onChange={handleChange}
                />
                <img
                  src={'/images/moods/image3.png'}
                  width="70"
                  alt="Mood Emojis"
                  //width="100%"
                  //height="100%"
                  //layout="responsive"
                  //objectFit="cover"
                  //onClick={() => {
                  //  moodImageClick(mood.mood_id);
                  //}}
                />
              </label>

              <label>
                <input
                  css={input2Style}
                  type="checkbox"
                  checked={showAll}
                  onChange={handleChange}
                />
                <img
                  src={'/images/moods/image4.png'}
                  width="70"
                  alt="Mood Emojis"
                  //width="100%"
                  //height="100%"
                  //layout="responsive"
                  //objectFit="cover"
                  //onClick={() => {
                  //  moodImageClick(mood.mood_id);
                  //}}
                />
              </label>
            </div>

            <ul css={ulListStyle}>
              {props.user_moods.map((mood) => {
                let isShown = false;
                if (
                  showAll ||
                  new Date(JSON.parse(mood.created_at))
                    .toISOString()
                    .split('T')[0] ===
                    new Date(dateValue.getTime() - offset * 60 * 1000)
                      .toISOString()
                      .split('T')[0] // We need to calculate offset, since ISOString considers this and the dates will be wrong if this is not taken into consideration
                ) {
                  isShown = true;
                }

                return (
                  <li style={{ display: isShown ? 'inline-block' : 'none' }}>
                    <div></div>
                    <div>
                      {
                        new Date(JSON.parse(mood.created_at))
                          .toISOString()
                          .split('T')[0]
                      }
                    </div>
                    <div key={`mood-${mood.mood_id}`} css={rowStyle}>
                      <img
                        src={'/images/moods/image' + mood.mood_id + '.png'}
                        width="130"
                        alt="Mood Emojis"
                        //width="100%"
                        //height="100%"
                        //layout="responsive"
                        //objectFit="cover"
                        onClick={() => {
                          moodImageClick(mood.mood_id);
                        }}
                      />
                      <div>{mood.text}</div>
                    </div>
                    <ColoredLine color="#deb1ae" />
                  </li>
                );
              })}
            </ul>
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
  const suggestions = await getSuggestions();
  const moods = await getMoods();
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

  let user_moods_serialized = [] as UserMoodSerialized[];

  // 2. If there is a user, return that and render page

  if (token) {
    // 2. if it is valid and redirect
    const session = await getValidSessionByToken(token);
    if (user) {
      const user_Moods = await getUserMoodByUserId(user.id);
      user_Moods.map((user_mood) => {
        let user_mood_serialized: UserMoodSerialized = {
          id: user_mood.id,
          mood_id: user_mood.mood_id,
          type: user_mood.type,
          text: user_mood.text,
          image: user_mood.image,
          created_at: JSON.stringify(user_mood.created_at),
        };
        user_moods_serialized.push(user_mood_serialized);
      });

      return {
        props: {
          user_moods: user_moods_serialized,
          moods: moods,
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
