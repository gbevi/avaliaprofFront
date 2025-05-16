"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"; // Para navegação
import UnB from "../../../public/images/UnB.png";
import notificacao from "../../../public/images/notificacao.svg";
import exit from "../../../public/images/exit.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function HeaderLogado() {
  const router = useRouter();
   const [profile, setProfilePhoto] = useState<string | null>(null);
   const token = localStorage.getItem("token");

   let id: string | undefined = undefined;
   if (token) {
     const decoded: { sub?: string } = jwtDecode(token);
     id = decoded.sub;
   }

  useEffect(() => {
    console.log("HeaderLogado montado");
    const fetchProfilePhoto = async () => {
      try {
        console.log("token:", token, "id:", id);
        if (!token || !id) return;

        const response = await axios.get(`http://localhost:3001/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Buscando perfil do usuário...");
        console.log(response.data)
        setProfilePhoto(response.data.photo); 
      } catch(err) {
        console.error("Erro ao buscar foto do perfil:", err);
        setProfilePhoto(null);
      }
    };

    fetchProfilePhoto();
  }, [id, token]);

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("token"); 
      router.push("/login"); 
    }
  };
 
  const goToProfile = () => {
    router.push("/perfil"); 
  };

  const goToFeed = () => {
    router.push("/feed")
  }
  const goToNotifications = () => {
    alert("Notificações em breve!"); 
  };

  return (
    <nav className="bg-green-300 flex items-center justify-between px-6 py-3">
      {/* Logo da UnB */}
      <div className="flex items-center">
        <button
          className="active:scale-90 hover:scale-100"
          onClick={goToFeed}
        >
          <Image src={UnB} alt="Logo" width={65} height={65} className="mr-4" />
        </button>
      </div>

      {/* Botões de navegação */}
      <div className="flex items-center space-x-4">
        {/* Botão de notificações */}
        <button
          className="active:scale-90 hover:scale-100"
          onClick={goToNotifications}
        >
          <Image src={notificacao} alt="Notificação" width={30} height={30} />
        </button>

        {/* Foto do usuário como botão para o perfil */}
  <button
    className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
    onClick={goToProfile}
    title="Ir para o perfil"
  >
    {profile ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/jpeg;base64,${profile}`}
              alt="Foto do perfil"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-3xl">👤</span>
          )}
  </button>

        {/* Botão de logout */}
        <button
          className="active:scale-90 hover:scale-100"
          onClick={handleLogout}
        >
          <Image src={exit} alt="Sair" width={30} height={30} />
        </button>
      </div>
    </nav>
  );
}