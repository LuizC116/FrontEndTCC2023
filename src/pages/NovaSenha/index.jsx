import "./style.css";
import React, { useState } from "react";
import Rebarba from "../../assets/Rebarba.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast/index";

export default function NovaSenha() {
  const [codigorm, setCodigorm] = useState("");
  const { rmSignIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await rmSignIn({ rm: codigorm });
      setCodigorm("");
    } catch (error) {
      addToast({
        title: "O.R. System",
        message: "Erro de Autenticação",
        type: "danger"
      });
      setCodigorm("");
    }
  };

  return (
    <div className="content">
      <div className="teste250">
        <img src={Rebarba} alt="Login" className="rebarba" />
        <div className="solct">
          <div className="margem">
            <p className="logo3">O.R. System</p>
            <div className="divisor1"></div>
            <form className="formulario">
              <p className="texts"> Solicitar Nova Senha</p>
              <div className="divisor2"></div>
              <table>
                <tr>
                  <td>RM:</td>
                  <td>
                    <input
                      value={codigorm}
                      onChange={(evt) => setCodigorm(evt.target.value)}
                      placeholder="  Digite Aqui"
                      className="inputsign"
                      maxLength="5"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="pad2"></td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
              </table>
              <div className="sbotord">
                <Link as={Link} to="/signin" className="sbot1">
                  Voltar
                </Link>
                <button onClick={handleSubmit} className="sbot2">
                  Solicitar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
