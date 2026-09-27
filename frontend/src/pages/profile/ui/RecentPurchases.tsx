import { PurchasesList } from "@/widgets/purchases-list";

export const RecentPurchases = () => {
  return (
    <div className="w-full lg:max-w-[736px]">
      <h2 className="mb-4 text-center font-pt-sans text-headline-3 md:text-headline-2 font-bold uppercase leading-none text-forest-300 md:mb-6 lg:text-left md:text-[36px]">
        Recent Purchases
      </h2>
      <PurchasesList />
    </div>
  );
};
