"use client";
import Image from 'next/image';
import UnBlogo from "public/unblogo.png";

export default function Feedlogado() {
    return (  
        <div>
            <nav className="bg-green-400 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center p-1">
                <a href="k" className="flex items-center">
                    <Image
                    src={UnBlogo}
                    alt="UnB Logo"
                    width={40}
                    height={40}
                    className="un-margem"
                    />
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <a href="#" className="notificação">
                    <Image
                        src="https://static.vecteezy.com/ti/vetor-gratis/t2/1505138-icone-de-sino-de-notificacao-vetor.jpg"
                        alt="Notification"
                        width={64}
                        height={64}
                        className="notify-margem rounded-full"
                    />
                    </a>
                    <a href="#" className="exit">
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828304.png"
                        alt="Exit"
                        width={64}
                        height={64}
                        className="rounded-full absolute top-0 right-0"
                    />
                    </a>
                </div>
                </div>
            </nav>

            <div className="search-container w-11 h-11 buscar">
                <input
                type="text"
                className="search-bar rounded-full"
                placeholder="Buscar..."
                />
                <button className="search-button">Busca</button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px', marginRight: '850px' }}>
                <h2 style={{ fontSize: '30px', color: '#000000' }}>Novos Professores</h2>
            </div>

            <div className="image-1p">
                <Image
                src="https://img.freepik.com/fotos-gratis/fundo-branco_23-2147730801.jpg?semt=ais_hybrid"
                alt="Professor"
                width={200}
                height={250}
                className="rounded-md imagens"
                />
                <p className="image-text">Nome</p>
                <p className="image-text_description">Disciplina</p>
            </div>

            <div className="image-1px">
                <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA29DH8w3vIB9-nSk49CzuBKauux73s6Ve3Q&s"
                alt="Perfil"
                width={150}
                height={150}
                className="rounded-md perfis"
                />
            </div>

            <div style={{ textAlign: 'center', marginTop: '100px', marginRight: '920px' }}>
                <h2 style={{ fontSize: '30px', color: '#000000' }}>Professores</h2>
            </div>

            <div className="img_linha">
                <div style={{ position: 'absolute', marginLeft: '800px', marginTop: '80px' }}>
                <button className="btn-publicacao">Novas Publicações</button>
                <button className="btn-ordenar">Ordenar</button>
                </div>
            </div>
        </div>
    );
};