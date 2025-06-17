import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function Product({ id, img, title, price, handleSetMyCart }) {
  return (
    <div>
      <div
        className="border-2 border-black min-w-96 max-w-96 flex flex-col items-center gap-2 pb-5 
      hover:cursor-pointer hover:border-primary rounded-md"
      >
        <img src={img} alt="Shampoo" width={300} />
        <span className="text-xl">{title}</span>
        <span className="text-xl font-semibold">
          {" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(price)}{" "}
          R$
        </span>
        <button
          onClick={() => handleSetMyCart(id)}
          className="flex flex-row gap-2 p-2 bg-primary text-white items-center hover:cursor-pointer rounded-md
           hover:bg-background-secondary transition-colors"
        >
          Adicionar ao carrinho <FaShoppingCart />
        </button>
      </div>
    </div>
  );
}
