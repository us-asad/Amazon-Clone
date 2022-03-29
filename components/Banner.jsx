import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
	{ src: "/carousel-images/1.jpg", alt: "banner pic"},
	{ src: "/carousel-images/2.jpg", alt: "banner pic"},
	{ src: "/carousel-images/3.jpg", alt: "banner pic"}
];

export default function Banner() {
	return (
		<div className="relative">
			<Carousel
				autoPlay
				infiniteLoop
				showStatus={false}
				showIndicators={false}
				showThumbs={false}
				interval={5000}
			>
				{images.map(({ src, alt },i) => (
					<div key={i}>
						<img loading="lazy" src={src} alt={alt} />
					</div>
				))}
			</Carousel>
		</div>
	);
}