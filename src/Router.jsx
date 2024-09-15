import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/Auth/index";
import React, { useState, useEffect } from "react";
import RequireAuth from "./components/RequireAuth/index";
import Main from "./pages/Main/index";
import Signin from "./pages/Signin/index";
import NovaSenha from "./pages/NovaSenha/index";
import RedefinicaoDeSenha from "./pages/RedefinicaoDeSenha/index";
import Chamados from "./pages/Chamados/index";
import Grafico from "./pages/Grafico/index";
import Setores from "./pages/Setores/index";
import Solicitacoes from "./pages/Solicitacoes/index";
import Registros from "./pages/Registros/index";
import Usuario from "./pages/Usuario/index";
import ConsultaUsuarios from "./pages/ConsultaUsuarios/index";
import ConsultaLocais from "./pages/ConsultaLocais/index";
import ConsultaChamados from "./pages/ConsultaChamados/index";
import SignUp from "./pages/CadastrarUsuarios/index";
import Layout from "./components/Layout/index";
import ContaAtivada from "./pages/ContaAtivada/index";
import { api } from "./utils/api";

export default function Router() {
  const { user, rm } = useAuth();
  const [data, setData] = useState([]);

  const [id] = useState(user?.usuario?.id);
  const [cod] = useState(rm?.conta?.usu_codverificacao);

  useEffect(() => {
    let url = `/usuarios?id=${id}`;

    const fetchData = async () => {
      try {
        const response = await api(url);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  //const cod = localStorage.getItem("usu_codverificacao");
  return (
    <>
      <Routes>
        <Route path="/Header" element={<Layout />}>
          <Route index element={<Chamados />} />
          <Route
            path="/Header/Chamados"
            element={<RequireAuth element={<Chamados />} />}
          />
          <Route
            path="/Header/Setores"
            element={<RequireAuth element={<Setores />} />}
          />
          <Route
            path="/Header/Usuario"
            element={<RequireAuth element={<Usuario />} />}
          />
          <Route
            path="/Header/Solicitacoes"
            element={<RequireAuth element={<Solicitacoes />} />}
          />
          <Route
            path="/Header/Registros"
            element={<RequireAuth element={<Registros />} />}
          />
          <Route
            path="/Header/CadastrarUsuario"
            element={<RequireAuth element={<SignUp />} />}
          />
          <Route
            path="/Header/Grafico"
            element={<RequireAuth element={<Grafico />} />}
          />
          <Route
            path="/Header/Consulta/Usuarios"
            element={<RequireAuth element={<ConsultaUsuarios />} />}
          />
          <Route
            path="/Header/Consulta/Chamados"
            element={<RequireAuth element={<ConsultaChamados />} />}
          />
          <Route
            path="/Header/Consulta/Locais"
            element={<RequireAuth element={<ConsultaLocais />} />}
          />
        </Route>
        <Route path="/" element={<Main />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/NovaSenha" element={<NovaSenha />} />
        {cod && (
          <Route
            path={`/RedefinicaoDeSenha/${cod}`}
            element={<RedefinicaoDeSenha />}
          />
        )}
        {user?.usuario?.id &&
          Array.isArray(data) &&
          data.map((element) => (
            <>
              <Route
                path={`/ContaAtivada/${element.usu_codverificacao}`}
                element={<RequireAuth element={<ContaAtivada />} />}
              />
            </>
          ))}
      </Routes>
    </>
  );
}
