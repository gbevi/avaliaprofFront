"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HeaderLogado from '../components/HeaderLogado';

interface GetProfessor {
  id: number;
  name: string;
  subjects: Subject[];
  evaluations: string[];
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [professores, setProfessores] = useState<GetProfessor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfessorName, setNewProfessorName] = useState('');
  const [newProfessorSubject, setNewProfessorSubject] = useState('');
  const [newProfessorDepartment, setNewProfessorDepartment] = useState('');
  const router = useRouter();

  // Fetch data from API
  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teacher'); 
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  // Filtrar professores pela barra de pesquisa
  const filteredProfessores = professores.filter(professor =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrar professores criados no último dia
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const newProfessores = professores.filter(professor =>
    new Date(professor.createdAt) > oneDayAgo
  );

  // Função para navegar para o perfil do professor
  const handleProfessorClick = (id: number) => {
    router.push(`/professor/${id}`);
  };

  // Função para criar um novo professor
  const handleCreateProfessor = async () => {
    try {
      const response = await axios.post('http://localhost:3001/teacher', {
        name: newProfessorName,
        subjectNames: [newProfessorSubject],
        department: newProfessorDepartment,
      });
      setProfessores([...professores, response.data]);
      setIsModalOpen(false);
      setNewProfessorName('');
      setNewProfessorSubject('');
      setNewProfessorDepartment('');
    } catch (error) {
      console.error('Erro ao criar professor:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderLogado />

      {/* Search Bar */}
      <div className="flex items-center justify-between mt-4 mx-8">
        <h2 className="text-center text-2xl font-semibold font-Questrial ml-20">Novos Professores</h2>
        <input
          type="text"
          placeholder="Buscar Professor(a)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-2/3 sm:w-1/3 px-4 py-2 mr-20 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Novos Professores */}
      <section className="my-8">
        <div className="flex justify-center space-x-10">
          {newProfessores.slice(0, 4).map((professor) => (
            <div
              key={professor.id}
              onClick={() => handleProfessorClick(professor.id)} // Navegar ao clicar
              className="bg-white shadow-md rounded-md p-4 text-center cursor-pointer hover:shadow-lg transition"
            >
              <p className="mt-4 text-lg font-Questrial font-medium">{professor.name}</p>
              <p className="text-gray-500 font-Questrial text-sm">
                {professor.subjects && professor.subjects.length > 0 ? professor.subjects.map(subject => subject.name).join(", ") : "Sem disciplinas"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 mx-6 border-gray-300" />

      {/* Todos os Professores */}
      <section className="m-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-Questrial ml-20">Todos os Professores</h2>
          <button
            onClick={() => setIsModalOpen(true)} 
            className="mr-20 px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
          >
            Novo Professor
          </button>
        </div>
        <div className="flex flex-wrap justify-center space-x-10 mt-6 mx-6">
          {filteredProfessores.map((professor) => (
            <div
              key={professor.id}
              onClick={() => handleProfessorClick(professor.id)} // Navegar ao clicar
              className="bg-white shadow-md rounded-md p-4 text-center cursor-pointer hover:shadow-lg transition"
            >
              <p className="mt-4 text-lg font-Questrial font-medium">{professor.name}</p>
              <p className="text-gray-500 font-Questrial text-sm">
                {professor.subjects && professor.subjects.length > 0 ? professor.subjects.map(subject => subject.name).join(", ") : "Sem disciplinas"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal para criar novo professor */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Professor</h2>
            <input
              type="text"
              placeholder="Nome do Professor"
              value={newProfessorName}
              onChange={(e) => setNewProfessorName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <input
              type="text"
              placeholder="Disciplina"
              value={newProfessorSubject}
              onChange={(e) => setNewProfessorSubject(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <input
              type="text"
              placeholder="Departamento"
              value={newProfessorDepartment}
              onChange={(e) => setNewProfessorDepartment(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProfessor}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}