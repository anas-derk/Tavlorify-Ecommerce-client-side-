import Head from 'next/head';
import Header from '../components/Header';
import backImg1 from "../../public/images/backgrounds/01.jpg";
import backImg2 from "../../public/images/backgrounds/02.jpg";
import backImg3 from "../../public/images/backgrounds/03.jpg";
import { useState } from 'react';

export default function Home() {

  const [infoBoxAppearedIndex, setInfoBoxAppearedIndex] = useState(1);

  let infoBoxData = [
    {
      id: 1,
      backImgSrc: backImg1.src,
      content: "Welcome to the Tavlorify Store"
    },
    {
      id: 2,
      backImgSrc: backImg2.src,
      content: "Welcome to the Tavlorify Store"
    },
    {
      id: 3,
      backImgSrc: backImg3.src,
      content: "Welcome to the Tavlorify Store"
    },
  ]

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
        {infoBoxData.map((data, index) => (
          /* Start Info Box */
          <div className="info-box"
            key={data.id}
            style={{
              backgroundImage: `url(${data.backImgSrc})`,
              opacity: infoBoxAppearedIndex == data.id ? 1 : 0,
              transform: infoBoxAppearedIndex == data.id ? "scale3d(1, 1, 1)" : "scale3d(0.8, 0.8, 0.8)",
            }}>
            <div className="overlay text-white d-flex justify-content-center align-items-center">
              {/* Start Main Content */}
              <main
                className="p-3"
                style={{
                  transform: infoBoxAppearedIndex == data.id ? "rotateX(360deg)": ""
                }}
              >
                {data.content}
              </main>
              {/* End Main Content */}
            </div>
          </div>
          /* End Info Box */
        ))}
      </div>
    </div>
  );
}