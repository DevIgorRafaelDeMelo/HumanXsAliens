import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import img from "../Img/Guerra.jpeg";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("rafaelmelo765@gmail.com");
  const [password, setPassword] = useState("2289Nnly");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useUser(); // Usa a função login do contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const endpoint = isLogin
      ? "http://localhost:5000/auth/login"
      : "http://localhost:5000/auth/register";

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isLogin ? "Login realizado com sucesso!" : "Cadastro concluído!");

        // Salva os dados do usuário e o token no contexto e localStorage
        login(data.user, data.token);

        // Redireciona para a home
        navigate("/lobby");
      } else {
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <div className="flex h-screen grid-rows-[1fr_auto] ">
        <div
          className="flex bg-black h-[100vh] w-[50%] "
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        ></div>
        <div className="flex justify-center ps-10 bg-gray-100 items-center bg-white-800 w-[50%]">
          <div className="bg-white p-8 rounded shadow-md w-[40%] ">
            <h2 className="text-2xl text-primary font-bold mb-4 text-center">
              {isLogin ? "Login" : "Cadastro"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              <button
                type="submit"
                className="w-full bg-primary text-white p-2 rounded"
              >
                {isLogin ? "Entrar" : "Cadastrar"}
              </button>
            </form>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-gray-900 text-sm"
            >
              {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthScreen;
