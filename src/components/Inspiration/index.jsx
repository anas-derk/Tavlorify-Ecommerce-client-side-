import Image from "next/image";

export default function Inspiration({ imagesSrc }) {
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