import {   Listbox  } from '@headlessui/react'
// import { } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FaAngleDown as ChevronDownIcon } from "react-icons/fa6";
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { useCountryStore } from '../Store/useCountry';
import { useThemeStore } from '../Store/useTheme';


// const options = ['Filter by Region', 'Paused', 'Delayed', 'Canceled']


export default function SelectForm() {

  const {theme} = useThemeStore();

  const { countries, selectedRegion, setSelectedRegion, fetchCountries } = useCountryStore(); 

useEffect(() => {
    if (countries.length === 0) fetchCountries()
  }, [countries.length, fetchCountries])

  // Generate region options from country data
  const options = useMemo(() => {
    const list = countries.map((c) => c.region).filter(Boolean)
    const unique = Array.from(new Set(list))
    return ['Filter all Region', ...unique]
  }, [countries])
  
  const Text = theme === "dark" ? " text-[#ffffff]" : "text-[#2b3945]";
  const Background = theme === "dark" ? "bg-[#2b3945] ": "bg-[#ffffff]"
  const BackgroundOption = theme === "dark" ? "bg-[#2b3945] ": "bg-[#c0bfbf]"

  return (
    <div>
      <div className="w-[18rem] max-sm:w-[14rem] px-4 max-sm:px-0">
      <Listbox value={selectedRegion} 
       onChange={(value) =>
          setSelectedRegion(value === 'Filter by Regions' ? '' : value)
        }
      >
        <div className="relative">
          <Listbox.Button className={`relative w-full max-sm:px-2 h-[3rem] flex justify-between items-center outline-none box-shawdow cursor-pointer rounded-[4px] ${Background}  px-2 text-left ${Text} text-[1rem]`}>
            {selectedRegion || 'Filter by Regions'}
            <ChevronDownIcon className={` size-4 ${Text}`} />
          </Listbox.Button>

          <Listbox.Options className={`absolute mt-1 max-h-60 w-full scroll-smooth hide-scrollbar overflow-auto  rounded-md ${Background} py-1 text-[1rem] ${Text}  ring-1 ring-black/10 focus:outline-none`}>
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  clsx(
                    'cursor-pointer select-none px-4 py-2',
                    active ? BackgroundOption : '',
                    ''
                  )
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
    </div>
  )
}
