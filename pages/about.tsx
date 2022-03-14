import Head from 'next/head';
import Layout from '../components/Layout';

type Props = {
  userObject: { username: string };
};

export default function About(props: Props) {
  return (
    <div>
      <Layout userObject={props.userObject}>
        <Head>
          <title>About</title>
          <meta name="description" content="About the application" />
        </Head>

        <div>
          <h1>About Us</h1>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </Layout>
    </div>
  );
}
