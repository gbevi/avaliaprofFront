"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import HeaderLogado from '../components/HeaderLogado';

interface Professor {
  id: number;
  name: string;
  subjects: string[];
  evaluations: string[];
}

export default function Home() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Função para navegar para o perfil do professor
  const handleProfessorClick = (id: number) => {
    router.push(`/professor/${id}`);
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
          {filteredProfessores.slice(0, 4).map((professor) => (
            <div
              key={professor.id}
              onClick={() => handleProfessorClick(professor.id)} // Navegar ao clicar
              className="bg-white shadow-md rounded-md p-4 text-center cursor-pointer hover:shadow-lg transition"
            >
              <p className="mt-4 text-lg font-Questrial font-medium">{professor.name}</p>
              <p className="text-gray-500 font-Questrial text-sm">{professor.subjects[0]}</p>
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
            onClick={() => console.log('Nova publicação clicada')} 
            className="mr-20 px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
          >
            Nova Publicação
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
              <p className="text-gray-500 font-Questrial text-sm">{professor.subjects[0]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
