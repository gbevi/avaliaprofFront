import Form from "./fonts/components/Form";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        {/* Formulário na metade esquerda */}
        <Form />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-green-200">
        {/* Círculo com gradiente personalizado */}
        <div
          className="w-60 h-60 rounded-full animate-spin duration-9999"
          style={{
            background: "linear-gradient(to top right, rgb(144, 238, 144), rgb(0, 128, 0), rgb(0, 0, 255))",
          }}
        ></div>

        {/* Blur na metade inferior direita com cor personalizada */}
        <div
          className="absolute bottom-0 right-0 w-full h-1/2 backdrop-blur-lg"
          style={{
            backgroundColor: "rgba(93, 89, 86, 0.2)",
          }}
        ></div>
      </div>
    </div>
  );
}
