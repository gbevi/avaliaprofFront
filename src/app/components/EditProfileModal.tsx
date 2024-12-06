import { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    email: string;
    course: string;
    department: string;
    currentPassword?: string;
    newPassword?: string;
  }) => void;
  initialData: {
    name: string;
    email: string;
    course: string;
    department: string;
  };
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    ...initialData,
    currentPassword: "",
    newPassword: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Curso */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Curso</label>
          <input
            type="text"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Departamento */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Departamento</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Senha Atual */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Senha Atual</label>
          <input
            type="password"
            placeholder="Digite sua senha atual"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Nova Senha */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nova Senha (opcional)</label>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            className="w-full border-2 rounded-lg p-2"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Cancelar
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => onSave(formData)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

  