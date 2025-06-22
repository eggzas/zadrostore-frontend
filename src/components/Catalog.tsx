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
    if (!base) {
      console.error("❌ REACT_APP_API_BASE не задан в .env");
      return;
    }

    fetch(`${base}/api/products/`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ошибка загрузки товаров:", err));
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
