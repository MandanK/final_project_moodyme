import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../util/database';

const headerStyles = css`
  background-color: #eee;
  padding: 10px 15px;
  border-radius: 4px;
  margin: 8px 8px 20px;
  display: flex;

  a + a {
    margin-left: 10px;
  }

  > div:first-child {
    margin-right: auto;
  }
`;

type Props = {
  userObject?: User;
};

export default function Header(props: Props) {
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/users/protected-user">
          <a data-test-id="products-link">Protected User</a>
        </Link>
        <Link href="/about">
          <a data-test-id="cart-link">
            About <span data-test-id="cart-count"></span>
          </a>
        </Link>
        <Link href="/moods">
          <a data-test-id="products-link">Moods</a>
        </Link>
      </div>
      {props.userObject && <div>{props.userObject.username}</div>}

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
