import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import { useState } from "react";
import "./style.css";
import Rebarba from "../../assets/Rebarba.png";
import Info from "../../assets/Information.png";
import Info2 from "../../assets/information2.png";
import { useToast } from "../../context/Toast/index";
import { Modal } from "react-bootstrap";

export default function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [etec, setEtec] = useState("099");
  const [rm, setRm] = useState();
  const { addToast } = useToast();
  const [password, setPassword] = useState();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Header/Chamados";
  const [show, setShow] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await signIn({ user: rm, password, etec });
      navigate(from, { replace: true });
    } catch (error) {
      addToast({
        title: "O.R. System",
        message: "Erro de Login",
        type: "danger",
      });
      setRm("");
      setPassword("");
      setEtec("");
    }
  };

  return (
    <div className="content">
      <button onClick={() => setShow(true)} className="pvlt">
        <img src={Info} alt="informação" className="seta" />
      </button>
      {show && (
        <Modal show={show} centered>
          <Modal.Body>
            <div>
              <div className="cabcaio">
                <span className="titheader">Primeira vez aqui?</span>
              </div>
            </div>
            <div className="divisor3"></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              <img
                src={Info2}
                alt="atenção"
                style={{
                  width: "100px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              />

              <p className="nmae">
                Sua senha, por padrão, será a sua data de nascimento escrita sem
                as barras("/").
                <br />
                <br />
                Exemplo:
                <br />
                Data de nascimento: 01/01/2005
                <br />
                Senha: 01012005
              </p>
            </div>
            <div className="divisor3"></div>
            <footer className="sbotord3">
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="sbot17"
              >
                Fechar
              </button>
            </footer>
          </Modal.Body>
        </Modal>
      )}
      <div className="teste250">
        <img src={Rebarba} alt="Login" className="rebarba" />
        <div className="signin">
          <div className="margem">
            <p className="logo3">O. R. System</p>
            <div className="divisor1"></div>
            <form className="formulario">
              <table>
                <tr>
                  <td className="codetectit">Código da Etec:</td>
                  <td>
                    <input
                      value={etec}
                      onChange={(evt) => setEtec(evt.target.value)}
                      placeholder="099"
                      className="codetec"
                      maxlength="3"
                    />
                  </td>
                </tr>
              </table>
              <div className="divisor2"></div>
              <table>
                <tr>
                  <td>RM:</td>
                  <td>
                    <input
                      value={rm}
                      onChange={(evt) => setRm(evt.target.value)}
                      placeholder="  Digite Aqui"
                      className="inputsign"
                      maxlength="6"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
                <tr>
                  <td>Senha:</td>
                  <td>
                    <input
                      value={password}
                      onChange={(evt) => setPassword(evt.target.value)}
                      placeholder="  Digite Aqui"
                      type="Password"
                      className="inputsign"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
              </table>
              <div className="sbotord">
                <Link as={Link} to="/novasenha" className="sbot1">
                  {" "}
                  Nova Senha
                </Link>
                <button onClick={handleSubmit} className="sbot2">
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
