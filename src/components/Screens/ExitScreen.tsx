import { useEffect, useState } from "react";

const ExitScreen = () => {
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShuttingDown(true);
    }, 2500); // Espera antes de simular el apagado

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] flex items-center justify-center transition-colors duration-1000 ${
        isShuttingDown ? "bg-black text-black" : "bg-white text-black"
      }`}
    >
      {!isShuttingDown && (
        <div className="text-center">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="pikachu"
            className="w-[48px] h-[48px] mx-auto mb-2"
          />
          <p>See you later, Trainer!</p>
        </div>
      )}
    </div>
  );
};

export default ExitScreen;
