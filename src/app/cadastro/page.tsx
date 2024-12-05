"use client";

import Image from "next/image";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";

export default function Register() {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    departamento: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
  });

  const handleSubmit = async (values: {
    nome: string;
    departamento: string;
    curso: string;
    email: string;
    senha: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        nome: values.nome,
        departamento: values.departamento,
        curso: values.curso,
        email: values.email,
        senha: values.senha,
      });

      console.log(response.data);
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

          <Formik
            initialValues={{
              nome: "",
              departamento: "",
              curso: "",
              email: "",
              senha: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            <Form className="mt-6 space-y-4">
              {/* Campo Nome */}
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Field
                  name="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                />
                <ErrorMessage
                  name="nome"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Campo Departamento */}
              <div>
                <label className="text-sm font-medium">Departamento</label>
                <Field
                  name="departamento"
                  type="text"
                  placeholder="Digite seu departamento"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                />
                <ErrorMessage
                  name="departamento"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Campo Curso */}
              <div>
                <label className="text-sm font-medium">Curso</label>
                <Field
                  name="curso"
                  type="text"
                  placeholder="Digite seu curso"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                />
                <ErrorMessage
                  name="curso"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Campo Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Campo Senha */}
              <div>
                <label className="text-sm font-medium">Senha</label>
                <Field
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-1 bg-transparent text-sm"
                />
                <ErrorMessage
                  name="senha"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Botão de Registrar */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition"
                >
                  Registrar
                </button>
              </div>

              {/* Link para login */}
              <div className="mt-4 flex justify-center items-center">
                <p className="text-sm">Já possui conta?</p>
                <button
                  onClick={() => router.push("/login")}
                  className="text-green-500 text-sm font-medium ml-2 hover:underline"
                >
                  Fazer Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      {/* Seção Direita - Gradiente e Imagem */}
      <div className="hidden lg:flex h-full w-full lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-green-400">
        <Image
          src="/images/unblogo.png"
          alt="Logo da Universidade"
          width={150}
          height={150}
          className="mb-4"
        />
        <p className="text-black text-sm font-bold text-center">
          Avaliação de Professores
        </p>
      </div>
    </div>
  );
}
