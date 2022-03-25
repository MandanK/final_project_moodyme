import { css } from '@emotion/react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const wrapper = css`
  margin: auto;
  border-style: dashed;
  border-width: 2px;
  width: 390px;
  min-height: 100vh;
  padding: 0 0rem;
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

      <Footer />
    </div>
  );
}
