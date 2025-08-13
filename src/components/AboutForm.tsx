import { memo, useState, type ChangeEvent, type FormEvent, type FC, type Dispatch, type SetStateAction, useEffect } from "react";

export interface IPhone {
    id?: number;
    title: string;
    storage: number | string;
    ram: number | string;
    brand: string;
    price: number | string;
}

interface Props {
    onSubmit: (phone: IPhone) => void;
    onUpdate: (phone: IPhone) => void;
    editingItem: IPhone | null;
    setEditingItem: Dispatch<SetStateAction<IPhone | null>>;
}

const initialState: IPhone = {
    title: "",
    storage: "",
    ram: "",
    brand: "",
    price: "",
};

const AboutForm: FC<Props> = ({ onSubmit, onUpdate, editingItem, setEditingItem }) => {
    const [form, setForm] = useState<IPhone>(initialState);

    useEffect(() => {
        if (editingItem) {
            setForm(editingItem);
        }
    }, [editingItem]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            onUpdate(form);
        } else {
            onSubmit(form);
        }
        setForm(initialState);
        setEditingItem(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white mt-[30px] shadow-md rounded-lg p-6 max-w-md mx-auto space-y-4"
        >
            <h2 className="text-2xl font-bold text-center text-indigo-600">
                {editingItem ? "Update Phone" : "Add Phone"}
            </h2>

            <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                required
            />

            <input
                type="number"
                name="storage"
                value={form.storage}
                onChange={handleChange}
                placeholder="Storage"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                required
            />

            <input
                type="number"
                name="ram"
                value={form.ram}
                onChange={handleChange}
                placeholder="RAM"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                required
            />

            <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                required
            />

            <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-indigo-200"
                required
            />

            <button
                type="submit"
                className={`w-full ${editingItem ? "bg-yellow-500 hover:bg-yellow-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-2 rounded-lg transition duration-300`}
            >
                {editingItem ? "Update Phone" : "Save Phone"}
            </button>
        </form>
    );
};

export default memo(AboutForm);
