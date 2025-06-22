import React from "react";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  imageUrl,
}) => {
  const handleBuy = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.sendData) {
      const payload = {
        action: "buy",
        product_id: id,
        title,
        price,
        timestamp: new Date().toISOString(),
      };
      tg.sendData(JSON.stringify(payload));
      console.log("📦 BUY SEND:", payload);
    } else {
      alert("tg.sendData не доступен");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 text-black">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 text-md font-semibold">{price}₽</p>
      <button
        onClick={handleBuy}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Купить
      </button>
    </div>
  );
};

export default ProductCard;
