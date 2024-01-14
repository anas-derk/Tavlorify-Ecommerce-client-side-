import InspirationImage1 from "@/../public/images/Inspiration/1.webp";
import InspirationImage2 from "@/../public/images/Inspiration/2.webp";
import InspirationImage3 from "@/../public/images/Inspiration/3.webp";
import InspirationImage4 from "@/../public/images/Inspiration/4.webp";
import InspirationImage5 from "@/../public/images/Inspiration/5.webp";
import InspirationImage6 from "@/../public/images/Inspiration/6.webp";
import InspirationImage7 from "@/../public/images/Inspiration/7.webp";
import InspirationImage8 from "@/../public/images/Inspiration/8.webp";
import Image from "next/image";

export default function Inspiration() {
    const imagesSrc = [
        InspirationImage1.src,
        InspirationImage2.src,
        InspirationImage3.src,
        InspirationImage4.src,
        InspirationImage5.src,
        InspirationImage6.src,
        InspirationImage7.src,
        InspirationImage8.src,
    ];
    return (
        <section className="inspiration p-3 text-center">
            <h3 className="fw-bold">Inspiration</h3>
            <h6 className="mb-3">EXEMPEL FRÅN OSS OCH VÅRA KUNDER</h6>
            <div className="row">
                {imagesSrc.map((imageSrc, index) => (
                    <div className="col-md-3" key={index}>
                        <Image src={imageSrc} width={300} height={300} />
                    </div>
                ))}
            </div>
        </section>
    );
}