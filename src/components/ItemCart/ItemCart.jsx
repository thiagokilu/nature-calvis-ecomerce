import { FaTrash, FaTrashAlt } from "react-icons/fa";

export default function ItemCart({
  myCart,
  setMyCart,
  id,
  img,
  titulo,
  preco,
  qtd,
  handleRemoveItem,
}) {
  function atualizarQtd(event) {
    let novaQtd = Number(event.target.value);
    if (novaQtd < 1) {
      novaQtd = 1; // força quantidade mínima 1
    }
    setMyCart((oldCart) =>
      oldCart.map((item) => (item.id === id ? { ...item, qtd: novaQtd } : item))
    );
    console.log(myCart);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <img src={img} alt={titulo} width={100} />
        <FaTrashAlt
          className="mr-5 text-xl hover:cursor-pointer text-primary hover:text-background-secondary transition-colors"
          onClick={() => handleRemoveItem(id)}
        />
      </div>
      <span className="text-lg">{titulo}</span>
      <div className="flex flex-row justify-between items-center">
        <input
          type="number"
          placeholder="qtd"
          className="border-2 border-black max-w-20 p-1 box-border appearance-none"
          value={qtd}
          onChange={atualizarQtd}
          min={0}
        />
        <span className="font-semibold mr-5">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(preco)}
        </span>
      </div>
      <hr className="mt-5 mb-5" />
    </div>
  );
}
