import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';

const wrapper = css`
  min-height: 100vh;
  padding: 0 0.5rem;
  //padding: 0 -20%;
  justify-content: center;
  align-items: center;
`;

export default function Layout(props) {
  return (
    <div css={wrapper}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header userObject={props.userObject} />

      <main>{props.children}</main>
    </div>
  );
}
