import React from "react";
import { EpisodesContextProps, EpisodesProviderProps } from "./types";

import { episodes } from "./episodes";

const EpisodesContext = React.createContext<EpisodesContextProps | undefined>(
  undefined
);

export const useEpisodes = () => {
  const context = React.useContext(EpisodesContext);
  if (!context) {
    throw new Error("useEpisodes must be used within a EpisodesProvider");
  }
  return context;
};

export const EpisodesProvider: React.FC<EpisodesProviderProps> = ({
  children,
}: EpisodesProviderProps) => {
  const [filters, setFilters] = React.useState<Set<string>>(new Set());
  const exposedState = React.useMemo(() => {
    return {
      episodeFilters: filters,
      episodes: episodes,
      updateEpisodeFilters: (filter: string) => {
        setFilters((prev) => {
          const newFilters = new Set(prev);
          if (newFilters.has(filter)) {
            newFilters.delete(filter);
          } else {
            newFilters.add(filter);
          }
          return newFilters;
        });
      },
    };
  }, [filters, setFilters]);

  return (
    <EpisodesContext.Provider value={exposedState}>
      {children}
    </EpisodesContext.Provider>
  );
};
