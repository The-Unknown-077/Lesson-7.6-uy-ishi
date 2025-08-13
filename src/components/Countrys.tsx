import { memo, useState, useEffect, type FC } from 'react';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api';

interface ICountry {
  id: number;
  name: string;
  capital: string;
  population: number;
  area: number;
}

interface Props {
  onEdit: (country: ICountry) => void;
  refresh: () => void;
}

const Countrys: FC<Props> = ({ onEdit, refresh }) => {
  const { data, loading } = useFetch<ICountry[]>("/countrys");
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    if (data) setCountries(data);
  }, [data]);

  const handleDelete = (id: number) => {
    api
      .delete(`/countrys/${id}`)
      .then(() => {
        setCountries((prev) => prev.filter((country) => country.id !== id));
        refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="Countrys container mx-auto">
      {loading && <p className='text-[24px] text-center mt-[10px] font-medium'>Loading...</p>}
      <div className="grid grid-cols-4 gap-[15px] mt-[30px]">
        {countries.map((country) => (
          <div
            key={country.id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">{country.name}</h2>
            <p><span className="font-medium">Capital:</span> {country.capital}</p>
            <p><span className="font-medium">Population:</span> {country.population}</p>
            <p className="mb-4"><span className="font-medium">Area:</span> {country.area}</p>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(country)}
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(country.id)}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Countrys);
