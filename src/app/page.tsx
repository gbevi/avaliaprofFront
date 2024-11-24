import Form from "./fonts/components/Form";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        {/* Formulário na metade esquerda */}
        <Form />
      </div>

      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-green-200">
        {/* Adicionando a imagem */}
        <img
          src="/images/unblogo.png" // Caminho relativo para a imagem na pasta public
          alt="Logo da Universidade"
          className="w-1/2 h-auto" // Ajuste o tamanho conforme necessário
        />
      </div>
    </div>
  );
}
