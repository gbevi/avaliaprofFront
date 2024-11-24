import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-300 flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Webysther_20160322_-_Logo_UnB_%28sem_texto%29.svg"
            alt="Logo"
            width={50}
            height={50}
            className="mr-4"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1827/1827370.png"
              alt="Notificação"
              width={30}
              height={30}
            />
          </button>
          <button>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
          <button>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1828/1828304.png"
              alt="Sair"
              width={30}
              height={30}
            />
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Buscar Professor(a)"
          className="w-2/3 sm:w-1/3 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Novos Professores */}
      <section className="my-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Novos Professores</h2>
        <div className="flex justify-center space-x-4">
          {Array(4).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center w-36"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="Professor Avatar"
                width={80}
                height={80}
                className="mx-auto"
              />
              <p className="mt-4 text-lg font-medium">Nome</p>
              <p className="text-gray-500 text-sm">Disciplina</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 mx-6 border-gray-300" />

      {/* Todos os Professores */}
      <section className="my-8">
        <div className="flex justify-between items-center mx-6">
          <h2 className="text-xl font-semibold">Todos os Professores</h2>
          <div className="space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              Nova Publicação
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              Ordenar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mx-6">
          {Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 text-center"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="Professor Avatar"
                width={80}
                height={80}
                className="mx-auto"
              />
              <p className="mt-4 text-lg font-medium">Nome</p>
              <p className="text-gray-500 text-sm">Disciplina</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
