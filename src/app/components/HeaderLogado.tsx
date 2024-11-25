import Image from 'next/image';
import UnB from "../../../public/images/UnB.png"; 
import notificacao from "../../../public/images/notificacao.svg";
import dog from "../../../public/images/dog.png";
import exit from "../../../public/images/exit.svg";

export default function HeaderLogado() {
    return (
        <nav className="bg-green-300 flex items-center justify-between px-6 py-3">
            <div className="flex items-center">
            <Image
                src={UnB}
                alt="Logo"
                width={65}
                height={65}
                className="mr-4"
            />
            </div>
            <div className="flex items-center space-x-4">
            <button className='active:scale-90 hover:scale-100'>
                <Image
                src={notificacao}
                alt="Notificação"
                width={30}
                height={30}
                />
            </button>
            <button className='active:scale-90 hover:scale-100'>
                <Image
                src={dog}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
                />
            </button>
            <button className='active:scale-90 hover:scale-100'>
                <Image
                src={exit}
                alt="Sair"
                width={30}
                height={30}
                />
            </button>
            </div>
        </nav>
    );
}
