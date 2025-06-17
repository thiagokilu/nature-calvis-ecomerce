import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Contact from "./pages/Contact/Contact";
import Carrinho from "./components/Carrinho/Carrinho";
import { h1 } from "framer-motion/client";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    setCarregando(true);
    fetch("http://localhost:3000/produtos")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data);
        setCarregando(false);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSearch(valor) {
    const termo = valor.trim().toLowerCase();

    if (!termo) {
      console.log("Restaurando allProducts:", allProducts); // Verifique se contém todos os 4 itens
      setProducts(allProducts);
    } else {
      const pesquisa = allProducts.filter((item) =>
        item.titulo.toLowerCase().includes(termo)
      );
      setProducts(pesquisa);
    }
  }

  useEffect(() => {
    console.log("AllProducts atualizado:", allProducts);
  }, [allProducts]);

  return (
    <>
      <Header
        setOpenCart={setOpenCart}
        myCart={myCart}
        handleSearch={handleSearch}
      />
      {openCart && (
        <Carrinho
          myCart={myCart}
          setMyCart={setMyCart}
          setOpenCart={setOpenCart}
          openCart={openCart}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              myCart={myCart}
              setMyCart={setMyCart}
              setOpenCart={setOpenCart}
              products={products}
              carregando={carregando}
            />
          }
        />
        {/* outras rotas */}
      </Routes>
    </>
  );
}

export default App;
