export default function Home() {
    return (
      <div className="flex w-full h-screen">
        {/* Seção do Formulário */}
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
            {/* Formulário */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Criar Conta</h1>
            <form className="space-y-4">
              {/* Campo Nome */}
              <div>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-center">
                <button className="w-full py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                  Criar Conta
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-green-400">
          <img
            src="/images/unblogo.png"
            alt="Logo da Universidade"
            className="w-1/3 h-auto mb-4"
          />
          <p className="text-black text-lg font-bold">Avaliação de Professores</p>
        </div>
      </div>
    );
  }