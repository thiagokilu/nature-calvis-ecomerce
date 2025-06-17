import React, { useEffect, useState } from "react";
import shampoo from "../../assets/img/shampoo.png";
import Product from "../Product/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList({
  myCart,
  setMyCart,
  setOpenCart,
  products,
  setProducts,
}) {
  // Log para debug
  useEffect(() => {
    console.log("ProductList - produtos recebidos:", products);
    console.log("ProductList - quantidade de produtos:", products.length);
  }, [products]);

  function handleSetMyCart(id) {
    const selectedProduct = products.find((product) => product.id === id);

    if (!selectedProduct) return; // Adicione esta verificação

    // Crie uma cópia do produto para evitar referência compartilhada
    const productToAdd = { ...selectedProduct, qtd: 1 };

    const existe = myCart.some((item) => item.id === productToAdd.id);

    if (existe) {
      setMyCart((oldCart) =>
        oldCart.map((item) =>
          item.id === id ? { ...item, qtd: item.qtd + 1 } : item
        )
      );
    } else {
      setMyCart((prevCart) => [...prevCart, productToAdd]);
    }

    setOpenCart(true);
  }

  return (
    <div>
      <div className="flex flex-row flex-wrap mt-20 ml-20 mr-20 mb-20 gap-10 items-center justify-center">
        {products && products.length > 0 ? (
          products.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              img={item.img}
              title={item.titulo}
              price={item.preco}
              handleSetMyCart={handleSetMyCart}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
