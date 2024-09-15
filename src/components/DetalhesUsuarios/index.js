import { useState } from "react";
import "./styles.css";
import { Modal } from "react-bootstrap";
import { baseURL } from "../../utils/api";

export default function DetalhesUsuarios({ data, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)} className="sbot12">
        Detalhes⨠
      </button>
      {show && (
        <Modal show={show} centered>
          <Modal.Body>
            <div className="scale">
              <header>
                <span className="titheader">Detalhes de {data.usu_nome} </span>
              </header>
              <div className="divisor3"></div>
              <main className="ladoa">
                <img
                  src={`${baseURL}/files/${data.usu_foto}`}
                  alt="foto"
                  className="foto"
                />
                <div className="ladflexusu">
                  <span className="dstq">Id</span>
                  <span>{data.id}</span>
                  <span className="impb">Nome</span>
                  <span className="imp">{data.usu_nome}</span>
                  <span className="dstq">E-mail</span>
                  <span>{data.usu_email}</span>
                  <span className="impb">Código da Etec</span>
                  <span className="imp">{data.usu_codigoetec}</span>
                  <span className="dstq">Código RM</span>
                  <span>{data.usu_rmcodigo}</span>
                  <span className="impb">Cargo</span>
                  <span className="imp">{data.usu_cargo}</span>
                  <span className="dstq">Cadastro Ativo</span>
                  <span className="nm">
                    <div
                      style={{
                        width: "10%",
                        height: "100%",
                        borderRadius: "25%",
                        margin: "auto",
                        background:
                          data.usu_cadastroativo === true ? "green" : "red"
                      }}
                    ></div>
                  </span>
                  <span className="impb">Nível</span>
                  <span className="imp">{data.usu_nivel}</span>
                  <span className="dstq">Cód. de Verificação</span>
                  <span>{data.usu_codverificacao}</span>
                  <span className="impb">Data de envio de solicitação</span>
                  <span className="imp">
                    {" "}
                    {new Date(data.usu_solenviada).toLocaleString("pt-BR")}
                  </span>
                  <span className="dstq">Status de Solicitação</span>
                  <span>
                    <div
                      style={{
                        width: "10%",
                        height: "100%",
                        borderRadius: "25%",
                        margin: "auto",
                        background: data.usu_solativo === true ? "green" : "red"
                      }}
                    ></div>
                  </span>
                  <span className="impb">Data de Criação</span>
                  <span className="imp">
                    {new Date(data.created_at).toLocaleString("pt-BR")}
                  </span>
                  <span className="dstq">Última alteração</span>
                  <span>
                    {new Date(data.updated_at).toLocaleString("pt-BR")}
                  </span>
                </div>
              </main>
              <div className="divisor3"></div>
              <footer className="foot">
                <button
                  onClick={() => {
                    setShow(false);
                  }}
                  className="sbot7"
                >
                  Fechar
                </button>
              </footer>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
