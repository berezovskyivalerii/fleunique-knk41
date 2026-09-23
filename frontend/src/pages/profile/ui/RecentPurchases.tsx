import { PurchasesList } from "@/widgets/purchases-list";

export const RecentPurchases = () => {
  return (
    <div className="w-[736px]">
      <h2 className="font-pt-sans font-bold text-headline-2 uppercase text-forest-300 mb-6">
        Recent Purchases
      </h2>
      <PurchasesList />
    </div>
  );
};
