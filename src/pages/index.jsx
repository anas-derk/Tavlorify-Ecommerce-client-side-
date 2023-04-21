import Head from 'next/head';
import Header from '../components/Header';
import backImg1 from "../../public/images/backgrounds/01.jpg";
import backImg2 from "../../public/images/backgrounds/02.jpg";
import backImg3 from "../../public/images/backgrounds/03.jpg";
import { useState } from 'react';

export default function Home() {

  const [infoBoxAppearedIndex, setInfoBoxAppearedIndex] = useState(1);

  setInterval(() => {

    switch (infoBoxAppearedIndex) {

      case 1: {

        setInfoBoxAppearedIndex(2);

        break;

      }

      case 2: {

        setInfoBoxAppearedIndex(3);

        break;

      }

      case 3: {

        setInfoBoxAppearedIndex(1);

        break;

      }

    }

  }, 4000);

  return (
    <div className="home">
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
      <div className="introduction">
        <div className="info-box" style={{ backgroundImage: `url(${backImg1.src})`, opacity: infoBoxAppearedIndex == 1 ? 1 : 0 }}>
          <div className="overlay text-white d-flex justify-content-center align-items-center">
            {/* Start Main Content */}
            <main>
              Welcome to the Tavlorify Store
            </main>
            {/* End Main Content */}
          </div>
        </div>
        <div className="info-box" style={{ backgroundImage: `url(${backImg2.src})`, opacity: infoBoxAppearedIndex == 2 ? 1 : 0 }}>
          <div className="overlay text-white d-flex justify-content-center align-items-center">
            {/* Start Main Content */}
            <main>
              aaa
            </main>
            {/* End Main Content */}
          </div>
        </div>
        <div className="info-box" style={{ backgroundImage: `url(${backImg3.src})`, opacity: infoBoxAppearedIndex == 3 ? 1 : 0 }}>
          <div className="overlay text-white d-flex justify-content-center align-items-center">
            {/* Start Main Content */}
            <main>
              bbb
            </main>
            {/* End CMain Content */}
          </div>
        </div>
      </div>
    </div>
  );
}