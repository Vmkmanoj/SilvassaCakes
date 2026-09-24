import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import type { Product } from "../types/product";

// Default fallback image if product image is not provided or fails to load
const DEFAULT_IMAGE = "/img/main.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Menu | BiteZone & Silvassa Cakes" },
      { name: "description", content: "Explore our delicious freshly baked cakes and gourmet dishes." },
      { property: "og:title", content: "Menu | BiteZone & Silvassa Cakes" },
      { property: "og:description", content: "Explore our delicious freshly baked cakes and gourmet dishes." },
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetchProducts({ is_active: true }),
  });

  // When products are loaded, set the first product as selected if none is selected
  useEffect(() => {
    if (products.length > 0 && (!selectedProduct || !products.some((p) => p.id === selectedProduct.id))) {
      setSelectedProduct(products[0] ?? null);
    }
  }, [products, selectedProduct]);

  const activeProduct = selectedProduct || products[0] || null;
  const currentPoster = activeProduct?.img_url || DEFAULT_IMAGE;
  const currentTitle = activeProduct?.name || "Delicious Specialty";
  const currentType = activeProduct?.type || "Fresh & Handcrafted";
  const currentDesc =
    activeProduct?.description?.trim() ||
    "Experience the rich flavours and handcrafted delight made with the finest ingredients.";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  return (
    <header>
      <div className="logo">
        <h1>BiteZone.</h1>
        <img
          src={currentPoster}
          alt={currentTitle}
          id="poster"
          onError={handleImageError}
        />
      </div>

      <section style={{ marginTop: "45px" }}>
        <div className="content">
          <h1 id="title">{currentTitle}</h1>
          <p>{currentDesc}</p>
          <div className="price_order">
            <div className="price">
              <h2 id="price_cont">{currentType}</h2>
              <p>Category</p>
            </div>
            <a href="tel:+919487255660">Enquiry Now</a>
          </div>
        </div>

        <div className="cards" style={{ marginLeft: "13px" }} ref={cardsRef}>
          {isLoading ? (
            <div style={{ color: "#fff", padding: "20px", fontSize: "14px" }}>
              Loading menu products...
            </div>
          ) : isError ? (
            <div style={{ color: "#fff", padding: "10px", fontSize: "13px" }}>
              <span>Failed to load products. </span>
              <button
                onClick={() => refetch()}
                style={{
                  background: "#4E9525",
                  color: "#fff",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div style={{ color: "#fff", padding: "20px", fontSize: "14px" }}>
              No products found in menu.
            </div>
          ) : (
            products.map((product) => {
              const isSelected = activeProduct?.id === product.id;
              const productImg = product.img_url || DEFAULT_IMAGE;

              return (
                <div
                  className={`card ${isSelected ? "active" : ""}`}
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={productImg}
                    alt={product.name}
                    className="dis"
                    onError={handleImageError}
                  />
                  <h4>{product.type ? product.type.slice(0, 10) : "Fresh"}</h4>
                  <h5 title={product.name}>{product.name}</h5>
                  <p>Special Item</p>
                  <div className="rate_cart">
                    <h6>5.0</h6>
                    <i className="bi bi-cart-dash-fill"></i>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="social">
          <div className="btns">
            <i
              className="bi bi-arrow-left-circle-fill"
              onClick={() => {
                if (cardsRef.current) cardsRef.current.scrollLeft -= 140;
              }}
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="bi bi-arrow-right-circle-fill"
              onClick={() => {
                if (cardsRef.current) cardsRef.current.scrollLeft += 140;
              }}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <div className="icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </section>
    </header>
  );
}