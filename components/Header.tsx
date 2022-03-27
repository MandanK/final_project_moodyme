import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../utils/database';

const headerStyles = css`
  height: 45px;
  padding: 5px 5px 65px 5px;
  // padding: 0 100px;
  border-radius: 4px;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  a {
    float: right;
    margin-top: 5px;
    margin-left: 5px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    text-decoration-line: none;
  }

  a + a {
    margin-left: 10px;
  }

  > div:first-child {
    margin-right: auto;
  }
`;

const userObject = css`
  margin-top: 5px;
  float: right;
  margin-left: 20px;
  margin-right: 5px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const logoStyle = css`
  margin-left: 1px;
  float: left;
`;
type Props = {
  userObject?: User;
};

export default function Header(props: Props) {
  return (
    <header css={headerStyles}>
      <div>
        <a href="/">
          <img
            css={logoStyle}
            src="/images/logo.png"
            width="70"
            alt="emotional emojis"
          />
        </a>
      </div>
      <div css={userObject}>
        {props.userObject && <div>{props.userObject.firstname}</div>}
      </div>
      {props.userObject ? (
        <a href="/logout">Logout</a>
      ) : (
        <>
          <Link href="/login">
            <a data-test-id="products-link">Login</a>
          </Link>
          <Link href="/register">
            <a data-test-id="products-link">Register</a>
          </Link>
        </>
      )}
    </header>
  );
}
