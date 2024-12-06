"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import HeaderLogado from "../components/HeaderLogado";

interface Profile {
  name: string;
  email: string;
  course: string;
  department: string;
  avatar?: string;
}

export default function Perfil() {
  const [profile, setProfile] = useState<Profile | null>(null); // Estado do perfil
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const router = useRouter(); // Para redirecionamento

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Obtenha o token do localStorage

      if (!token) {
        router.push("/login"); // Redirecione para o login se não houver token
        return;
      }

      try {
        // Decodifique o token para obter o ID do usuário
        const decoded: { sub?: string } = jwtDecode(token); // Use o campo "sub" do JWT
        const userId = decoded.sub;

        if (!userId) {
          throw new Error("ID do usuário (sub) não encontrado no token.");
        }

        // Faça a requisição para buscar os dados do usuário
        const response = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data); // Atualize o estado do perfil
      } catch (error) {
        console.error("Erro ao carregar o perfil:", error);
        localStorage.removeItem("token"); // Remove o token inválido
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p>Erro ao carregar o perfil. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderLogado />
      <div className="flex justify-center items-start pt-24">
        <main className="bg-white w-11/12 max-w-4xl p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
    
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
              <p className="text-gray-600">{profile.course} / {profile.department}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 bg-green-300 rounded-lg shadow-md hover:bg-green-400">
              Editar Perfil
            </button>
            <button className="px-4 py-2 bg-red-300 rounded-lg shadow-md hover:bg-red-400">
              Excluir Perfil
            </button>
          </div>
          {/* Seção de Publicações */}
          <section className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Publicações</h3>
            <div className="mt-4 space-y-4">
              <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">teste - 17/04/2024, às 21:42</p>
                  <span className="text-gray-600">João Frango - Surf</span>
                </div>
                <p className="mt-2 text-gray-700">
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                  in a piece of classical Latin literature from 45 BC, making it over 2000 years
                  old.
                </p>
                <div className="mt-4 flex items-center justify-between text-gray-600">
                  <p>2 comentários</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
