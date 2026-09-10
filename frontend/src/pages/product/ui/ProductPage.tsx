import { Header } from "../../../widgets/header.tsx";
import { Footer } from "../../../widgets/footer.tsx";

import photo from "../../../../assets/photo_flowers_product.png";
import share from "../../../../assets/share_icon_product.png"
import "../../../app/styles/productPage.css";

export function ProductPage() {
  return (
    <div>
      <Header />
      <main id="main_product">
        <div id="left_part_in_product_page"><div><img src={photo} id="img_in_left_part_product_page" /></div></div>
        <div id="right_part_in_product_page">
          <div id="h_right_part_in_product_page">
            <h1>Name Of Bouquet</h1>
            <div id="in_stock_right_part_in_product_page">In Stock</div>
          </div>
          <div id="price_right_part_in_product_page">$20</div>
          <div id="disctiption_right_part_in_product_page">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          <div id="quantity_right_part_in_product_page">Quantity</div>
          <div id="quantity_product">
            <button id="minus_quantity_product">-</button>
            <p id="count_quantity_product">1</p>
            <button id="plus_quantity_product">+</button>
          </div>
          <div id="btns_product">
            <button id="btn_add_to_cart">Add To Cart</button>
            <button id="btn_buy_now">Buy Now</button>
          </div>
          <div id="buttom_product">
            <p>Delivery And Payment</p>
            <img src={share}/>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}