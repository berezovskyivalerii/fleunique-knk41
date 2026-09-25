import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { Counter } from "@/shared/ui/counter";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import share from "@/shared/assets/share_icon_product.png";
import { useCart } from "@/context/CartContext";

const backgroundBlobs = [
  {
    width: 651.4,
    height: 465.5,
    angle: 29.62,
    opacity: 0.5,
    top: -66.6,
    left: 1400.3,
    background:
      "radial-gradient(50% 50% at 50% 50%, #04C6D1 0%, rgba(4, 198, 209, 0) 100%)",
  },
  {
    width: 330.5,
    height: 287.2,
    angle: 131.18,
    opacity: 0.5,
    top: 168.9,
    left: -22.0,
    background: "radial-gradient(50% 50% at 50% 50%, #FBB2EA 0%, #F04BC9 100%)",
  },
  {
    width: 531.2,
    height: 461.6,
    angle: 131.18,
    opacity: 0.5,
    top: 725.0,
    left: -80,
    background: "radial-gradient(50% 50% at 50% 50%, #04C6D1 0%, #FCFCFC 100%)",
  },
  {
    width: 651.4,
    height: 465.5,
    angle: -97.41,
    opacity: 0.5,
    top: 747.1,
    left: 1215.3,
    background: "radial-gradient(50% 50% at 50% 50%, #FBB2EA 0%, #F04BC9 100%)",
  },
];

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
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden pt-24">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {backgroundBlobs.map((blob, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${blob.width}px`,
              height: `${blob.height}px`,
              transform: `rotate(${blob.angle}deg)`,
              opacity: blob.opacity,
              top: `${blob.top}px`,
              left: `${blob.left}px`,
              background: blob.background,
            }}
          />
        ))}

        <div
          className="absolute inset-0"
          style={{ backdropFilter: "blur(200px)" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow w-full">
        <Header />

        <main className="flex-grow flex justify-center gap-[32px] px-10 xl:px-[160px] py-16 w-full max-w-[1440px] mx-auto mb-[128px]">
          <div className="shrink-0">
            <img
              src={`http://localhost:8000${product.images[0]?.image_url}`}
              alt="Bouquet"
              className="w-[500px] xl:w-[544px] xl:h-[544px] object-cover rounded-2xl shadow-sm"
            />
          </div>

          <div className="w-[544px] flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-4xl uppercase text-[#033438] font-pt-sans">
                  {product.name}
                </h2>
                <Badge
                  variant={product.is_active ? "in_stock" : "out_of_stock"}
                >
                  {product.is_active ? "In Stock" : "Out Of Stock"}
                </Badge>
              </div>

              {/* Форматируем цену с $ */}
              <div className="text-2xl font-pt-sans font-bold text-[#B3158E]">
                ${Number(product.price).toFixed(2)}
              </div>

              <p className="text-[#033438] font-montserrat text-[16px] leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[#033438] font-montserrat text-lg">
                Quantity:
              </div>

              <Counter
                value={quantity}
                onChange={setQuantity}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col gap-16 justify-between">
              <div className="flex gap-7">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!product.is_active}
                  className={
                    !product.is_active ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  Add To Cart
                </Button>

                <Button
                  variant="outline"
                  disabled={!product.is_active}
                  className={
                    !product.is_active ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-[11px] text-[#828282] font-montserrat">
                  Delivery And Payment
                </p>
                <img
                  src={share}
                  alt="Share"
                  className="w-5 h-5 cursor-pointer hover:opacity-70"
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
