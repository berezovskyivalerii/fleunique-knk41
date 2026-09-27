import { PurchasesList } from "@/widgets/purchases-list"; // укажите ваш актуальный путь до PurchasesList

export const RecentPurchases = () => {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-start gap-4 md:gap-6 lg:gap-8 lg:items-start">
      <h1 className="font-pt-sans text-headline-3 md:text-headline-2 font-bold uppercase text-forest-300 lg:text-left">
        recent Purchases
      </h1>
      <PurchasesList />
    </section>
  );
};