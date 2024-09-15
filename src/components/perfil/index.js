import React, { useState, useEffect } from "react";
import { api, baseURL } from "../../utils/api";
import "./styles.css";
import { useAuth } from "../../context/Auth/index";
import exit from "../../assets/Exit.png";
import SolicitacaoBotao from "../SolicitacaoBotao/index";
import AtivarConta from "../AtivarConta/index";
import { useToast } from "../../context/Toast";

export default function PerfilUsuario() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  const [id] = useState(user?.usuario.id);
  useEffect(() => {
    let url = `/usuarios?id=${id}`;

    const fetchData = async () => {
      try {
        const response = await api(url);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        addToast({
          title: "O. R. System",
          message: `Erro ao buscar dados: ${error.message}`,
          type: "danger",
        });
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {Array.isArray(data) &&
        data.map((element, index) => (
          <div key={index} className="user-card">
            <button onClick={() => setShow(true)} className="botaoperf">
              {user?.usuario?.id && (
                <>
                  {user?.usuario?.usu_nivel === "administrador" ? (
                    <span className="cargomobil">Administrador</span>
                  ) : (
                    <span className="cargmobil">{user?.usuario.usu_cargo}</span>
                  )}
                </>
              )}

              <img
                src={`${baseURL}/files/${element.usu_foto}`}
                alt="foto de perfil"
                className="fperfil1"
              />
            </button>

            {show && (
              <section className="subperf">
                <main>
                  <div className="spacdrop">
                    <img
                      src={`${baseURL}/files/${element.usu_foto}`}
                      alt="foto de perfil"
                      className="fperfil2"
                    />
                    <div className="ordflex">
                      <span className="ordfunc">
                        {user?.usuario?.id && (
                          <>
                            {user?.usuario?.usu_nivel === "administrador" ? (
                              <span className="cargomobil">Administrador</span>
                            ) : (
                              <span className="cargmobil">
                                {user?.usuario.usu_cargo}
                              </span>
                            )}
                          </>
                        )}
                        <button
                          className="botaoclose"
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          ×
                        </button>
                      </span>
                      <div className="ordemail">{element.usu_email}</div>
                    </div>
                  </div>
                  <div className="spacbotao2">
                    {user?.usuario?.id && (
                      <>
                        {data.map((element, index) => {
                          return element.usu_nivel === "usuário" &&
                            element.usu_cadastroativo === true ? (
                            <SolicitacaoBotao data={element} key={index} />
                          ) : null;
                        })}
                      </>
                    )}
                    {user?.usuario?.id && (
                      <>
                        {data.map((element, index) => {
                          return element.usu_cadastroativo === false ? (
                            <AtivarConta data={element} key={index} />
                          ) : (
                            <></>
                          );
                        })}
                      </>
                    )}
                    <button onClick={signOut} className="botaohead">
                      <img src={exit} alt="desconectar" className="exit" />
                      Desconectar
                    </button>
                  </div>
                </main>
              </section>
            )}
          </div>
        ))}
    </>
  );
}
