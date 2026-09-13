import { useState } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { Button } from "@/shared/ui/button";
import { ProductCard } from "@/shared/ui/product_card";
import { FeatureCard } from "@/widgets/feature_card";
import woman from "@/shared/assets/hero-image-pic.png";
import bgImage from "@/shared/assets/hero-image-bg.png";
import productImg from "@/shared/assets/photo_flowers_product.png";
import flowers from "@/shared/assets/flowers.png";
import womanCafe from "@/shared/assets/woman_in_cafe.png";
import grpinky from "@/shared/assets/gr_pinky.png";
import grblue from "@/shared/assets/gr_blue.png";
import grbluepinky from "@/shared/assets/gr_blue_and_pinky.png";
import grpinky2 from "@/shared/assets/gr_pinky_2.png";
import bluewhyus from "@/shared/assets/blue1_why_us.png";
import pinkywhyus from "@/shared/assets/pinky1_why_us.png";
import bluefaq from "@/shared/assets/blue1_faq.png";
import pinkycontactus from "@/shared/assets/pinky1_contact_us.png";
import bluecontactus from "@/shared/assets/blue1_contact_us.png";
import client1 from "@/shared/assets/clients_1.png";
import client2 from "@/shared/assets/client_2.png";
import client3 from "@/shared/assets/clients_3.png";
import client4 from "@/shared/assets/clients_4.png";
import client5 from "@/shared/assets/clients_5.png";
import contactUs from "@/shared/assets/contact_us.png";
import faqwoman from "@/shared/assets/faq_woman.png";
import location from "@/shared/assets/contact_icon.svg";
import email from "@/shared/assets/email_icon.svg";
import phone from "@/shared/assets/phone_icon.svg";
import instagram from "@/shared/assets/insta_icon.svg";
import facebook from "@/shared/assets/facebook_icon.svg";

const MOCK_PRODUCTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: "Name Of Bouquet",
  type: "Flower Type",
  price: "$20",
  image: { productImg },
}));

const WHY_US_CARDS = [
  {
    id: 1,
    title: "Perks & Discounts",
    desc: "Enjoy exclusive promo codes and rewards with every order.",
  },
  {
    id: 2,
    title: "B2B Partnerships",
    desc: "Elevate corporate spaces with customized floral artistry.",
  },
  {
    id: 3,
    title: "Fearless Combinations",
    desc: "Rare blooms curated into daring, artistic color palettes.",
  },
];

const FAQ_DATA = [
  {
    question: "Can I order a custom arrangement?",
    answer:
      "Yes! Share your wildest dreams, and our team will sculpt a daring, one-of-a-kind floral work of art tailored right for you.",
  },
  {
    question: "How do your promo codes and discounts work?",
    answer:
      "Promo codes appear in your profile after over 5 orders or a wholesale purchase. Enjoy bold rewards on all bespoke bouquets.",
  },
  {
    question: "Do you offer corporate or B2B floral services?",
    answer:
      "We work with hotels, restaurants, photo studios, and wedding planners, providing weekly and monthly artistic subscriptions.",
  },
  {
    question: "What makes Fleunique bouquets so unique?",
    answer:
      "We reject predictable formulas by blending rare, exotic flowers with vibrant palettes, turning each creation into fine art.",
  },
  {
    question: "How do you guarantee freshness upon delivery?",
    answer:
      "Every single stem is sourced fresh each day, protected in specialized hydration wraps, and delivered in pristine condition.",
  },
];

export function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(2);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/*HERO IMAGE SECTION */}
        <section className="relative w-full h-[1024px] flex flex-col overflow-hidden">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10"
          />

          <div className="relative flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px] pt-20 md:pt-26 lg:pt-[190px] flex flex-col">
            <h1 className="relative ml-auto max-w-[880px] text-right font-pt-sans font-bold text-headline-1 uppercase text-gray-900 leading-tight z-20">
              Flowers that are as unique as you
            </h1>

            <div className="relative flex flex-col lg:flex-row justify-end items-center lg:items-end flex-grow w-full mt-10 lg:mt-0">
              <div className="lg:absolute bottom-0 -left-20 w-full max-w-[300px] md:max-w-[420px] lg:max-w-[580px] xl:max-w-[650px] flex items-end z-0">
                <img
                  src={woman}
                  alt="Florist with a bouquet"
                  className="w-full h-auto max-h-[754px] object-contain object-bottom"
                />
              </div>

              <div className="relative z-10 w-full max-w-[400px] lg:max-w-[352px] flex flex-col gap-8 mb-10 lg:mb-[160px] items-center lg:items-start lg:ml-auto">
                <p className="font-montserrat font-normal lg:text-[18px] leading-tight text-center lg:text-justify text-gray-700">
                  Step into our vivid world where bold artistry meets playful
                  imagination. Dare to gift something truly unique and discover
                  extraordinary bouquets designed to brighten any gloomy day and
                  turn simple moments into an unforgettable joy.
                </p>

                <Button size="large">EXPLORE</Button>
              </div>
            </div>
          </div>
        </section>

        <div className="relative w-full overflow-hidden">
          <img
            src={grpinky}
            alt=""
            className="absolute top-0 right-[0%] w-[355px] pointer-events-none -z-20 object-contain"
          />
          <img
            src={grblue}
            alt=""
            className="absolute top-[55%] right-[0%] w-[355px] pointer-events-none -z-20 object-contain"
          />
          <img
            src={grbluepinky}
            alt=""
            className="absolute bottom-[25%] left-[25%] w-[1200px] h-[1204px] pointer-events-none -z-20 object-contain"
          />
          <img
            src={grpinky2}
            alt=""
            className="absolute bottom-[-19%] left-[0%] w-[600px] md:w-[900px] pointer-events-none -z-10 object-contain"
          />

          {/* BEST PICKS SECTION */}
          <section className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px] py-16 md:py-24">
            <h2 className="text-center font-pt-sans font-bold text-headline-2 text-forest-300 uppercase mb-10 md:mb-10">
              Best Picks
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  type={product.type}
                  price={product.price}
                  image={productImg}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </section>

          {/* ABOUT US SECTION */}
          <section className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px] pb-24 flex justify-center">
            <div className="relative flex flex-col lg:block w-full max-w-[800px] lg:h-[480px]">
              <div className="lg:absolute lg:top-0 lg:left-0 w-full lg:w-[336px] z-20 mb-8 lg:mb-0">
                <h2 className="font-pt-sans font-bold text-headline-2 text-forest-300 uppercase mb-3">
                  About Us
                </h2>
                <p className="font-montserrat font-normal text-sm md:text-base text-forest-300 leading-tight text-justify">
                  Welcome to Fleunique, an artistic floral boutique born from
                  one simple truth: extraordinary people deserve extraordinary
                  flowers. We know generic bouquets fail to express real
                  feelings. That is why we craft bold, playful, and vivid
                  arrangements full of fearless creativity, turning even the
                  gloomiest day into an unforgettable celebration of pure
                  beauty. Fleunique — dare to gift something truly unique.
                </p>
              </div>

              <img
                src={flowers}
                alt="Floral arrangement"
                className="w-full lg:w-[490px] h-[133px] object-cover rounded-[20px] lg:absolute lg:top-[310px] lg:left-0 z-0 mb-8 lg:mb-0"
              />

              <img
                src={womanCafe}
                alt="Florist at work"
                className="w-full md:w-[327px] h-[327px] object-cover rounded-[20px] lg:absolute lg:top-6 lg:left-[370px] z-10 mb-8 lg:mb-0 self-center"
              />

              <div className="w-full md:w-[286px] h-[246px] bg-rose-300 rounded-2xl py-6 px-4 shadow-xl flex flex-col lg:absolute lg:top-[230px] lg:left-[440px] z-30 self-center">
                <h3 className="font-pt-sans font-bold text-rose-50 text-headline-3">
                  Contact Us
                </h3>

                <p className="font-montserrat text-rose-50 text-headline-5 leading-tight mb-auto">
                  Ready to create something unique? Contact us today, and let
                  our florists craft a bold, playful floral artwork just for
                  you.
                </p>

                <button className="w-full h-11 bg-rose-50 text-forest-300 font-montserrat! font-semibold! text-headline-4 rounded-full transition-colors hover:bg-forest-300 hover:text-rose-50">
                  Our Contacts
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* OUR UNIQUE CLIENTS SECTION */}
        <section className="w-full h-204.5 bg-forest-300 flex flex-col justify-center relative overflow-hidden">
          <div className="w-full max-w-[1440px] mx-auto relative h-full flex flex-col justify-center">
            <h2 className="ml-40 font-pt-sans font-bold text-headline-2 mb-12 text-rose-50 uppercase z-10">
              Our Unique Clients
            </h2>

            <div className="w-full flex items-center justify-between gap-4 lg:gap-0 overflow-x-auto pb-4 lg:pb-0">
              <img
                src={client1}
                alt="Client 1"
                className="w-[266px] h-[390px] object-cover rounded-[16px] max-[1441px]:rounded-l-none shrink-0"
              />
              <img
                src={client2}
                alt="Client 2"
                className="w-[260px] h-[260px] object-cover rounded-[16px] shrink-0"
              />
              <img
                src={client3}
                alt="Client 3"
                className="w-[260px] h-[520px] object-cover rounded-[16px] shrink-0"
              />
              <img
                src={client4}
                alt="Client 4"
                className="w-[260px] h-[260px] object-cover rounded-[16px] shrink-0"
              />
              <img
                src={client5}
                alt="Client 5"
                className="w-[266px] h-[390px] object-cover rounded-[16px] max-[1441px]:rounded-r-none shrink-0"
              />
            </div>
          </div>
        </section>

        <div className="relative w-full overflow-hidden">
          <img
            src={bluewhyus}
            alt=""
            className="absolute -top-50 left-[0%] w-[355px] pointer-events-none -z-20 object-contain"
          />
          <img
            src={pinkywhyus}
            alt=""
            className="absolute top-[27%] right-[0%] w-[500px] pointer-events-none -z-20 object-contain"
          />
          <img
            src={bluefaq}
            alt=""
            className="absolute bottom-[10%] right-[0%] w-[800px]  pointer-events-none -z-20 object-contain"
          />
          <img
            src={pinkycontactus}
            alt=""
            className="absolute bottom-[-10%] left-[0%] w-[600px] pointer-events-none -z-10 object-contain"
          />
          <img
            src={bluecontactus}
            alt=""
            className="absolute bottom-[-2%] right-[0%] w-[400px] pointer-events-none -z-10 object-contain"
          />
          {/* WHY US? SECTION */}
          <section className="relative w-full max-w-[1440px] mx-auto mt-28 mb-22 flex items-center justify-center overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center text-rose-100 font-rubik-bubbles text-[120px] md:text-[240px] lg:text-[480px] leading-none lg:leading-[450px] select-none z-0">
              WHY US?
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[992px] h-auto lg:h-[396px] rounded-[32px] p-6 lg:p-[32px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-[128px] z-10"
            >
              {WHY_US_CARDS.map((card) => (
                <FeatureCard
                  key={card.id}
                  image={productImg}
                  title={card.title}
                  desc={card.desc}
                />
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="relative w-full max-w-[1440px] mx-auto h-auto lg:h-[1024px] flex flex-col lg:flex-row items-start mb-28 gap-10 lg:gap-10">
            <div className="w-full lg:w-1/2 h-100 lg:h-full">
              <img
                src={faqwoman}
                alt="Florist preparing flowers"
                className="w-full h-full object-cover rounded-[16px]"
              />
            </div>

            <div className="w-full lg:w-[544px] flex flex-col justify-center pt-14">
              <h2 className="text-forest-300 font-pt-sans font-bold text-headline-2 uppercase mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-montserrat text-headline-5 text-justify leading-tight text-forest-300 mb-2">
                Curious about our bespoke floral art, delivery, or custom
                creations? We have gathered answers to everything you need to
                know about choosing bold, vibrant bouquets designed for someone
                truly extraordinary.
              </p>

              <div className="flex flex-col w-full">
                {FAQ_DATA.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border-b-2 border-silver-100 py-5 cursor-pointer flex flex-col"
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-montserrat text-headline-4 text-forest-300 pr-4">
                          {item.question}
                        </span>
                        <span className="shrink-0 w-8 h-8 flex items-center justify-center text-forest-200 select-none">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-200"
                          >
                            <path
                              d="M2.5 9H15.5"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {!isOpen && (
                              <path
                                d="M9 2.5V15.5"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                          </svg>
                        </span>
                      </div>
                      {isOpen && (
                        <div className="mt-0 pr-8 w-full font-montserrat text-headline-5 leading-relaxed text-forest-200">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-col w-full">
                <span className="font-montserrat! text-[14px] text-forest-200 mb-4 tracking-wide">
                  Do you still have questions? Ask our agents directly!
                </span>
                <button className="w-full h-[45px] bg-rose-300 hover:bg-forest-300/80 transition-colors text-rose-50 rounded-full font-montserrat! font-semibold! text-headline-4 tracking-wide">
                  Contact Our Support
                </button>
              </div>
            </div>
          </section>

          {/* CONTACT US SECTION */}
          <section className="relative w-full max-w-[1440px] mx-auto lg:px-[140px] pb-48 z-10">
            <h2 className="text-forest-300 font-pt-sans font-bold text-headline-2 uppercase mb-6">
              Contact Us
            </h2>

            <div className="flex flex-col lg:flex-row pl-44 justify-between items-center lg:items-center gap-12 w-full">
              <div className="flex flex-col gap-4 lg:gap-5 w-full lg:w-auto lg:pl-10">
                {/* Instagram */}
                <div className="flex items-center gap-5">
                  <img src={instagram} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    fleunique.boutique
                  </span>
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-5">
                  <img src={facebook} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    Fleunique Flowers
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-5">
                  <img src={phone} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    +380 67 123 45 67
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-5">
                  <img src={email} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    support@fleunique.com
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-5">
                  <img src={location} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    3 Sadova St, Odesa
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-[544px] ">
                <img
                  src={contactUs}
                  alt="Hands exchanging a bouquet of flowers"
                  className="w-full lg:w-[544px] h-[352px] object-cover rounded-[16px]"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
