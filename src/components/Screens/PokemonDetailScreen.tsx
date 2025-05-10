import { useEffect, useState, useContext } from "react";
import { MenuPokedexContext } from "../../contexts/MenuPokedexContext";

interface PokemonDetail {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

const PokemonDetailScreen = () => {
  const { activePokemonData } = useContext(MenuPokedexContext);
  const [details, setDetails] = useState<PokemonDetail | null>(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!activePokemonData) return;

      const res = await fetch(activePokemonData.url);
      const data = await res.json();
      setDetails(data);

      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
      const speciesData: PokemonSpecies = await speciesRes.json();

      const entry = speciesData.flavor_text_entries.find(
        entry => entry.language.name === "en"
      );
      const cleanText = entry
        ? entry.flavor_text.replace(/[\f\n\r]/g, " ")
        : "No description available.";
      setDescription(cleanText);
    };

    fetchDetails();
  }, [activePokemonData]);

  if (!details) return <div className="p-2 text-center">Loading...</div>;

  return (
    <div className="font-pokemon text-[8px] !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden text-center flex flex-col items-center justify-start">
      <img
        src={details.sprites.front_default}
        alt={details.name}
        className="w-[60px] h-[60px] object-contain mb-1"
      />
      <div className="text-[10px] font-bold truncate w-full px-1">
        #{details.id} {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
      </div>
      <div className="text-[8px] mb-1 truncate w-full px-1">
        <strong>Type:</strong> {details.types.map(t => t.type.name).join(", ")}
      </div>
      <div className="text-[8px] text-justify px-1 leading-tight break-words w-full h-[50px] overflow-hidden">
        <strong>Description:</strong> {description}
      </div>
    </div>
  );
};

export default PokemonDetailScreen;
