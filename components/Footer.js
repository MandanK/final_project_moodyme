import { css } from '@emotion/react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <h3>Moodchanger.com</h3>
      <Link href="/">
        <a>HOME</a>
      </Link>
      <br />
      <Link href="/about">
        <a>ABOUT US</a>
      </Link>

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
      <p> © COPYRIGHT 2022. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
