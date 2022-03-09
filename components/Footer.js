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
      <p> © COPYRIGHT 2022. ALL RIGHTS RESERVED.</p>
    </footer>
  );
}
