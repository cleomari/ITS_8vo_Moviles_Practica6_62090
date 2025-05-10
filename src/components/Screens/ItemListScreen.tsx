import React, {
  useEffect,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

interface Item {
  name: string;
  url: string;
  image: string;
}

const LIMIT = 6;

const PackListScreen = forwardRef((props, ref) => {
  const {
    selectedPokemonIndex,
    setSelectedPokemonIndex,
    setActivePokemonData,
    screen,
  } = useContext(MenuPokedexContext);

  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);

  const loadItems = async (nextOffset: number, defaultIndex = 0) => {
    const res = await fetch(`https://pokeapi.co/api/v2/item?limit=${LIMIT}&offset=${nextOffset}`);
    const data = await res.json();

    const itemDetails = await Promise.all(
      data.results.map(async (item: any) => {
        const itemRes = await fetch(item.url);
        const itemData = await itemRes.json();
        return {
          name: item.name,
          url: item.url,
          image: itemData.sprites.default || "", // fallback to empty string
        };
      })
    );

    setItems(itemDetails);
    setOffset(nextOffset);
    setSelectedPokemonIndex(defaultIndex);
  };

  useEffect(() => {
    if (screen === EPokedexScreen.PACK) {
      loadItems(0);
    }
  }, [screen]);

  useEffect(() => {
    if (items[selectedPokemonIndex]) {
      setActivePokemonData(items[selectedPokemonIndex]);
    }
  }, [selectedPokemonIndex, items]);

  useImperativeHandle(ref, () => ({
    goNext: () => {
      if (selectedPokemonIndex < LIMIT - 1) {
        setSelectedPokemonIndex((prev) => prev + 1);
      } else {
        loadItems(offset + LIMIT, 0);
      }
    },
    goPrev: () => {
      if (selectedPokemonIndex > 0) {
        setSelectedPokemonIndex((prev) => prev - 1);
      } else if (offset > 0) {
        loadItems(offset - LIMIT, LIMIT - 1);
      }
    },
  }));

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)]">
      {items.map((item, idx) => (
        <div
          key={item.name}
          className={`flex items-center gap-2 ${idx === selectedPokemonIndex ? 'bg-gray-200 rounded' : ''}`}
          onClick={() => {
            setActivePokemonData(item);
            setSelectedPokemonIndex(idx);
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-[20px] h-[20px] object-contain"
            />
          )}
          <span className="capitalize">{item.name.replace(/-/g, ' ')}</span>
        </div>
      ))}
    </div>
  );
});

export default PackListScreen;
