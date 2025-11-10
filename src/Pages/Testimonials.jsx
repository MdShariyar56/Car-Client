import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const testimonials = [
  { name: "John Doe", text: "Great service, easy booking and reliable cars!", image: "https://i.ibb.co/gLTBmfwW/Nissan-Leaf-2026.webp" },
  { name: "Sarah Lee", text: "Affordable rates and excellent support, highly recommend.", image: "https://i.ibb.co/mFrHfXWH/photo-1493238792000-8113da705763-1.jpg" },
  { name: "Mike Johnson", text: "Loved my experience! The car was in perfect condition.", image: "https://i.ibb.co/Myh09GFP/Toyota-RAV4-Hybrid-036.webp" },
  { name: "Emily Clark", text: "Smooth booking process and amazing customer support.", image: "https://i.ibb.co/KzWjnPFR/grey-coupe-rainy-highway-motion-focus.jpg" },
  { name: "David Smith", text: "Cars were well-maintained and the rental process was hassle-free.", image: "https://i.ibb.co/xtHdVgGj/yellow-car-gas-station.jpg" },
  { name: "Sophia Williams", text: "Highly recommend for anyone looking for quality rental cars!", image: "https://i.ibb.co/MxpDFvH4/01-usnpx-2025fordmustang-angularfront-jms.webp" },
];

const Testimonials = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="my-20 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
        Customer Testimonials
      </h2>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]} 
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer min-h-[20rem]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: .95, boxShadow: "0px 15px 35px rgba(0,0,0,0.25)" }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${t.image})` }}
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center text-white p-6">
                <p className="italic text-lg md:text-xl leading-relaxed ">"{t.text}"</p>
                <h4 className="mt-6 font-semibold text-lg md:text-xl text-blue-500">– {t.name}</h4>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
