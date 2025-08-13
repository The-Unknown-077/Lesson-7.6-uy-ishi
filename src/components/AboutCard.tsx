import { memo, type FC } from 'react';
import { type IPhone } from './AboutForm';

interface Props {
    data: IPhone[] | null;
    handleDelete: (id: number) => void;
    handleEdit: (item: IPhone) => void;
}

const AboutCard: FC<Props> = ({ data, handleDelete, handleEdit }) => {
    return (
        <div className="AboutCard container mx-auto mt-[30px]">
            <div className="grid grid-cols-3 gap-4">
                {data?.map((phone) => (
                    <div
                        key={phone.id}
                        className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-2xl font-bold text-indigo-700 mb-3">
                            {phone.title}
                        </h2>
                        <p className="mb-3">Storage: {phone.storage}</p>
                        <p className="mb-3">RAM: {phone.ram}</p>
                        <p className="mb-3">Brand: {phone.brand}</p>
                        <p className="mb-3">Price: {phone.price}</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
                                onClick={() => handleEdit(phone)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                                onClick={() => handleDelete(phone.id!)}
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

export default memo(AboutCard);
