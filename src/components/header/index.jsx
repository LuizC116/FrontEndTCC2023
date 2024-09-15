import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import logo from "../../assets/LogoSimplificadaPrt.png";
import "./styles.css";
import Perfil from "../perfil/index";
import FotoHeader from "../FotoHeader/index";
import SolicitacaoBotao from "../SolicitacaoBotao/index";
import AtivarConta from "../AtivarConta/index";
import exit from "../../assets/Exit.png";
import { api } from "../../utils/api";
import { useToast } from "../../context/Toast";

export default function Header() {
  const [menuAtivo, setMenuAtivo] = useState("nenhum");
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const [id] = useState(user?.usuario?.id);

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

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("/Header/Chamados")) {
      setMenuAtivo("chamado");
    } else if (pathname.includes("/Header/Grafico")) {
      setMenuAtivo("chamado");
    } else if (pathname.includes("/Header/Setores")) {
      setMenuAtivo("chamado");
    } else if (pathname.includes("/Header/Usuario")) {
      setMenuAtivo("usuario");
    } else if (pathname.includes("/Header/Consulta/Chamados")) {
      setMenuAtivo("consultas");
    } else if (pathname.includes("/Header/Consulta/Usuarios")) {
      setMenuAtivo("consultas");
    } else if (pathname.includes("/Header/Consulta/Locais")) {
      setMenuAtivo("consultas");
    } else if (pathname.includes("/Header/Solicitacoes")) {
      setMenuAtivo("requisitos");
    } else if (pathname.includes("/Header/Registros")) {
      setMenuAtivo("requisitos");
    } else if (pathname.includes("/Header/CadastrarUsuario")) {
      setMenuAtivo("requisitos");
    } else {
      setMenuAtivo("nenhum");
    }
  }, [location.pathname]);

  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar key={expand} expand={expand}>
          <Container fluid className="headerfixo">
            <Navbar.Brand className="logotipo">
              <img src={logo} alt="logotipo" className="logotipo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="offcanv"
            >
              <Offcanvas.Header
                closeButton
                closeVariant="black"
              ></Offcanvas.Header>
              <Offcanvas.Body>
                <Navbar.Collapse className="headesktp">
                  <Nav className="w-100  d-flex flex-column">
                    <div className="w-100 d-flex flex-row">
                      <div className="spac2"></div>
                      <Nav.Link
                        style={{
                          background:
                            menuAtivo === "chamado" ? "#596ad3" : "white",
                          color: menuAtivo === "chamado" ? "white" : "#707070",
                          marginLeft: "20px",
                          fontSize: "18px",
                          lineHeight: "18px",
                          textAlign: "center",
                          borderRadius: "60px",
                          width: "200px",
                        }}
                        as={Link}
                        to="/Header/Chamados"
                        onClick={() => setMenuAtivo("chamado")}
                      >
                        <span className="headcent">Chamados</span>
                      </Nav.Link>
                      <Nav.Link
                        style={{
                          background:
                            menuAtivo === "usuario" ? "#596ad3" : "white",
                          color: menuAtivo === "usuario" ? "white" : "#707070",
                          marginLeft: "20px",
                          fontSize: "18px",
                          lineHeight: "18px",
                          textAlign: "center",
                          borderRadius: "60px",
                          width: "200px",
                        }}
                        as={Link}
                        to="/Header/Usuario"
                        onClick={() => setMenuAtivo("usuario")}
                      >
                        Usuário
                      </Nav.Link>
                      {user?.usuario?.usu_nivel === "administrador" && (
                        <>
                          <Nav.Link
                            style={{
                              background:
                                menuAtivo === "requisitos"
                                  ? "#596ad3"
                                  : "white",
                              color:
                                menuAtivo === "requisitos"
                                  ? "white"
                                  : "#707070",
                              marginLeft: "20px",
                              fontSize: "18px",
                              lineHeight: "18px",
                              textAlign: "center",
                              borderRadius: "60px",
                              width: "200px",
                            }}
                            as={Link}
                            to="/Header/Solicitacoes"
                            onClick={() => setMenuAtivo("requisitos")}
                          >
                            Requisitos
                          </Nav.Link>
                        </>
                      )}
                    </div>
                    <div className="link2">
                      {menuAtivo === "chamado" && (
                        <>
                          <Nav.Link
                            as={Link}
                            to="/Header/Chamados"
                            className="headitem2"
                          >
                            Todos
                          </Nav.Link>
                          <Nav.Link
                            as={Link}
                            to="/Header/Grafico"
                            className="headitem2"
                          >
                            Gráfico
                          </Nav.Link>
                          {user?.usuario?.usu_nivel === "administrador" && (
                            <>
                              <Nav.Link
                                as={Link}
                                to="/Header/Setores"
                                className="headitem2"
                              >
                                Setores
                              </Nav.Link>
                            </>
                          )}
                        </>
                      )}

                      {menuAtivo === "requisitos" && (
                        <>
                          <Nav.Link
                            as={Link}
                            to="/Header/Solicitacoes"
                            className="headitem2"
                          >
                            Solicitações
                          </Nav.Link>
                          <Nav.Link
                            as={Link}
                            to="/Header/Registros"
                            className="headitem2"
                          >
                            Registros
                          </Nav.Link>
                          <Nav.Link
                            as={Link}
                            to="/Header/CadastrarUsuario"
                            className="headitem2"
                          >
                            Usuários
                          </Nav.Link>
                        </>
                      )}
                    </div>
                  </Nav>
                  <Navbar.Brand>
                    {user?.usuario?.id ? (
                      <>
                        {" "}
                        <Perfil />
                      </>
                    ) : (
                      <Navbar.Brand className="nomeusu">
                        <span className="mdvis">Modo Visitante</span>
                        <button
                          onClick={() => navigate("/signin")}
                          className="botaoheadsig"
                        >
                          {" "}
                          Entrar{" "}
                        </button>
                      </Navbar.Brand>
                    )}
                  </Navbar.Brand>
                </Navbar.Collapse>
                {user?.usuario?.id ? (
                  <>
                    <div className="headmobile2">
                      <div className="subperfmobil">
                        <FotoHeader />
                        <div className="ordflexmobil">
                          <div className="ordflexmobil2">
                            {user?.usuario?.id && (
                              <>
                                {user?.usuario?.usu_nivel ===
                                "administrador" ? (
                                  <span className="cargmobil">
                                    Administrador
                                  </span>
                                ) : (
                                  <span className="cargmobil">
                                    {user?.usuario.usu_cargo}
                                  </span>
                                )}
                              </>
                            )}

                            <span className="emamobil">
                              {user?.usuario.usu_email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {user?.usuario?.id && (
                          <>
                            {Array.isArray(data) &&
                              data.map((element, index) => {
                                return element.usu_nivel === "usuário" &&
                                  element.usu_cadastroativo === true ? (
                                  <SolicitacaoBotao
                                    data={element}
                                    key={index}
                                  />
                                ) : null;
                              })}
                          </>
                        )}
                        {user?.usuario?.id && (
                          <>
                            {Array.isArray(data) &&
                              data.map((element, index) => {
                                return element.usu_cadastroativo === false ? (
                                  <AtivarConta data={element} key={index} />
                                ) : (
                                  <></>
                                );
                              })}
                          </>
                        )}
                        <button onClick={signOut} className="botheadmobil">
                          <img src={exit} alt="desconectar" className="exit" />
                          Desconectar{" "}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="headmobile">
                    <Navbar.Brand className="nomeusu">
                      <span className="mdvis">Modo Visitante</span>
                      <button
                        onClick={() => navigate("/signin")}
                        className="botaoheadsigmb"
                      >
                        {" "}
                        Entrar{" "}
                      </button>
                    </Navbar.Brand>
                  </div>
                )}
                <Nav className="me-auto my-2 my-lg-0">
                  <div className="headmobile">
                    <NavDropdown
                      title={<span>Chamados</span>}
                      className="dropdownmobil"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/Header/Chamados"
                        className="dropit"
                      >
                        Todos
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/Header/Grafico"
                        className="dropit"
                      >
                        Gráfico
                      </NavDropdown.Item>
                      {user?.usuario?.usu_nivel === "administrador" && (
                        <>
                          <NavDropdown.Item
                            as={Link}
                            to="/Header/Setores"
                            className="dropit"
                          >
                            Setores
                          </NavDropdown.Item>
                        </>
                      )}
                    </NavDropdown>
                    <Nav.Link
                      as={Link}
                      to="/Header/Usuario"
                      className="linkmobi"
                    >
                      Usuário
                    </Nav.Link>
                    {user?.usuario?.usu_nivel === "administrador" && (
                      <>
                        <NavDropdown
                          title={<span>Requisitos </span>}
                          className="dropdownmobil"
                        >
                          <NavDropdown.Item
                            as={Link}
                            to="/Header/Solicitacoes"
                            className="dropit"
                          >
                            Solicitações
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            as={Link}
                            to="/Header/Registros"
                            className="dropit"
                          >
                            Registros
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            as={Link}
                            to="/Header/CadastrarUsuario"
                            className="dropit"
                          >
                            Usuários
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    )}
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
