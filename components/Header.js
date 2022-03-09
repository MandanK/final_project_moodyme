import { css } from '@emotion/react';
import Link from 'next/link';

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

export default function Header() {
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/products">
          <a data-test-id="products-link">User's Account</a>
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
      <Link href="/login">
        <a data-test-id="products-link">Login</a>
      </Link>
      <Link href="/register">
        <a data-test-id="products-link">Register</a>
      </Link>
    </header>
  );
}
