import { useState, useMemo, createContext, useContext } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

const useHyphenController = (pokemon: Pokemon[]) => {
  const [filter, setFilter] = useState("");

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, pokemon]
  );

  return {
    filter,
    setFilter,
    pokemon: filteredPokemon,
  };
};

const HyphenContext = createContext<ReturnType<typeof useHyphenController>>({
  filter: "",
  setFilter: () => {},
  pokemon: [],
});

export const HyphenProvider = ({ pokemon, children }:{ pokemon: any, children: any }) => (
  <HyphenContext.Provider value={useHyphenController(pokemon)}>
    {children}
  </HyphenContext.Provider>
);

export const usePokemon = () => useContext(HyphenContext);