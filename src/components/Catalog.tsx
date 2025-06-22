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

  const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/products/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ошибка загрузки товаров:", err));
  }, [API_BASE]);

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
