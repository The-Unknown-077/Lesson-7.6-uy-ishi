import { memo, useState, useEffect } from "react";
import { api } from "../api";
import { type FC } from "react";
import { type ChangeEvent, type FormEvent } from "react";

interface IForm {
  name: string;
  capital: string;
  population: number | string;
  area: number | string;
}

interface Props {
  editData: (IForm & { id: number }) | null;
  clearEdit: () => void;
  refresh: () => void;
}

const initialState: IForm = {
  name: "",
  capital: "",
  population: "",
  area: "",
};

const CountryForm: FC<Props> = ({ editData, clearEdit, refresh }) => {
  const [form, setForm] = useState<IForm>(initialState);

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editData) {
      api
        .put(`/countrys/${editData.id}`, form)
        .then(() => {
          alert("Country updated successfully!");
          setForm(initialState);
          refresh();
          clearEdit();
        })
        .catch(console.error);
    } else {
      api
        .post("/countrys", form)
        .then(() => {
          alert("Country added successfully!");
          setForm(initialState);
          refresh();
        })
        .catch(console.error);
    }

  };

  return (
    <div className="CountryForm w-[400px] mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl text-center font-bold text-indigo-700 mb-4">
        {editData ? "Update Country" : "Add Country"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="border rounded-[5px] border-gray-400 p-2" name="name" value={form.name} onChange={handleChange} placeholder="Country Name" required />
        <input className="border rounded-[5px] border-gray-400 p-2" name="capital" value={form.capital} onChange={handleChange} placeholder="Capital" required />
        <input className="border rounded-[5px] border-gray-400 p-2" name="population" type="number" value={form.population} onChange={handleChange} placeholder="Population" required />
        <input className="border rounded-[5px] border-gray-400 p-2" name="area" type="number" value={form.area} onChange={handleChange} placeholder="Area" required />
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-lg">
          {editData ? "Update Country" : "Add Country"}
        </button>
      </form>
    </div>
  );
};

export default memo(CountryForm);
