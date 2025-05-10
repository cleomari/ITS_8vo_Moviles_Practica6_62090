import { useContext, useEffect, useState } from "react";
import { MenuPokedexContext } from "../../contexts/MenuPokedexContext";

interface ItemDetail {
  id: number;
  name: string;
  sprites: { default: string };
  effect_entries: { effect: string; language: { name: string } }[];
}

const ItemDetailScreen = () => {
  const { activePokemonData } = useContext(MenuPokedexContext);
  const [item, setItem] = useState<ItemDetail | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      if (!activePokemonData) return;

      const res = await fetch(activePokemonData.url);
      const data = await res.json();
      setItem(data);

      const entry = data.effect_entries.find((e: any) => e.language.name === "en");
      setDescription(entry ? entry.effect : "No description available.");
    };

    fetchItem();
  }, [activePokemonData]);

  if (!item) return <div className="p-2 text-center">Loading...</div>;

  return (
    <div className="font-pokemon text-[8px] !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] text-center flex flex-col items-center justify-start">
      <img
        src={item.sprites.default}
        alt={item.name}
        className="w-[40px] h-[40px] object-contain mb-1"
      />
      <div className="text-[10px] font-bold truncate w-full px-1">
        #{item.id} {item.name}
      </div>
      <div className="text-[8px] text-justify px-1 leading-tight break-words w-full h-[50px] overflow-hidden">
        <strong>Effect:</strong> {description}
      </div>
    </div>
  );
};

export default ItemDetailScreen;
