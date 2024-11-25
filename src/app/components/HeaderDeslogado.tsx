import Image from 'next/image';
import UnB from "../../../public/images/UnB.png"; 

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
            <button className="bg-blue-500 text-white font-Questrial px-4 py-2 rounded-md shadow hover:bg-blue-600 active:scale-90 hover:scale-100">
               Login
            </button>
            </div>
        </nav>
    );
}
