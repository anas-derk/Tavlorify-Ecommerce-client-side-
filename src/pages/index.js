import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className='home'>
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
      {/* Start Container */}
      <div className="container pt-3">
        <h2 className="login">Hello</h2>
      </div>
      {/* End Container */}
    </div>
  );
}
