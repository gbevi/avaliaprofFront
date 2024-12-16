"use client"
import Image from "next/image";
import { useRouter } from "next/navigation"; // Para navegação
import UnB from "../../../public/images/UnB.png";
import notificacao from "../../../public/images/notificacao.svg";
import exit from "../../../public/images/exit.svg";

export default function HeaderLogado() {
  const router = useRouter();

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

        {/* Botão para o perfil */}
        <button
          className="active:scale-90 hover:scale-100 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={goToProfile}
        >
          Perfil
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