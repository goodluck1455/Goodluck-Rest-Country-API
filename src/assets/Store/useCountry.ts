import { create } from 'zustand';
import { persist } from 'zustand/middleware';



interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Languages {
  name: string; 
}

export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  alpha3Code: string;
  languages: Languages[];
  flags: {
    svg: string;
    png: string;
  };
  nativeName: string;
  numericCode: string;
  subregion:string;
  topLevelDomain:string[];
  borders: string[];
  currencies: Currency[];
  // languages: string[];
  timezones: string[];
  // Add more fields based on your actual data
}

interface CountryStore {
  countries: Country[];
  selectedRegion: string;
  selectedCountry: Country | null;
  fetchCountries: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  setSelectedRegion: (region: string) => void;
 setSelectedCountry: (country: Country) => void;
 filteredCountries: () => Country[];
}

export const useCountryStore = create<CountryStore>()(
  persist(
    (set, get) => ({
      countries: [],
      selectedCountry: null,
      searchQuery: '',
      selectedRegion: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      fetchCountries: async () => {
        try {
          const response = await fetch('/data.json');
          const data = await response.json();
          set({ countries: data });
        } catch (error) {
          console.error('Error loading countries:', error);
        }
      },

      setSelectedCountry: (country) => set({ selectedCountry: country }),
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      
  //     filteredCountries: () => {
  //   const { countries, searchQuery } = get();
  //   return countries.filter((country) =>
  //     country.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // },

   filteredCountries: () => {
  const { countries, searchQuery, selectedRegion } = get();

  return countries.filter((country) => {
    const matchName = country.name.toLowerCase().includes(searchQuery.toLowerCase());

    // ✅ If selectedRegion is not empty, apply region filter
    const matchRegion =
      selectedRegion && selectedRegion !== 'Filter all Region'
        ? country.region === selectedRegion
        : true;

    return matchName && matchRegion;
  });
}



    }),
    
    {
      name: 'country-store', // Unique key in localStorage
    }
  )
);