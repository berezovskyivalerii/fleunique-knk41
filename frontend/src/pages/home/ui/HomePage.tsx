import { useState, useEffect } from "react";
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

interface ProductImage {
  id: number;
  image_url: string;
  is_main: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: ProductImage;
}

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

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/v1/products?limit=10");

        if (!res.ok) {
          throw new Error("Failed to load best picks");
        }

        const data = await res.json();

        const transformedProducts = data.map((product: any) => {
          const mainImage =
            product.images?.find((img: any) => img.is_main)?.image_url ||
            product.images?.[0]?.image_url;

          const imageUrl = `http://localhost:8000${mainImage}`;

          return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: `$${product.price}`,
            image: imageUrl,
          };
        });

        setProducts(transformedProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Add to cart logic
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        {/*HERO IMAGE SECTION */}
        <section className="relative w-full h-[562px] md:h-[520px] lg:h-[1024px] overflow-hidden flex flex-col justify-between">
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20"
          />

          <div className="relative w-full h-full mx-auto max-w-[390px] px-4 py-[0_24px] md:max-w-[744px] md:px-8 md:py-[0_32px] lg:max-w-[1440px] lg:px-[160px] lg:py-[0_176px] flex flex-col justify-between">
            <div className="pt-[96px] md:pt-[136px] lg:pt-[192px] z-20">
              <h1 className="w-[358px] mx-auto text-center font-pt-sans font-bold text-headline-2 uppercase text-forest-400 leading-tight md:w-[506px] md:ml-auto md:mr-0 md:text-right lg:w-[865px] lg:text-headline-1">
                Flowers that are as unique as you
              </h1>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[358px] h-[432px] opacity-30 pointer-events-none z-0 flex items-end justify-center md:left-8 md:translate-x-0 md:w-auto md:h-[354px] md:opacity-100 md:pointer-events-auto md:z-10 md:justify-start lg:left-[160px] lg:h-[754px]">
              <img
                src={woman}
                alt="Florist with a bouquet"
                className="h-[432px] w-auto object-contain object-bottom md:h-[354px] lg:h-[754px]"
              />
            </div>

            <div className="relative z-20 w-[358px] mx-auto flex flex-col items-center md:w-[332px] md:ml-auto md:mr-0 md:items-start lg:w-[352px]">
              <p className="w-[358px] text-headline-5 text-forest-300 font-montserrat font-normal leading-tight text-justify mb-2 md:w-[332px] md:text-headline-5 md:mb-2 lg:w-[352px] lg:text-label lg:mb-8">
                Step into our vivid world where bold artistry meets playful
                imagination. Dare to gift something truly unique and discover
                extraordinary bouquets designed to brighten any gloomy day and
                turn simple moments into an unforgettable joy.
              </p>

              {/* Mobile button (Medium: w=358 fill, h=45, p=16 0, r=50%) */}
              <div className="w-full block md:hidden">
                <Button size="medium" className="text-medium-button">
                  EXPLORE
                </Button>
              </div>

              {/* md button (Large: w=245, h=86, p=32, r=16px) */}
              <div className="hidden md:block lg:hidden ml-auto">
                <Button size="large" className="w-[245px] py-8 px-[44px]">
                  EXPLORE
                </Button>
              </div>

              {/* lg button (Large: w=352, h=86, p=32 120, r=16px) */}
              <div className="hidden lg:block">
                <Button size="large" className="w-[352px] py-8 px-[97.5px]">
                  EXPLORE
                </Button>
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
          <section className="w-[390px] py-[32px] mx-auto px-[16px] md:w-[744px] md:px-[32px] md:py-[48px] lg:px-[160px] lg:w-[1440px] lg:py-[96px]">
            <h2 className="text-center font-pt-sans font-bold text-headline-2 text-forest-300 uppercase mb-[24px] lg:mb-[32px]">
              Best Picks
            </h2>

            {isLoading ? (
              <div className="text-center text-forest-300">Loading...</div>
            ) : (
              <div className="grid place-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[16px] lg:gap-[32px] [&>*:nth-last-child(2)]:md:col-start-2 [&>*:nth-last-child(2)]:lg:col-start-auto">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    type={product.description}
                    price={product.price}
                    image={product.image}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* ABOUT US SECTION */}
          <section className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-[160px] flex justify-center pb-[32px] md:pb-[48px] lg:pb-[96px]">
            <div className="relative block w-[366px] md:w-[506px] lg:w-[728px] h-[444px] lg:h-[482px] md:h-[360px]">
              <div className="lg:absolute lg:top-0 lg:left-0 w-[171px] md:w-[245px] lg:w-[336px] z-20 mb-8 lg:mb-0">
                <h2 className="font-pt-sans font-bold text-headline-3 text-forest-300 uppercase mb-[16px] md:mb-[12px] lg:text-headline-2 lg:mb-[16px]">
                  About Us
                </h2>
                <p className="font-montserrat font-normal text-small lg:text-base text-forest-300 leading-tight text-justify">
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
                className="w-[358px] h-[92px] md:w-[332px] md:h-[92px] lg:w-[490px] lg:h-[133px] object-cover rounded-[16px] absolute top-[350px] md:top-[244px] lg:top-[310px] left-0 z-0 mb-0"
              />

              <img
                src={womanCafe}
                alt="Florist at work"
                className="w-[179px] h-[179px] md:w-[224px] md:h-[224px] lg:w-[327px] lg:h-[327px] object-cover rounded-[16px] absolute top-[49px] left-[179px] md:top-[45px] md:left-[253px] lg:top-6 lg:left-[370px] z-10 mb-0 self-center"
              />

              <div className="w-[188px] h-[189px] md:w-[200px] md:h-[173px] lg:w-[286px] lg:h-[246px] bg-rose-300 rounded-2xl py-[16px] px-[8px] lg:py-[24px] lg:px-[16px] flex flex-col absolute top-[192px] left-[179px] md:top-[188px] md:left-[306px] lg:top-[230px] lg:left-[440px] z-30 self-center">
                <h3 className="font-pt-sans font-bold text-rose-50 text-headline-4 lg:text-headline-3">
                  Contact Us
                </h3>

                <p className="font-montserrat text-rose-50 text-small lg:text-base leading-tight mb-auto">
                  Ready to create something unique? Contact us today, and let
                  our florists craft a bold, playful floral artwork just for
                  you.
                </p>

                <Button
                  size="medium"
                  className="w-full py-[8px] lg:py-[16px] !bg-rose-50 !text-forest-300 text-small-button lg:text-medium-button font-semibold! transition-colors hover:bg-forest-300 hover:text-rose-50 h-[24px] lg:h-[45px]"
                >
                  Our Contacts
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* OUR UNIQUE CLIENTS SECTION */}
        <section className="w-full py-[32px] md:py-[48px] lg:py-[96px] bg-forest-300 flex flex-col justify-center relative overflow-hidden">
          <h2 className="w-full text-center md:text-left md:ml-[32px] lg:ml-40 font-pt-sans font-bold text-headline-3 lg:text-headline-2 mb-[24px] md:mb-0 lg:mb-[60px] text-rose-50 uppercase z-10">
            Our Unique Clients
          </h2>

          <div className="w-full mx-auto px-0 md:max-w-none flex items-stretch md:items-center justify-center md:justify-start gap-auto md:gap-[16px] lg:gap-[32px] overflow-x-auto pb-0">
            {/* COL 1 */}
            <div className="flex flex-col gap-[12px] flex-1 md:contents mr-[16px] md:mr-0">
              {/* CARD 1*/}
              <img
                src={client1}
                alt="Client 1"
                className="w-full md:w-[115px] h-auto aspect-[266/390] object-cover rounded-[0_16px_16px_0] md:flex-1 md:grow md:order-1"
              />

              {/* CARD 4*/}
              <img
                src={client4}
                alt="Client 4"
                className="w-[calc(100%-4px)] ml-[4px] md:ml-0 md:w-[112px] h-auto aspect-square object-cover rounded-[16px] md:flex-1 md:grow md:order-4"
              />
            </div>

            {/* COL 2*/}
            <div className="flex flex-col gap-[12px] flex-1 md:contents mt-[29px] md:mt-0 mr-[12px] md:mr-0">
              {/* CARD 2 */}
              <img
                src={client2}
                alt="Client 2"
                className="w-[calc(100%-4px)] md:w-[112px] h-auto aspect-square object-cover rounded-[16px] md:flex-1 md:grow md:order-2"
              />

              {/* CARD 5 */}
              <img
                src={client5}
                alt="Client 5"
                className="w-[calc(100%+4px)] md:w-[115px] h-auto aspect-[115/170] md:aspect-[266/390] object-cover rounded-[16px] md:rounded-[16px_0_0_16px] md:flex-1 md:grow md:order-5"
              />
            </div>

            {/*COL 3 CARD 3*/}
            <div className="flex flex-col flex-1 md:contents">
              <img
                src={client3}
                alt="Client 3"
                className="h-auto md:w-[130px] aspect-[130/330] md:aspect-[1/2] object-cover rounded-[16px_0_0_16px] md:rounded-[16px] md:flex-1 md:grow md:order-3"
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
          <section className="relative w-full max-w-[1440px] mx-auto my-[32px] md:my-[48px] lg:my-[96px] flex items-center justify-center h-[421px] md:h-[394px] lg:h-[900px]">
            <div className="flex flex-col items-center justify-center text-center text-rose-100 font-rubik-bubbles! w-[375px] md:w-[702px] lg:w-[1123px] text-[160px] md:text-[300px] lg:text-[480px] leading-[184px] lg:leading-[450px] select-none z-0">
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[358px] md:w-[680px] lg:w-[992px] h-auto rounded-[32px] p-[32px] flex flex-col md:flex-row items-center justify-center md:justify-between gap-[16px] lg:gap-[128px] z-10"
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
          <section className="relative w-full mx-auto lg:mr-auto lg:ml-0 h-auto flex flex-col lg:flex-row items-start mb-[32px] md:mb-[48px] lg:mb-[96px] gap-[24px] lg:gap-[32px]">
            <div className="w-full lg:w-1/2 h-[282px] md:h-[378px] lg:h-full lg:max-h-[1024px]">
              <img
                src={faqwoman}
                alt="Florist preparing flowers"
                className="w-full h-full lg:max-h-[1024px] object-cover lg:rounded-[0_16px_16px_0]"
              />
            </div>

            <div className=" lg:w-[544px] lg:mr-[160px] flex flex-col justify-center lg:mt-[64px] mx-[16px] md:mx-[32px]">
              <h2 className="text-forest-300 font-pt-sans font-bold text-headline-3 lg:text-headline-2 uppercase mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-montserrat text-small lg:text-base text-justify leading-tight text-forest-300 mb-[24px] lg:mb-[32px]">
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
                        <div className="mt-0 pr-8 w-full font-montserrat text-small lg:text-base leading-relaxed text-forest-200">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-[24px] flex flex-col w-full lg:mt-[32px]">
                <span className="font-montserrat! text-small lg:text- text-forest-200 mb-[8px] lg:mb-[16px] tracking-wide text-center lg:text-left">
                  Do you still have questions? Ask our agents directly!
                </span>
                <button className="w-full lg:min-w-[544px] h-[45px] bg-rose-300 hover:bg-forest-300/80 transition-colors text-rose-50 rounded-full font-montserrat! font-semibold! text-headline-4 tracking-wide">
                  Contact Our Support
                </button>
              </div>
            </div>
          </section>

          {/* CONTACT US SECTION */}
          <section className="relative w-full max-w-[1440px] mx-auto md:px-[32px] lg:px-[160px] mb-[56px] md:mb-[96px] lg:mb-[192px] z-10">
            <h2 className="text-forest-300 font-pt-sans font-bold text-headline-3 uppercase mb-6 lg:mb-[32px] lg:text-headline-2 text-center md:text-left">
              Contact Us
            </h2>

            <div className="flex flex-col md:flex-row md:pl-[87px] lg:pl-[192px] justify-center md:justify-between items-center md:items-top gap-[24px] md:gap-[16px] w-full">
              <div className="flex flex-col gap-[8px] lg:gap-[24px] w-auto md:w-full lg:w-auto">
                {/* Instagram */}
                <div className="flex items-center gap-[16px]">
                  <img src={instagram} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    fleunique.boutique
                  </span>
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-[16px]">
                  <img src={facebook} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    Fleunique Flowers
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-[16px]">
                  <img src={phone} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    +380 67 123 45 67
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-[16px]">
                  <img src={email} />
                  <span className="font-montserrat text-forest-300 text-headline-4">
                    support@fleunique.com
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-[16px]">
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
                  className="w-full lg:w-[544px] h-[211px] md:h-[352px] object-cover md:rounded-[16px]"
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
