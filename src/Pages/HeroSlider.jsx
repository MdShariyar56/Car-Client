import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronDown } from 'lucide-react'; 

const slides = [
   {
    id: 1,
    title: 'Drive Your Dream Car Today!',
    subtitle: 'Experience the ultimate driving pleasure with our wide range of luxury and budget-friendly cars.',
    image: 'https://i.ibb.co/gLTBmfwW/Nissan-Leaf-2026.webp',
    btn: 'Book Now',
  },
  {
    id: 2,
    title: 'Affordable Rentals for Every Journey',
    subtitle: 'Save more, travel further — discover unbeatable prices and flexible rental plans.',
    image: 'https://i.ibb.co/mFrHfXWH/photo-1493238792000-8113da705763-1.jpg',
    btn: 'View Offers',
  },
  {
    id: 3,
    title: 'Trusted & Loved by Thousands of Drivers',
    subtitle: 'Join our happy community of drivers enjoying 24/7 support and verified, reliable vehicles.',
    image: 'https://i.ibb.co/Myh09GFP/Toyota-RAV4-Hybrid-036.webp',
    btn: 'Learn More',
  }
];

const HeroSlider = () => {
  return (
    <div className="w-full h-full relative overflow-hidden ">
      <Swiper
        spaceBetween={40}
        centeredSlides
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false} 
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[60vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[60vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}>
              <div className="absolute inset-0 bg-black/55"></div>
              
              <motion.div
                className="relative z-10 flex flex-col items-start justify-center h-full text-white px-10 md:px-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  <Typewriter
                    words={[slide.title]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h1>

                <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-300 max-w-3xl">
                    {slide.subtitle}
                    </p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-full shadow-lg transition"
                >
                  {slide.btn}
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown size={36} className="opacity-80" />
      </motion.div>
    </div>
  );
};

export default HeroSlider;
