import "./styles.css";
import SetComum from "../../components/SetoresComponents/SetComum/index";
import SetComputador from "../../components/SetoresComponents/SetComputador/index";
import SetEletrico from "../../components/SetoresComponents/SetEletrico/index";
import SetEncanacao from "../../components/SetoresComponents/SetEncanacao/index";
import SetPeriferico from "../../components/SetoresComponents/SetPeriferico/index";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";
import { useEffect } from "react";

export default function Setores() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (user?.usuario?.usu_nivel === "usuário") {
      navigate("/Header/Chamados");
      addToast({
        title: "O. R. System",
        message: "Você não possuí permissão para acessar essa página.",
        type: "warning"
      });
    }
  }, [navigate]);

  return (
    <div className="wrapper">
      <div className="mx-auto mt-3 mb-3 card text">
        <h1 className="titl">Setores</h1>
        <div className="divisor3"></div>
        <div className="contentquery"></div>
        <div className="caixasetores">
          <details className="setcompcor1">
            <summary className="setcompcor2">
              Manutenção de Áreas Comuns
            </summary>
            <div className="ovf">
              <SetComum />
            </div>
          </details>
          <details className="setcompcor3">
            <summary className="setcompcor4">
              Manutenção de Computadores
            </summary>
            <div className="ovf">
              <SetComputador />
            </div>
          </details>
          <details className="setcompcor5">
            <summary className="setcompcor6">Manutenção de Periféricos</summary>
            <div className="ovf">
              <SetPeriferico />
            </div>
          </details>
          <details className="setcompcor7">
            <summary className="setcompcor8">Manutenção Elétrica</summary>
            <div className="ovf">
              <SetEletrico />
            </div>
          </details>
          <details className="setcompcor9">
            <summary className="setcompcor10">
              Manutenção de Encanamento
            </summary>
            <div className="ovf">
              <SetEncanacao />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
