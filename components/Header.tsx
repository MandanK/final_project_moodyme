import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../util/database';

const headerStyles = css`
  background-color: #3f55b6;
  height: 45px;
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 10px;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  a {
    float: right;
    margin-top: 18px;
    margin-left: 20px;
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
  float: right;
  margin-top: 18px;
  margin-left: 20px;
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
        <img
          css={logoStyle}
          src="/images/logo.png"
          width="63"
          alt="emotional emojis"
        />

        <Link href="/users/protected-user">
          <a data-test-id="products-link">Protected User</a>
        </Link>
        <Link href="/about">
          <a data-test-id="cart-link">
            About <span data-test-id="cart-count"></span>
          </a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/moods">
          <a data-test-id="products-link">Moods</a>
        </Link>
      </div>
      <div css={userObject}>
        {props.userObject && <div>{props.userObject.firstname}</div>}{' '}
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
