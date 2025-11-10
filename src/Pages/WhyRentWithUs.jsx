import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  {
    title: "Easy Booking",
    desc: "Book your car in just a few clicks without hassle.",
    image: "https://i.ibb.co/gLTBmfwW/Nissan-Leaf-2026.webp",
  },
  {
    title: "Affordable Rates",
    desc: "Get the best rates for every car and journey.",
    image: "https://i.ibb.co/mFrHfXWH/photo-1493238792000-8113da705763-1.jpg",
  },
  {
    title: "Trusted Providers",
    desc: "All our cars are from reliable and verified providers.",
    image: "https://i.ibb.co/Myh09GFP/Toyota-RAV4-Hybrid-036.webp",
  },
  {
    title: "24/7 Support",
    desc: "We are here for you anytime you need assistance.",
    image: "https://i.ibb.co/ycBt8B3T/view-3d-car-1.jpg",
  },
];

const WhyRentWithUs = () => {
  return (
    <section className="mb-2 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
        Why Rent With Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="relative h-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
                backgroundImage: `url(${b.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center text-white p-4">
              <div className="text-green-400 text-5xl mb-3">
                <FaCheckCircle />
              </div>
              <h3 className="font-bold text-xl mb-1 text-blue-200">{b.title}</h3>
              <p className="text-sm md:text-base">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyRentWithUs;
