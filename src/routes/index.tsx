import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

// import blackPasta from "../assets/food-menu/blackpasta.png.asset.json";
// import chickenSalad from "../assets/food-menu/chickensalad.png.asset.json";
// import duckNoodle from "../assets/food-menu/ducknoodle.png.asset.json";
// import pancakes from "../assets/food-menu/pancakes.png.asset.json";
// import spaghetti from "../assets/food-menu/spaghetti.png.asset.json";
// import steak from "../assets/food-menu/steak.png.asset.json";
// import strawberries from "../assets/food-menu/strawberries.png.asset.json";
// import thaiChicken from "../assets/food-menu/thaichicken.png.asset.json";
// import waffles from "../assets/food-menu/waffles.png.asset.json";

import steak from "../../public/img/steak.png"
import thaichicken from "../../public/img/thaichicken.png"
import pancakes from "../../public/img/pancakes.png"
import spaghetti from "../../public/img/spaghetti.png"
import waffles from "../../public/img/waffles.png"
import blackpasta from "../../public/img/blackpasta.png"
import strawberries from "../../public/img/strawberries.png"
import ducknoodle from "../../public/img/ducknoodle.png"
import chickensalad from "../../public/img/chickensalad.png"


const dishes = [
  { image: steak, price: "$10", title: "Grilled Beef Steak" },
  { image: ducknoodle, price: "$5", title: "Duck Noodles" },
  { image: chickensalad, price: "$10", title: "Grilled Chicken Salad" },
  { image: spaghetti, price: "$22", title: "Spaghetti Carbonara" },
  { image: blackpasta,  price: "$22", title: "Black Pasta Shrimp" },
  { image: strawberries, price: "$5", title: "Strawberries Arnaud" },
  { image: thaichicken, price: "$20", title: "Thai Chicekn" },
  { image: pancakes, price: "$10", title: "Pancakes" },
  { image: waffles, price: "$5", title: "Waffles with Berries" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Menu | By UM -XAIR" },
      { name: "description", content: "BiteZone food menu." },
      { property: "og:title", content: "Menu | By UM -XAIR" },
      { property: "og:description", content: "BiteZone food menu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [poster, setPoster] = useState(thaichicken);
  const [title, setTitle] = useState("Thai Chicken");
  const [price, setPrice] = useState("$38");

  const selectDish = (dish: (typeof dishes)[number]) => {
    setPoster(dish.image);
    setTitle(dish.title);
    setPrice(dish.price);
  };

  return (
    <header>
      <div className="logo">
        <h1>BiteZone.</h1>
        <img src={poster} alt="" id="poster" />
      </div>

      <nav>
        <i className="bi menu bi-list"></i>
        <div className="right_menu">
          <ul>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">Hotlink</a></li>
          </ul>
          <div className="user_cart">
            <i className="bi bi-cart-dash-fill"></i>
            <div className="user">
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
      </nav>

      <div className="left_menu">
        <a href="#">Process</a>
        <a href="#">Design</a>
        <a href="#">Material</a>
      </div>

      <section>
        <div className="content">
          <h1 id="title">{title}</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus praesentium distinctio a accusamus illum autem. Dicta maiores incidunt eum dolores!</p>
          <div className="price_order">
            <div className="price">
              <h2 id="price_cont">{price}</h2>
              <p>total payable</p>
            </div>
            <a href="#">Order Now</a>
          </div>
        </div>

        <div className="cards" ref={cardsRef}>
          {dishes.map((dish) => (
            <div className="card" key={dish.title} onClick={() => selectDish(dish)}>
              <img src={dish.image} alt="" className="dis" />
              <h4>{dish.price}</h4>
              <h5>{dish.title}</h5>
              <p>Per Plate</p>
              <div className="rate_cart">
                <h6>5.0</h6>
                <i className="bi bi-cart-dash-fill"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="social">
          <div className="btns">
            <i className="bi bi-arrow-left-circle-fill" onClick={() => { if (cardsRef.current) cardsRef.current.scrollLeft -= 140; }}></i>
            <i className="bi bi-arrow-right-circle-fill" onClick={() => { if (cardsRef.current) cardsRef.current.scrollLeft += 140; }}></i>
          </div>
          <div className="icons">
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-tiktok"></i></a>
          </div>
        </div>
      </section>
    </header>
  );
}