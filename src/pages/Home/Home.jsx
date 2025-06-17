import React, { useState, useEffect } from "react";
import ProductList from "../../components/ProducstList/ProductList";
import Carrinho from "../../components/Carrinho/Carrinho";

export default function Home({
  myCart,
  setMyCart,
  setOpenCart,
  products,
  setProducts,
  carregando,
}) {
  return (
    <div className="relative">
      {carregando ? (
        <h1 className="text-4xl flex items-center text-center justify-center font-semibold mt-20">
          Carregando produtos...
        </h1>
      ) : (
        <ProductList
          myCart={myCart}
          setMyCart={setMyCart}
          setOpenCart={setOpenCart}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}
