interface DeleteProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
  }
  
  export default function DeleteProfileModal({ isOpen, onClose, onDelete }: DeleteProfileModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 text-center">
          <h2 className="text-xl font-bold mb-4">Tem certeza que deseja excluir o perfil?</h2>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
              Cancelar
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={onDelete}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  }
  