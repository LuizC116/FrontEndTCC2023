import "./style.css";
import NovoChamado from "../../components/NovoChamado";
import CadastrarLocais from "../../components/CadastrarLocais";
import ChamadosCardP from "../../components/ChamadosCardP";
import ChamadosCardA from "../../components/ChamadosCardA";
import ChamadosCardC from "../../components/ChamadosCardC";
import ChamadosCardR from "../../components/ChamadosCardR";
import ChamadosCardPMb from "../../components/ChamadosCardPMb";
import ChamadosCardAMb from "../../components/ChamadosCardAMb";
import ChamadosCardCMb from "../../components/ChamadosCardCMb";
import { useAuth } from "../../context/Auth/index";
import { useEffect } from "react";
import { useToast } from "../../context/Toast";

export default function Chamados() {
  const { addToast } = useToast();
  const { user } = useAuth();
  useEffect(() => {
    if (user?.usuario?.usu_cadastroativo === false) {
      addToast({
        title: "O. R. System",
        message:
          "Sua conta não está ativa. Por favor ative-a para acessar todos os recursos do sistema.",
        type: "danger"
      });
    }
  }, [user]);
  return (
    <div className="Fundo">
      {user?.usuario?.id && user?.usuario.usu_cadastroativo === true ? (
        <>
          {user?.usuario?.usu_nivel === "administrador" && <CadastrarLocais />}
          <NovoChamado />
        </>
      ) : (
        <></>
      )}
      <div className="teste450">
        <div className="divchdsk">
          <div className="divchamado">
            <div className="coln">
              <div className="divtitp">
                <span>Pendentes</span>
              </div>
              <div className="crop">
                <div className="fundoch">
                  <ChamadosCardP />
                </div>
              </div>
            </div>
            <div className="coln">
              <div className="divtita">
                <span>Em Andamento</span>
              </div>
              <div className="crop">
                <div className="fundoch">
                  <ChamadosCardA />
                </div>
              </div>
            </div>
            <div className="coln">
              <div className="divtitc">
                <span>Concluídos</span>
              </div>
              <div className="crop">
                <div className="fundoch">
                  <ChamadosCardC />
                </div>
              </div>
            </div>
            <div className="coln">
              <div className="divtit2">
                <span>Pedidos Recentes</span>
              </div>
              <div className="crop">
                <div className="fundoch2">
                  <ChamadosCardR />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="escdivmb">
          <div className="divchmbl1">
            <div className="colmbl">
              <div className="titmblp">Pendente</div>
              <div className="cropmb">
                <div className="fundochmb">
                  <ChamadosCardPMb />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="divchmbl2">
            <div className="colmbl">
              <div className="titmbla">Em Andamento</div>
              <div className="cropmb">
                <div className="fundochmb">
                  {" "}
                  <ChamadosCardAMb />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="divchmbl2">
            <div className="colmbl">
              <div className="titmblc">Concluídos</div>
              <div className="cropmb">
                <div className="fundochmb">
                  <ChamadosCardCMb />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
