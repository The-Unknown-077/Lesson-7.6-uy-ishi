import { memo, useState, useEffect } from "react";
import Header from "../components/Header";
import Countrys from "../components/Countrys";
import CountryForm from "../components/CountryForm";
import { api } from "../api";

interface IForm {
  name: string;
  capital: string;
  population: number;
  area: number;
}

interface ICountry extends IForm {
  id: number;
}

const Home = () => {
  const [editData, setEditData] = useState<ICountry | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);

  const for_error = countries
  console.log(for_error);
  

  const fetchCountries = () => {
    api.get("/countrys")
      .then(res => setCountries(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="Home">
      <Header />
      <CountryForm
        editData={editData}
        clearEdit={() => setEditData(null)}
        refresh={fetchCountries} 
      />
      <Countrys
        onEdit={(country) => setEditData(country)}
        refresh={fetchCountries} 
      />
    </div>
  );
};

export default memo(Home);
