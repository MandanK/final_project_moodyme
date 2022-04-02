import {
  getUserByValidSessionToken,
  getValidSessionByToken,
} from '../utils/database';

import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../utils/database';

const headerStyles = css`
  height: 0px;
  padding: 5px 5px 65px 5px;
  // padding: 0 100px;
  border-radius: 4px;
  display: flex;
  top: 0;

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
  margin-top: 19px;
  margin-right: 11px;
  font-weight: bold;
  color: white;
  font-size: 16px;
  cursor: pointer;
  text-decoration-line: none;
`;

const linkStyle = css`
  font-weight: bold;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const logoStyle = css`
  margin-left: 7px;
  margin-top: 7px;
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
            width="60"
            alt="emotional emojis"
          />
        </a>
      </div>
      <div css={userObject}>
        {props.userObject ? (
          <div>
            {!props.userObject ? (
              <div></div>
            ) : (
              props.userObject && <div>{props.userObject.firstname}</div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
}
