import Image from 'next/image';
import HeaderLogado from '../components/HeaderLogado';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeaderLogado />
      {/* Search Bar */}
      <div className="flex items-center justify-between mt-4 mx-8">
        <h2 className="text-center text-2xl font-semibold font-Questrial ml-20">Novos Professores</h2>
        <input
          type="text"
          placeholder="Buscar Professor(a)"
          className="w-2/3 sm:w-1/3 px-4 py-2 mr-20 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 "
        />
      </div>

      {/* Novos Professores */}
      <section className="my-8">
        <div className="flex justify-center space-x-10">
          {Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center"
            >
              <Image
                src='/images/perfil.png'
                alt="Professor Avatar"
                width={236}
                height={281}
                className="mx-auto"
              />
              <p className="mt-4 text-lg font-Questrial font-medium">Nome</p>
              <p className="text-gray-500 font-Questrial text-sm">Disciplina</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 mx-6 border-gray-300" />

      {/* Todos os Professores */}
      <section className="m-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-Questrial ml-20">Todos os Professores</h2>
        </div>
        <div className="flex justify-center space-x-10 mt-6 mx-6">
          {Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center "
            >
              <Image
                src='/images/perfil.png'
                alt="Professor Avatar"
                width={236}
                height={281}
                className="mx-auto"
              />
              <p className="mt-4 text-lg font-Questrial font-medium">Nome</p>
              <p className="text-gray-500 font-Questrial text-sm">Disciplina</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
