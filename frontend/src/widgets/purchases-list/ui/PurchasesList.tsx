import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/shared/api/fetchClient";
import { OrderCard } from "@/entities/order/ui/OrderCard";
import fallbackPhoto from "@/shared/assets/photo_flowers_product.png";

interface BackendProduct {
  name: string;
  description: string;
  image_url?: string;
}

interface BackendOrderItem {
  quantity: number;
  price_per_item: number;
  product?: BackendProduct;
}

interface BackendOrder {
  id: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
  total_price: number;
  items: BackendOrderItem[];
}

export const PurchasesList = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchWithAuth("/api/v1/orders/?skip=0&limit=100");

        if (!res.ok) {
          throw new Error("Failed to load orders");
        }

        const data: BackendOrder[] = await res.json();

        const transformedOrders = data.map((order) => {
          const statusMap: Record<string, string> = {
            pending: "Confirmed",
            processing: "In Progress",
            completed: "Delivered",
            cancelled: "Canceled",
          };

          const d = new Date(order.created_at);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;

          const firstItem = order.items?.[0];
          const title = firstItem?.product?.name || "Custom Bouquet";
          const description =
            firstItem?.product?.description ||
            "A beautiful selection of fresh flowers.";
          const imageUrl = firstItem?.product?.image_url || fallbackPhoto;

          const shortDate = `${day}${month}${String(year).slice(-2)}`;
          const displayOrderId = `#FLEUN-${shortDate}-${order.id}`;

          return {
            id: order.id,
            status: statusMap[order.status] || "Confirmed",
            date: formattedDate,
            orderId: displayOrderId,
            title: title,
            description: description,
            price: Number(order.total_price),
            imageUrl: imageUrl,
          };
        });

        setOrders(transformedOrders);
      } catch (err) {
        console.error(err);
        setError("Could not load your recent purchases.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64 text-forest-300">
        Loading recent purchases...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-64 text-rose-300">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-64 text-silver-200">
        You haven't made any purchases yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          status={
            order.status as
              | "Confirmed"
              | "In Progress"
              | "Canceled"
              | "Delivered"
          }
          date={order.date}
          orderId={order.orderId}
          title={order.title}
          description={order.description}
          price={order.price}
          imageUrl={order.imageUrl}
        />
      ))}
    </div>
  );
};
