import { Lock } from "lucide-react";

function LoginDenied() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <Lock size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Acesso Negado</h1>
        <p className="text-gray-600 mt-2">Você não tem permissão para acessar esta página.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
          <a href="/">Voltar</a>
        </button>
      </div>
    </div>
  );
}

export default LoginDenied;