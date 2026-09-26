import { PurchasesList } from "@/widgets/purchases-list"; // укажите ваш актуальный путь до PurchasesList

export const RecentPurchases = () => {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-start gap-4 md:gap-6 lg:items-start">
      <h1 className="font-pt-sans text-xl font-bold uppercase text-forest-300 md:text-4xl lg:self-stretch lg:text-left">
        recent Purchases
      </h1>
      <PurchasesList />
    </section>
  );
};