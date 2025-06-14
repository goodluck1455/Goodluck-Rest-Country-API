import Header from "./assets/Layout/Header"
import CountryDetails from "./assets/Pages/CountryDetails";
import CountryDisplay from "./assets/Pages/CountryDisplay"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <CountryDisplay /> */}
        <Routes>
          <Route path="/" element={<CountryDisplay />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
