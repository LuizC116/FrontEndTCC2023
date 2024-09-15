import "./styles.css";
import SolicitacaoCard from "../../components/SolicitacaoCard/index";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";
import { useEffect } from "react";

export default function Solicitacoes() {
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
        <h1 className="titl">Solicitações de Administrador</h1>
        <div className="divisor3"></div>
        <div className="ordenador">
          <SolicitacaoCard />
        </div>
      </div>
    </div>
  );
}
