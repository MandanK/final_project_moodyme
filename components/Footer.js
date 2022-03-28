import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyle = css`
  height: 55px;
  position: -webkit-sticky;
  position: sticky;
  width: 414px;
  position: fixed;
  border-radius: 4px;
  bottom: 0;
  background-color: #2d429b;
  overflow: auto;

  a + a {
    margin-left: 240px;
  }
`;

const lineStyle = css`
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: #1c2a66;
  padding: 10px;
`;
const logoutStyle = css`
  color: white;
  margin-left: 26px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration-line: none;
`;

const aboutStyle = css`
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration-line: none;
`;

{
  /* }
a {
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-decoration-line: none;
}

a + a {
  margin-left: 310px;
}
*/
}

export default function Footer() {
  return (
    <footer css={footerStyle}>
      <div css={lineStyle}>
        <Link href="/logout">
          <a css={logoutStyle}>Logout</a>
        </Link>
        <Link href="/about">
          <a css={aboutStyle}>About</a>
        </Link>
      </div>
    </footer>
  );
}
