import Head from 'next/head';
import Layout from '../components/Layout';
import { css } from '@emotion/react';

type Props = {
  userObject: { username: string };
};

const containerStyle = css`
  min-height: 220vh;
`;
const h1Style = css`
  color: white;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 28px;
`;

const pStyle = css`
  color: #f5f5f5;
  font-size: 17px;
  margin-left: 30px;
  margin-right: 30px;
`;

const imageStyle = css`
  margin-left: 36px;
  padding-top: 10px;
`;
export default function About(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>About</title>
        <meta name="description" content="About the application" />
      </Head>

      <div css={containerStyle}>
        <h1 css={h1Style}>Moody Me</h1>

        <div css={pStyle}>
          <p>
            The ability to experience and express emotions is more important
            than you might realize.
          </p>
          <p>
            As the felt response to a given situation, emotions play a key part
            in your reactions. When you're in tune with them, you have access to
            important knowledge that helps with:
          </p>
          <ul>
            <strong>
              <li>decision-making</li>
              <li>relationship success</li>
              <li>day-to-day interactions</li>
              <li>self-care</li>
            </strong>
          </ul>
          <p>
            {' '}
            While emotions can have a helpful role in your daily life, they can
            take a toll on your emotional health and interpersonal relationships
            when they start to feel out of control.
          </p>
          <img
            css={imageStyle}
            src="/images/moods/about.jpg"
            width="283"
            alt="emotional emojis"
          />

          <p>
            <strong>Moody Me</strong> is a mobile application that help you
            become the boss of your emotions.{' '}
          </p>
          <p>
            This mobile app is designed to help you keep the track of your mood
            throughout the year using emojis. This app allows you to select your
            mood on daily bases to eventually have a visualisation about the
            ways you have felt throughout the year. Using this app you can also
            add notes on how you have felt whenever you want and you will also
            be given a set of suggestions to either change your mood (if it is
            negative) or to boost it (if it is positive).
          </p>
          <p>
            You need to provide a name, an email address and a password to gain
            access. There are four moods including happy, sad, angry and
            stressed that you can choose as many times as you want during the
            day. Every time that you select a mood, you can also add a note
            about how you feel or what is on your mind. If you want to change or
            boost a mood, there is a list of suggestions (six suggestions for
            each mood) with a brief description that you can benefit from. You
            are also able to save your moods and notes to keep track of them
            throughout the year. You will have your own personal profile page
            where you can have access to your stored notes and moods, filtered
            by the mood you have selected.
          </p>
          <img
            css={imageStyle}
            src="/images/moods/about2.jpg"
            width="283"
            alt="emotional emojis"
          />
          <p>
            <strong>Never forget we are here only for you!</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}
