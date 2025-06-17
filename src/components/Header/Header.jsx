import React, { useState } from "react";
import logo from "../../assets/logo-branco.png";
import {
  FaPhone,
  FaPhoneAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

export default function Header({ setOpenCart, myCart, handleSearch }) {
  const [valor, setValor] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setValor(newValue); // pega o valor do input
    handleSearch(newValue); // Usar o novo valor diretamente
  }
  return (
    <div className="bg-bg-header text-text-primary text-lg flex flex-row items-center justify-between pr-10 w-full">
      <div className="-mt-2 -mb-2">
        <Link to="/">
          <img src={logo} alt="" width={200} />
        </Link>
      </div>
      <div className="flex flex-row relative">
        <input
          type="text"
          className="bg-amber-50 text-black relative p-2 items-center min-w-96 ml-40 rounded-md"
          value={valor}
          onChange={handleChange}
        />
        <FaSearch className="text-primary absolute right-2 top-3" />
      </div>
      <nav className="flex flex-row gap-5 items-center justify-center w-full">
        <NavLink className="flex flex-row gap-2 items-center" to="/About">
          <LuMessageCircleQuestion className="text-2xl" />
          Sobre nós
        </NavLink>
        <NavLink className="flex flex-row gap-2 items-center" to="/Contact">
          <FaPhoneAlt className="text-2xl" />
          Contato
        </NavLink>
      </nav>
      <div className="flex flex-row gap-2 items-center w-96">
        <span className="flex flex-row items-center gap-2 min-w-40">
          <FaUser className="text-2xl" /> Minha conta
        </span>
        <span
          className="flex flex-row gap-2 items-center hover:cursor-pointer"
          onClick={() => setOpenCart(true)}
        >
          <FaShoppingCart className="text-2xl" /> {myCart.length}
        </span>
      </div>
    </div>
  );
}
