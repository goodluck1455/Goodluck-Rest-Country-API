// import React from 'react'
// import Select from "react-select";
import { useEffect, useState } from "react";
import { useCountryStore } from "../Store/useCountry";
import { Link } from "react-router-dom";
// import { MdDarkMode } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
// import counrtyData from "/data.json";
import type { Country } from "../Store/useCountry";
import SelectForm from "../Components/SelectForm";
import { IoMdClose } from "react-icons/io";
import { useThemeStore } from "../Store/useTheme";
import { motion } from "framer-motion";
import {fadeIn} from "../Components/Animation"

// interface Props {
//   country?: Country; // Optional if passed down, not used directly
// }



export default function CountryDisplay() { 

  const {fetchCountries, countries,   searchQuery, setSearchQuery, filteredCountries, selectedRegion} = useCountryStore();
  const setSelectedCountry = useCountryStore((state) => state.setSelectedCountry);
     const {theme, hasHydrated} = useThemeStore();
     const [isLoading, setIsLoading] = useState(false); 

const handleClick = (selectedCountry: Country) => {
  setSelectedCountry(selectedCountry);
};


 const Text = theme === "dark" ? "text-[#ffffff]" : "text-[#2b3945]";
const Background = theme === "dark" ? "bg-[#2b3945] ": "bg-[#ffffff]"
const SpinBorder = theme === "dark" ? "border-[#ffffff]" : "border-[#2b3945]"

const InputPlaceHolder =  theme === "dark" ? "placeholder-white" : "placeholder-[#2b3945]"

useEffect(() => {
    const loadData = async () => {
      await fetchCountries();
      setTimeout(() => setIsLoading(true), 300); // slight delay for smooth transition
    };
    loadData();
  }, [fetchCountries]);
  
//  useEffect(() => {
//     fetchCountries();
//   }, [fetchCountries]);

const filtered = filteredCountries();

  const noMatchInRegion =
    selectedRegion &&
    searchQuery &&
    filtered.length === 0 &&
    countries.some((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

const isAppReady = hasHydrated && isLoading;

if (!isAppReady) {
    return (
      <div className={`flex items-center justify-center h-screen ${Background}`}>
        <div className={`w-20 h-20 border-4 ${SpinBorder} border-t-transparent rounded-full animate-spin`}></div>
      </div>
    );
  }

  return (
    <>
      
      <section>
        <div className="py-10 px-20 max-lg:px-10 flex justify-between items-center mt-15  max-sm:flex-col max-sm:gap-7 max-sm:px-8 max-sm:items-start">
          <div className={`${theme === "dark" ? "bg-[#2b3945] ": "bg-[#ffffff]"}  rounded-[4px] w-[20rem]  h-[3rem] flex items-center gap-3 px-2 max-sm:w-full  box-shawdow `}>
            <IoMdSearch className={`${Text} text-2xl`} />
            <input
              type="text"
              placeholder="Search for a country..."
              className={`bg-transparent outline-none w-full 2xl:h-full ${Text} ${InputPlaceHolder}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <IoMdClose
                className={`${Text} text-2xl cursor-pointer`}
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
          <div className="  ">
            

            <SelectForm />
            
            {/* <select
              name=""
              id=""
               aria-label="Filter by region"
              className="bg-[#2b3945] h-full outline-none w-full text-white  border-0  focus:outline-none"
            >
              
                <option value="" className="hover:text-[#2b3945]  "> Filter by Reg</option>
                <option value="">America</option>
              </select> */} 
          </div>
        </div>
      </section>
    
    <div className="px-9 grid grid-cols-4  w-full place-items-center mt-10 
    
    max-sm:mt-5 max-sm:grid-cols-1 max-sm:w-full  
    max-lg:grid-cols-2 max-lg:px-5 md:px-12
    max-xl:grid-cols-3 min-[2000px]:grid-cols-6 min-[1775px]:grid-cols-5
    
    ">
 
                {noMatchInRegion ? (
                  <div className=" col-span-12">
          <p className={`${Text} text-center text-lg `}>
           {searchQuery} Country not found within {selectedRegion} region.
          </p>
          </div>
        ) : filtered.length === 0 ? (
          <p className={` ${Text} text-center text-lg mt-10 col-span-12`}>
            {searchQuery} country not found.
          </p>
        ) : (
         filteredCountries().map((data) => {
        return (
            <>
            <Link to={`/country/${data.name}`} onClick={()=>handleClick(data)} key={data.name}>
              
              <motion.div 
           variants={fadeIn("up", 0.3, "scale")}
         initial="hidden"
         whileInView={"show"}
         

            className={` ${theme === "dark" ? "bg-[#2b3945] ": "bg-[#ffffff]"}   w-[17rem] h-[24rem]   box-shawdow  mb-10 cursor-pointer rounded-[10px]
            md:w-[20rem] lg:w-[17rem]`}
            
          >
            <div
              className={` overflow-hidden h-[11rem] w-full rounded-tl-[10px] rounded-tr-[10px]
              `}
            >
              <img
                src={data.flags.svg} 
                alt={data.name || "Country Flag"}
                className={`w-full object-cover h-full  
             
                
`}
                loading="lazy"
              />
            </div>
            <div
              className={`px-4 py-4 leading-7 
              `}
            >
              <h3 className={`${Text} mb-2  font-semibold text-[1.2rem]`}>
                {data.name}
              </h3>
              <p className={`${Text}  text-[1rem] font-semibold`}>
                Population:
                <span className={`${theme === "dark" ? " text-[#fcfcfc]" : "text-[#2b3945]"} opacity-75 ml-2`}>
                  {data.population.toLocaleString()}
                </span>
              </p>
              <p className={`${Text}  text-[1rem] font-semibold`}>
                Region:
                <span className={`${Text} opacity-75 ml-2`}>{data.region}</span>
              </p>
              <p className={`${Text}  text-[1rem] font-semibold`}>
                Capital:
                <span className={`${Text} opacity-75 ml-2`}>{data.capital}</span>
              </p>
            </div>
          </motion.div>
          </Link>
          </>
        );
      }))
    }
   
    </div>
    </>
  );
}
