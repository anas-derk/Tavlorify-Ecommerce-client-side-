import Head from 'next/head';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className='home'>
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
    </div>
  );
}
