// import  {useRef, useState, useEffect} from 'react'
// import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineKeyboardBackspace as Backarrow } from "react-icons/md";
import { useCountryStore } from "../Store/useCountry";
import { Link } from "react-router-dom";
import { useThemeStore } from "../Store/useTheme";

export default function CountryDetails() {
  const { countries,  fetchCountries,  } = useCountryStore();
  const {theme} = useThemeStore()
const { countryName } = useParams(); 


    const Text = theme === "dark" ? " text-[#ffffff]" : "text-[#2b3945]";
    const CountryDetails_Text = theme === "dark" ? " text-[#fcfcfc]" : "text-[#2b3945]";

     const Background = theme === "dark" ? "bg-[#2b3945] ": "bg-[#ffffff]"

useEffect(() => {
    if (!countries.length) {
      fetchCountries();
    }
  }, [countries.length, fetchCountries]);

  // Find the country by name from the URL param
  const selectedCountry = countries.find(
    (country) => country.name.toLowerCase() === decodeURIComponent(countryName || '').toLowerCase()
  );

  if (!selectedCountry) {
    return (
      <div className="text-white text-center mt-10 text-3xl flex justify-center items-center">
        Country not found or still loading...
      </div>
    );
  }
       


  return (
    <div className="mb-30 mt-30 max-sm:mt-20">
      <section>
        <div className="mt-10 px-15 max-sm:px-8">
          <Link to="/">
            {" "}
            <button
              type="button"
              className={`${Background} ${Text} flex items-center gap-2 py-2 px-5 box-shawdow cursor-pointer rounded-[5px]`}
            >
              <Backarrow className={`${Text}`} size={25} /> Back
            </button>{" "}
          </Link>
        </div>
      </section>

      <section className="px-15 mt-8 max-sm:px-8">
        <div className="flex justify-between items-center gap-30 max-sm:flex-col max-sm:gap-10 max-lg:flex-col max-lg:gap-10">
          <div className="w-full">
            <img
              src={selectedCountry.flag}
              alt=""
              className="w-full obhject-contain h-full   rounded-[5px]"
            />
          </div>

          <div className="w-full">
            <h3 className={`mb-10 ${Text} font-bold text-2xl `}>
              {selectedCountry.name}
            </h3>

            <div className="flex gap-20 max-sm:flex-col max-sm:gap-5">
              <div className="leading-8">
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Native Name:
                  <span className={`${CountryDetails_Text}  opacity-75 ml-2`}>
                    {selectedCountry.nativeName}
                  </span>
                </p>
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Population:
                  <span className={`${CountryDetails_Text} opacity-75 ml-2`}>
                    {selectedCountry.population.toLocaleString()}
                  </span>
                </p>
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Sub Region:
                  <span className={`${CountryDetails_Text} opacity-75 ml-2`}>
                    {selectedCountry.subregion}
                  </span>
                </p>
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Capital:
                  <span className={`${CountryDetails_Text} opacity-75 ml-2`}>
                    {selectedCountry.capital}
                  </span>
                </p>
              </div>

              <div className="leading-8">
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Top Level Domain:
                  <span className={`${CountryDetails_Text} opacity-75 ml-2`}>
                    {selectedCountry.topLevelDomain}
                  </span>
                </p>
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Currencies:
                  <span className={`${CountryDetails_Text} opacity-75 ml-2`}>
                    {selectedCountry?.currencies.map(
                      (currency) => currency.name
                    )}
                  </span>
                </p>
                <p className={`${Text}  text-[1rem] font-semibold`}>
                  Languages:
                  {selectedCountry.languages.map((lang, index) => {
                    return (
                      <span
                        className={`${CountryDetails_Text} opacity-75 ml-2`}
                        key={lang.name}
                      >
                        {lang.name}{index < selectedCountry.languages.length - 1 && ', '}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="mt-20 flex flex-wrap items-center gap-4 max-sm:mt-8">
              <p className={`${Text}  text-[1rem] font-semibold`}>
                Border Countries:
              </p>
              {selectedCountry?.borders?.length ? (
                
                <div className="flex flex-wrap gap-3 max-sm:gap-10">
                  {selectedCountry.borders.map((code, index) => {
                  const borderCountry = countries.find(c => c.alpha3Code === code);

                    return (
                      <Link to={`/country/${borderCountry?.name || code}`}   key={index} className="mt-5 max-sm:mt-0">
                      <span
                      
                        className={`${Backarrow} ${Text}  opacity-75 py-2 px-5 shadow-md cursor-pointer rounded-[5px]`}
                      >
                        {borderCountry ? borderCountry.name : code}
                      </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className={`${Text} opacity-70`}>No border countries</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
