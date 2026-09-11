import { Header } from "../../../widgets/header.tsx";
import { Footer } from "../../../widgets/footer.tsx";

import photo from "../../../../assets/photo_flowers_product.png";
import share from "../../../../assets/share_icon_product.png"

export function ProductPage() {
  return (
    <div>
      <Header />
      <main className="flex justify-between px-[160px] mt-16 mb-[192px]">
        <div className="left_part_in_product_page">
          <div>
            <img src={photo} className="w-[644px] rounded-2xl" />
          </div>
        </div>
        <div className="ml-8">
          <div className="flex justify-between items-center text-4xl">
            <h1 className="font-bold">Name Of Bouquet</h1>
            <div className="flex justify-center items-center text-[11px] border-2 border-[#079941] rounded-[10px] w-[97px] h-[21px]">In Stock</div>
          </div>
          <div className="text-xl font-bold text-[#B3158E] my-[5px]">$20</div>
          <div className="disctiption_right_part_in_product_page">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <div className="mt-5 mb-[5px] text-[#057B83]">Quantity</div>
          <div className="w-[125px] flex justify-between">
            <button className="font-bold">-</button>
            <p>1</p>
            <button className="font-bold">+</button>
          </div>
          <div className="mt-[15px] flex justify-between">
            <button className="w-[256px] h-[45px] rounded-[26px] font-bold bg-[#B3158E] text-[#FFFAFE]">Add To Cart</button>
            <button className="w-[256px] h-[45px] rounded-[26px] font-bold bg-transparent border-2 border-[#057B83] text-[#057B83]">Buy Now</button>
          </div>
          <div className="mt-[70px] flex justify-between">
            <p className="text-[11px] text-[#828282]">Delivery And Payment</p>
            <img src={share}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}