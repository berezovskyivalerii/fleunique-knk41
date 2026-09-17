import { OrderCard } from "@/entities/order/ui/OrderCard";
import photo from "@/shared/assets/photo_flowers_product.png";

const mockOrders = [
  {
    id: 1,
    status: "Confirmed",
    date: "08-09-2026",
    orderId: "#FLEUN-080926-67",
    title: "Name of bouquet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 20,
    imageUrl: photo,
  },
  {
    id: 2,
    status: "In Progress",
    date: "07-09-2026",
    orderId: "#FLEUN-070926-01",
    title: "Name of bouquet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 20,
    imageUrl: photo,
  },
  {
    id: 3,
    status: "Canceled",
    date: "05-09-2026",
    orderId: "#FLEUN-050926-23",
    title: "Name of bouquet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 20,
    imageUrl: photo,
  },
  {
    id: 4,
    status: "Delivered",
    date: "01-09-2026",
    orderId: "#FLEUN-010926-67",
    title: "Name of bouquet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 20,
    imageUrl: photo,
  },
];

export const PurchasesList = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      {mockOrders.map((order) => (
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
