import { createContext, useContext, useState } from "react";
import { api } from "../../utils/api";
import { useToast } from "../Toast/index";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("@orsystem:token");
    const usuario = localStorage.getItem("@orsystem:usuario");

    if (token && usuario) return { token, usuario: JSON.parse(usuario) };

    return {};
  });
  const [rm, setRm] = useState(() => {
    const token = localStorage.getItem("@orsystem:token");
    const conta = localStorage.getItem("@orsystem:conta");
    if (token && conta) return { token, conta: JSON.parse(conta) };

    return {};
  });

  const signIn = async ({ user, password, etec }) => {
    try {
      const page = await api("/auth", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          usu_rmcodigo: user,
          usu_senha: password,
          usu_codigoetec: etec
        })
      });

      if (parseInt(page.status, 10) !== 200)
        addToast({
          title: "O.R. System",
          message: `Erro de servidor: ${(await page.json()).error}`,
          type: "danger"
        });

      const data = await page.json();
      const { usuario, token } = data;

      localStorage.setItem("@orsystem:token", token);
      localStorage.setItem("@orsystem:usuario", JSON.stringify(usuario));

      setUser({ token, usuario });
    } catch (error) {
      addToast({
        title: "O.R. System",
        message: `Erro de servidor: ${error.message}`,
        type: "danger"
      });
    }
  };

  const rmSignIn = async ({ rm }) => {
    try {
      const page = await api("/newpassword", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          usu_rmcodigo: rm
        })
      });

      if (parseInt(page.status, 10) !== 200)
        addToast({
          title: "O.R. System",
          message: `Erro de servidor: ${(await page.json()).error}`,
          type: "danger"
        });

      const data = await page.json();
      const { conta, token } = data;

      localStorage.setItem("@orsystem:token", token);
      localStorage.setItem("@orsystem:conta", JSON.stringify(conta));
      setRm({ token, conta });
      console.log("Conta salva no localStorage:", JSON.stringify(conta));
      console.log("Conta obtida do localStorage:", conta);

      addToast({
        title: "O. R. System",
        message: "Verifique seu E-mail.",
        type: "info"
      });
    } catch (error) {
      addToast({
        title: "O.R. System",
        message: `Erro de servidor: ${error.message}`,
        type: "danger"
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("@orsystem:token");
    localStorage.removeItem("@orsystem:usuario");
    setUser({});
    navigate("/");
  };

  const signOutRm = () => {
    localStorage.removeItem("@orsystem:token");
    localStorage.removeItem("@orsystem:conta");
    setRm({});
  };

  return (
    <>
      <AuthContext.Provider
        value={{ user, rm, signIn, signOut, signOutRm, rmSignIn }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within AuthProvider");
  return authContext;
}
