import * as React from 'react';

export default function Form() {
    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
            <h1 className="text-5xl font semibold">Avaliação de Professores</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Cadastre seus Dados:</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Digite seu Email"
                        type="email"
                    />
                </div>
                <div>
                    <label className="text-lg font-medium">Senha</label>
                    <input
                        className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                        placeholder="Digite sua senha"
                        type="password"
                    />
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <input
                            type="checkbox"
                            id='remember'
                        />
                        <label className="ml-2 font-medium text-base" htmlFor="remember">Lembre de mim</label>
                    </div>
                    <button className="font-medium text-base text-green-500">Esqueci a Senha</button>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-green-500 text-white text-lg font-bold">Entrar</button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Não possui conta?</p>
                    <button className="text-green-500 text-base font-medium ml-2">Criar Conta</button>
                </div>
            </div>
        </div>
    );
}
