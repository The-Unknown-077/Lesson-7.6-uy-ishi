import { memo } from 'react';
import Header from '../components/Header';
import AboutCard from '../components/AboutCard';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from '../api';
import AboutForm from '../components/AboutForm';
import { type IPhone } from '../components/AboutForm';
import { useState } from 'react';

const About = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<IPhone | null>(null);

  const { data } = useQuery({
    queryKey: ["telefon"],
    queryFn: () => api.get("phones").then((res) => res.data),
  });

  const createMutation = useMutation({
    mutationFn: (newPhone: IPhone) => api.post("phones", newPhone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telefon"] });
    },
  });

  const handleAddPhone = (phone: IPhone) => {
    createMutation.mutate(phone);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`phones/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telefon"] });
    },
  });
  const handleDeletePhone = (id: number) => {
    deleteMutation.mutate(id);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: IPhone }) =>
      api.put(`phones/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telefon"] });
    },
  });

  // Update existing phone
  const handleUpdatePhone = (phone: IPhone) => {
    if (!editingItem) return;
    updateMutation.mutate(
      { id: editingItem.id!, data: phone },
      {
        onSuccess: () => {
          setEditingItem(null);
        },
      }
    );
  };

  return (
    <div className="About">
      <Header />
      <AboutForm onSubmit={handleAddPhone}
        onUpdate={handleUpdatePhone}
        editingItem={editingItem}
        setEditingItem={setEditingItem} />
      <AboutCard data={data} handleDelete={handleDeletePhone} handleEdit={setEditingItem} />
    </div>
  );
};

export default memo(About);
