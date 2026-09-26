import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/shared/api/fetchClient";
import fallbackPhoto from "@/shared/assets/photo_flowers_product.png";
import bouquetBase from "@/shared/assets/profile-purchases/bouquet-base.png";
import athenaBouquet from "@/shared/assets/profile-purchases/athena.png";
import zeusBouquet from "@/shared/assets/profile-purchases/zeus.png";
import artemisBouquet from "@/shared/assets/profile-purchases/artemis.png";
import hestiaBouquet from "@/shared/assets/profile-purchases/hestia.png";

export type CardStatus = "Confirmed" | "In Progress" | "Canceled" | "Delivered";

interface BackendProductImage {
  id: number;
  image_url: string;
  is_main: boolean;
}

interface BackendProduct {
  name: string;
  description: string;
  images?: BackendProductImage[];
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

export interface PurchaseCardData {
  id: number;
  status: CardStatus;
  date: string;
  orderId: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  imageLayers?: [string, string];
}

// Поставьте true, чтобы протестировать адаптив пустой страницы без карточек
const SHOW_EMPTY_STATE = false;

const statusMap: Record<BackendOrder["status"], CardStatus> = {
  pending: "Confirmed",
  processing: "In Progress",
  completed: "Delivered",
  cancelled: "Canceled",
};

const bouquetLayersByName: Record<string, [string, string]> = {
  "Athena, Aphrodite": [bouquetBase, athenaBouquet],
  Zeus: [bouquetBase, zeusBouquet],
  Artemis: [bouquetBase, artemisBouquet],
  "Hestia, Hermes": [bouquetBase, hestiaBouquet],
};

// Подключенные карточки напрямую из макета Figma
export const DEFAULT_PURCHASES: PurchaseCardData[] = [
  {
    id: 67,
    status: "Confirmed",
    date: "08-09-2026",
    orderId: "#FLEUN-080926-67",
    title: "Athena, Aphrodite",
    description:
      "Hydrangea, Calla Lily, Chrysanthemum, Rose, Lisianthus, Snapdragon, Dahlia\nRanunculus, Hydrangea, Phalaenopsis Orchid, Lily, Rose, Lisianthus, Stock, Alstroemeria, Chamomile, Eucalyptus",
    price: 64,
    imageUrl: fallbackPhoto,
    imageLayers: [bouquetBase, athenaBouquet],
  },
  {
    id: 1,
    status: "In Progress",
    date: "07-09-2026",
    orderId: "#FLEUN-070926-01",
    title: "Zeus",
    description:
      "Lily, Phalaenopsis Orchid, Hydrangea, Lisianthus, Anthurium, Calla Lily, Lavender, Carnation, Eucalyptus",
    price: 36,
    imageUrl: fallbackPhoto,
    imageLayers: [bouquetBase, zeusBouquet],
  },
  {
    id: 23,
    status: "Canceled",
    date: "05-09-2026",
    orderId: "#FLEUN-050926-23",
    title: "Artemis",
    description:
      "Dahlia, Chrysanthemum, Globe Amaranth, Spray Rose, Chocolate Cosmos, Tweedia, Chamomile, Lily",
    price: 24,
    imageUrl: fallbackPhoto,
    imageLayers: [bouquetBase, artemisBouquet],
  },
  {
    id: 68,
    status: "Delivered",
    date: "01-09-2026",
    orderId: "#FLEUN-010926-67",
    title: "Hestia, Hermes",
    description:
      "Peony, Carnation, Ranunculus, Lisianthus, Spray Rose, Snapdragon\nRanunculus, Hydrangea, Tulip, Rose, Gerbera Daisy, Delphinium, Snapdragon, Lisianthus, Chamomile, Carnation",
    price: 56,
    imageUrl: fallbackPhoto,
    imageLayers: [bouquetBase, hestiaBouquet],
  },
];

const statusStyles: Record<CardStatus, string> = {
  Confirmed: "border-info text-info",
  "In Progress": "border-warning-100 text-warning-100",
  Canceled:
    "border-silver-200 text-silver-200 md:border-silver-100 md:text-silver-100 lg:border-silver-200 lg:text-silver-200",
  Delivered: "border-success text-success",
};

const dividerStyles: Record<CardStatus, string> = {
  Confirmed: "bg-silver-200 md:bg-silver-100 lg:bg-silver-200",
  "In Progress": "bg-silver-200",
  Canceled: "bg-silver-200 md:bg-silver-100 lg:bg-silver-200",
  Delivered: "bg-silver-200 md:bg-silver-100 lg:bg-silver-200",
};

const dateStyles: Record<CardStatus, string> = {
  Confirmed: "text-silver-200 md:text-silver-100 lg:text-silver-200",
  "In Progress": "text-silver-200",
  Canceled: "text-silver-200 md:text-silver-100 lg:text-silver-200",
  Delivered: "text-silver-200 md:text-silver-100 lg:text-silver-200",
};

const orderIdStyles: Record<CardStatus, string> = {
  Confirmed: "text-black-50 md:text-silver-200 lg:text-black-50",
  "In Progress": "text-black-50",
  Canceled: "text-black-50 md:text-silver-200 lg:text-black-50",
  Delivered: "text-black-50 md:text-silver-200 lg:text-black-50",
};

const primaryActionLabels: Record<CardStatus, string> = {
  Confirmed: "track order",
  "In Progress": "track order",
  Canceled: "Refund details",
  Delivered: "Leave a review",
};

const secondaryActionLabels: Record<CardStatus, string[]> = {
  Confirmed: ["Buy this again", "Cancel"],
  "In Progress": ["Buy this again", "Change details"],
  Canceled: ["Buy this again"],
  Delivered: ["Buy this again"],
};

export const PurchaseCard = ({ order }: { order: PurchaseCardData }) => (
  <article className="flex w-full min-w-0 flex-col items-start justify-start gap-2.5 rounded-2xl bg-rose-50 px-4 py-3 md:min-h-36 lg:w-[722px] lg:min-h-48 lg:px-6 lg:py-4">
    <div className="flex w-full min-w-0 flex-col items-start justify-start gap-2">
      <div className="inline-flex w-full min-w-0 items-center justify-start gap-1 overflow-hidden whitespace-nowrap md:w-auto md:justify-center md:gap-2.5">
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl border px-6 py-0.5 text-center font-montserrat text-xs font-normal ${statusStyles[order.status]}`}
        >
          {order.status}
        </span>
        <span
          aria-hidden="true"
          className={`h-4 w-px shrink-0 ${dividerStyles[order.status]}`}
        />
        <span
          className={`shrink-0 font-montserrat text-xs font-normal ${dateStyles[order.status]}`}
        >
          {order.date}
        </span>
        <span
          className={`min-w-0 truncate font-montserrat text-xs font-normal ${orderIdStyles[order.status]}`}
        >
          {order.orderId}
        </span>
      </div>

      <div className="inline-flex w-full min-w-0 items-center justify-start gap-3 md:gap-12">
        <div className="flex min-w-0 flex-1 items-center justify-start gap-3.5 lg:w-[465px] lg:flex-none">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-rose-50 lg:size-32">
            {order.imageLayers ? (
              order.imageLayers.map((imageLayer) => (
                <img
                  key={imageLayer}
                  src={imageLayer}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 size-full rounded-lg object-cover"
                />
              ))
            ) : (
              <img
                src={order.imageUrl}
                alt={order.title}
                className="size-full rounded-lg object-cover"
              />
            )}
          </div>

          <div className="inline-flex min-w-0 flex-1 flex-col items-start justify-start gap-2 lg:w-80 lg:flex-none">
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <h3 className="w-full break-words font-pt-sans text-base font-bold text-forest-300 md:truncate md:text-lg lg:w-80">
                {order.title}
              </h3>
              <p className="hidden w-full font-montserrat text-xs font-normal text-forest-300 md:line-clamp-1 md:block lg:max-h-10 lg:w-80 lg:line-clamp-3">
                {order.description}
              </p>
            </div>
            <span className="self-stretch font-pt-sans text-base font-bold text-rose-300 md:text-lg">
              ${Number(order.price).toFixed(0)}
            </span>
          </div>
        </div>

        <div className="inline-flex w-32 shrink-0 flex-col items-start justify-center gap-2 md:w-40">
          <button
            type="button"
            className={`inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-rose-300 px-4 py-2 text-center font-montserrat text-xs font-medium capitalize text-rose-50 shadow-[0px_1px_1px_0px_rgba(61,59,59,0.20)] whitespace-nowrap md:px-8 ${
              order.status === "Canceled" || order.status === "Delivered"
                ? "lg:hidden"
                : ""
            }`}
          >
            {order.status === "Canceled" || order.status === "Delivered"
              ? "track order"
              : primaryActionLabels[order.status]}
          </button>

          {(order.status === "Canceled" || order.status === "Delivered") && (
            <button
              type="button"
              className="hidden w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-rose-300 px-8 py-2 text-center font-montserrat text-xs font-medium capitalize text-rose-50 shadow-[0px_1px_1px_0px_rgba(61,59,59,0.20)] whitespace-nowrap lg:inline-flex"
            >
              {primaryActionLabels[order.status]}
            </button>
          )}

          {secondaryActionLabels[order.status].map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-silver-200 bg-transparent px-4 py-2 text-center font-montserrat text-xs font-medium capitalize text-silver-200 shadow-[0px_1px_1px_0px_rgba(61,59,59,0.20)] whitespace-nowrap md:px-8"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </article>
);

interface PurchasesListProps {
  items?: PurchaseCardData[];
  forceEmpty?: boolean;
}

export const PurchasesList = ({
  items,
  forceEmpty = SHOW_EMPTY_STATE,
}: PurchasesListProps) => {
  const [orders, setOrders] = useState<PurchaseCardData[]>(
    items ?? DEFAULT_PURCHASES
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (items) {
      setOrders(items);
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithAuth("/api/v1/orders/?skip=0&limit=100");

        if (!res.ok) {
          return;
        }

        const data: BackendOrder[] = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          return;
        }

        const transformedOrders: PurchaseCardData[] = data.map((order) => {
          const d = new Date(order.created_at);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;

          const firstItem = order.items?.[0];
          const product = firstItem?.product;

          const title = product?.name || "Custom Bouquet";
          const description =
            product?.description || "A beautiful selection of fresh flowers.";

          const mainImage =
            product?.images?.find((img) => img.is_main)?.image_url ||
            product?.images?.[0]?.image_url;

          const imageUrl = mainImage
            ? /^https?:\/\//i.test(mainImage)
              ? mainImage
              : `http://localhost:8000${mainImage.startsWith("/") ? "" : "/"}${mainImage}`
            : fallbackPhoto;

          const shortDate = `${day}${month}${String(year).slice(-2)}`;
          const displayOrderId = `#FLEUN-${shortDate}-${order.id}`;

          return {
            id: order.id,
            status: statusMap[order.status],
            date: formattedDate,
            orderId: displayOrderId,
            title: title,
            description: description,
            price:
              Number(firstItem?.price_per_item ?? order.total_price) *
              (firstItem?.quantity ?? 1),
            imageUrl: imageUrl,
            imageLayers: mainImage ? undefined : bouquetLayersByName[title],
          };
        });

        setOrders(transformedOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [items]);

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex min-h-[300px] w-full items-center justify-center font-montserrat text-xs text-forest-300 md:min-h-[400px]">
        Loading recent purchases...
      </div>
    );
  }

  if (forceEmpty || orders.length === 0) {
    return (
      <div className="flex min-h-[360px] w-full flex-1 flex-col items-center justify-center rounded-2xl bg-rose-50/70 px-6 py-12 text-center md:min-h-[520px] lg:w-[722px] lg:min-h-[680px]">
        <p className="font-pt-sans text-base font-bold uppercase text-forest-300 md:text-lg">
          No Recent Purchases Yet
        </p>
        <p className="mt-2 max-w-xs font-montserrat text-xs font-normal text-silver-200">
          You haven&apos;t made any purchases yet. Once you place an order, your bouquets will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-start justify-start gap-4 lg:w-[722px]">
      {orders.map((order) => (
        <PurchaseCard key={order.id} order={order} />
      ))}
    </div>
  );
};