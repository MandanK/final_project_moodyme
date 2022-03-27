import { serialize } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { deleteSessionByToken } from '../utils/database';

export default function Logout() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. get the cookie from the context and the session token
  const token = context.req.cookies.sessionToken;

  if (token) {
    console.log(token);
    // 2. we want to delete the session form our database
    await deleteSessionByToken(token);

    // 3. we want to set the cookie destruction

    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  // 4. we need to redirect to the page that linked logout

  return {
    redirect: {
      destination: '/', // It says that the user after the logout goes back to home page
      // if you want something else you need to change it here.
      permanent: false,
    },
  };
}
