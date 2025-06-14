// import { MdDarkMode } from "react-icons/md";
import { MdNightlight as MDdarkMode } from "react-icons/md";

import { useThemeStore } from "../Store/useTheme";
import { useEffect } from "react";
import { MdOutlineNightlight } from "react-icons/md";


//  background-color: #202c37;

export default function Header() {
const {theme, toggleTheme} = useThemeStore();

useEffect(() => {
  document.body.style.backgroundColor = theme === 'dark' ? '#202c37' : '#fcfcfc'
}, [theme]); 

  return (
    <div>
      <section>
        <div
          className={`${
            theme === "dark" ? " bg-[#2b3945]" : "bg-[#ffffff]"
          } py-4  fixed w-screen top-0 z-10  max-sm:px-8 px-12 flex 
        justify-between items-center box-shawdow `}
        >
          <div>
            <h3
              className={`${
                theme === "dark" ? " text-[#ffffff]" : "text-[#2b3945]"
              }  font-semibold text-[1.3rem]  max-sm:text-[0.9rem]`}
            >
              Where in the world?
            </h3>
          </div>

          <div onClick={toggleTheme} className="cursor-pointer">
            <p className={`${theme === "dark" ? " text-[#ffffff]" : "text-[#2b3945]"}  font-semibold text-[1.1rem] flex items-center gap-1 max-sm:text-[0.9rem]`}>
              {theme === "dark" ? (
                <MDdarkMode className="text-white cursor-pointer" />
              ) : (
                <MdOutlineNightlight className="text-[#2b3945] cursor-pointer" />
              )}
               Dark Mode
            </p>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="py-10 px-10 flex justify-between items-center ">
          <div className="bg-[#2b3945] rounded-[4px] w-[20rem] h-[2.5rem] flex items-center gap-3 px-2  box-shawdow ">
            <IoMdSearch className="text-white text-2xl" />
            <input
              type="text"
              className="bg-transparent outline-none w-full text-white"
            />
          </div>
          <div className="bg-[#2b3945]  rounded-[4px] w-[13rem] h-[2.5rem] flex items-center gap-3 px-2  box-shawdow ">
            <select
              name=""
              id=""
              className="bg-[#2b3945] h-full outline-none w-full text-white  border-0  focus:outline-none"
            >
              
                <option value="" className="hover:text-[#2b3945]  "> Filter by Region</option>
                <option value="">America</option>
              </select>
          </div>
        </div>
      </section> */}
    </div>
  );
}
