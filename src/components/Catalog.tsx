import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  const base = process.env.REACT_APP_API_BASE;
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.bottom = "0";
  el.style.left = "0";
  el.style.background = "black";
  el.style.color = "lime";
  el.style.padding = "4px";
  el.style.zIndex = "9999";
  el.innerText = `API_BASE = ${base}`;
  document.body.appendChild(el);

  if (!base) {
    console.error("❌ REACT_APP_API_BASE не задан в .env");
    el.innerText += " (❌ not set)";
    return;
  }

  fetch(`${base}/api/products/`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      el.innerText += ` (✅ loaded ${data.length})`;
    })
    .catch((err) => {
      console.error("Ошибка загрузки товаров:", err);
      el.innerText += " (❌ fetch failed)";
    });
}, []);


  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          imageUrl={product.image_url}
        />
      ))}
    </div>
  );
};

export default Catalog;
