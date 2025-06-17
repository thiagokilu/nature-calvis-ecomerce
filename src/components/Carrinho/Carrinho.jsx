import React from "react";
import ItemCart from "../ItemCart/ItemCart";
import { FaArrowLeft, FaX } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

export default function Carrinho({ myCart, setMyCart, setOpenCart, openCart }) {
  const somaCarrinho = myCart.reduce(
    (acumulador, item) => acumulador + (item.preco * item.qtd || 0),
    0
  );

  const somaCarrinhoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(somaCarrinho);

  function handleRemoveItem(idParaRemover) {
    const novoArray = myCart.filter((item) => item.id !== idParaRemover);
    setMyCart(novoArray);
  }

  return (
    <AnimatePresence>
      {openCart && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-96 bg-white z-20 p-5 flex flex-col shadow-xl"
        >
          <FaArrowLeft
            className=" text-primary text-3xl font-semibold  p-1  absolute top-2 left-2 cursor-pointer 
            hover:text-background-secondary transition-colors"
            onClick={() => setOpenCart(false)}
          />
          <div className="flex-grow overflow-auto mt-10 mb-4">
            {myCart.length > 0 ? (
              myCart.map((item) => (
                <ItemCart
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  titulo={item.titulo}
                  preco={item.preco}
                  qtd={item.qtd}
                  myCart={myCart}
                  setMyCart={setMyCart}
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <p>O carrinho está vazio.</p>
            )}
          </div>

          <div className="flex flex-row w-full justify-between items-center">
            <span className="text-xl font-semibold w-full flex flex-row justify-between">
              Total {somaCarrinhoFormatado}
            </span>
            <button
              className="bg-primary min-w-36 text-white font-semibold p-2 hover:cursor-pointer 
            hover:bg-background-secondary transition-colors rounded-md"
            >
              Concluir compra
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
