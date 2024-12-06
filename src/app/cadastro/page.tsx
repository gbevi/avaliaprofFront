"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const endpoint = "http://localhost:3001/users"; 

    try {
      const payload = {
        name,
        department,
        course,
        email,
        password,
      };

      console.log("Payload enviado:", payload);

      await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro na solicitação Axios:",
          error.response?.data || error.message
        );
        console.error("Status HTTP:", error.response?.status);
      } else {
        console.error("Erro desconhecido:", error);
      }
      alert("Falha ao criar conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-100">
      {/* Seção do Formulário */}
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-6 py-10 rounded-2xl border border-gray-200 shadow-md w-full max-w-sm">
          <h1 className="text-3xl font-semibold text-center">Criar Conta</h1>
          <p className="font-medium text-sm text-gray-500 mt-2 text-center">
            Preencha os campos abaixo:
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Campo Nome */}
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                name="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                required
              />
            </div>
            {/* Campo Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                required
              />
            </div>

            {/* Campo Curso */}
            <div>
              <label className="text-sm font-medium">Curso</label>
              <input
                type="text"
                name="course"
                placeholder="Digite seu curso"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                required
              />
            </div>

            {/* Campo Departamento */}
            <div>
              <label className="text-sm font-medium">Departamento</label>
              <input
                type="text"
                name="department"
                placeholder="Digite seu departamento"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label className="text-sm font-medium">Senha</label>
              <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                required
              />
            </div>

            {/* Botão de Registrar */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar"}
              </button>
            </div>

            {/* Link para login */}
            <div className="mt-4 flex justify-center items-center">
              <p className="text-sm">Já possui conta?</p>
              <button
                onClick={goToLogin}
                className="text-green-500 text-sm font-medium ml-2 hover:underline"
              >
                Fazer Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Seção Direita - Gradiente e Imagem */}
      <div className="hidden lg:flex h-full w-full lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-green-400">
      <button
          className="active:scale-90 hover:scale-100"
          onClick={() => router.push('/')}
        >
        <Image
          src="/images/unblogo.png"
          alt="Logo da Universidade"
          width={150}
          height={150}
          className="mb-4"
        />
        </button>
        <p className="text-black text-sm font-bold text-center">
          Avaliação de Professores
        </p>
      </div>
    </div>
  );
}
