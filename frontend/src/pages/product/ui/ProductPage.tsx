import { Header } from "@/widgets/header";
import grpinky1 from "@/shared/assets/gr_pinky1_product.png";
import grblue1 from "@/shared/assets/gr_blue1_product.png";
import grblue2 from "@/shared/assets/gr_blue2_product.png";
import grpinky2 from "@/shared/assets/gr_pinky2_product.png";
import { Footer } from "@/widgets/footer";
import { Counter } from "@/shared/ui/counter";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import share from "@/shared/assets/share_icon_product.png";
import { useCart } from "@/context/CartContext";

interface ProductDetail {
  id: number;
  name: string;
  is_active: boolean;
  price: string;
  description: string;
  images: { image_url: string; is_main: boolean }[];
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState<number | string>(1);

  const { addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/v1/products/${id}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <Navigate to="/404" replace />;

  const handleBlur = () => {
    if (quantity === "" || Number(quantity) < 1) {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const qty = Number(quantity) || 1;
    const parsedPrice = parseFloat(product.price.replace("$", ""));

    addToCart({
      id: product.id,
      name: product.name,
      price: parsedPrice,
      image: `http://localhost:8000${product.images[0]?.image_url}`,
    });

    if (qty > 1) {
      updateQuantity(product.id, qty - 1);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      <div className="relative z-10 flex flex-col flex-grow w-full">
        {/* ФОНОВЫЕ КАРТИНКИ */}
        <img
          src={grpinky1}
          alt=""
          className="absolute top-0 left-[0%] w-[400px] pointer-events-none -z-20 object-contain"
        />
        <img
          src={grblue1}
          alt=""
          className="absolute top-[-10%] right-[0%] w-[500px] pointer-events-none -z-20 object-contain"
        />
        <img
          src={grpinky2}
          alt=""
          className="absolute bottom-[0%] right-[0%] w-[900px] pointer-events-none -z-20 object-contain"
        />
        <img
          src={grblue2}
          alt=""
          className="absolute bottom-[-19%] left-[0%] w-[600px] md:w-[900px] pointer-events-none -z-10 object-contain"
        />
        <Header />

        {/* ОСНОВНОЙ КОНТЕНТ (Изменено направление для планшета: flex-col, для десктопа: lg:flex-row) */}
        <main className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-[32px] px-4 md:px-0 min-[1440px]:px-[160px] pb-14 pt-26 lg:pt-40 w-full md:max-w-[680px] lg:max-w-[1440px] mx-auto md:mb-[64px] lg:mb-[128px]">
          <div className="shrink-0 w-[332px] lg:w-[544px] flex justify-center">
            <img
              src={`http://localhost:8000${product.images[0]?.image_url}`}
              alt="Bouquet"
              className="w-full w-[332px] h-[332px] lg:w-[544px] lg:h-[544px] object-cover rounded-2xl shadow-sm"
            />
          </div>

          {/* БЛОК ИНФОРМАЦИИ И КНОПОК */}
          <div className="shrink-0 w-full lg:w-[544px] flex flex-col justify-center gap-6 lg:gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-headline-3 md:text-headline-2 uppercase text-forest-300 font-pt-sans">
                  {product.name}
                </h2>
                <Badge
                  variant={product.is_active ? "in_stock" : "out_of_stock"}
                >
                  {product.is_active ? "In Stock" : "Out Of Stock"}
                </Badge>
              </div>

              <div className="text-headline-3 font-pt-sans font-bold text-rose-300">
                ${Number(product.price).toFixed(2)}
              </div>

              <p className="text-forest-300 font-montserrat text-headline-5 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-forest-300 font-montserrat text-headline-4">
                Quantity:
              </div>

              <Counter
                value={quantity}
                onChange={setQuantity}
                onBlur={handleBlur}
              />
            </div>

            {/* БЛОК ДЕЙСТВИЙ */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-16 justify-between mt-4 md:mt-0 lg:mt-auto">
              <div className="flex w-full gap-5 md:gap-8">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!product.is_active}
                  className={`flex-1 w-full ${!product.is_active ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Add To Cart
                </Button>

                <Button
                  variant="outline"
                  disabled={!product.is_active}
                  className={`flex-1 w-full ${!product.is_active ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[11px] text-silver-200 font-montserrat">
                  Delivery And Payment
                </p>
                <img
                  src={share}
                  alt="Share"
                  className="w-6 h-6 cursor-pointer hover:opacity-70"
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
