import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
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
        console.log("Dados recebidos da API:", data);
        const productsCopy = [...data];
        setAllProducts(productsCopy);
        setProducts(productsCopy);
        setCarregando(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = useCallback((valor) => {
    const termo = valor.trim().toLowerCase();
    console.log("Termo de busca:", termo);
    console.log("AllProducts antes da busca:", allProducts);

    if (!termo) {
      console.log("Restaurando todos os produtos:", allProducts);
      setProducts([...allProducts]);
    } else {
      function removeAcentos(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      
      const pesquisa = allProducts.filter((item) =>
        removeAcentos(item.titulo.toLowerCase()).includes(removeAcentos(termo.toLowerCase()))
      );
      console.log("Produtos filtrados:", pesquisa);
      setProducts([...pesquisa]);
    }
  }, [allProducts]);

  useEffect(() => {
    console.log("AllProducts atualizado:", allProducts);
    console.log("Products atualizado:", products);
  }, [allProducts, products]);

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
