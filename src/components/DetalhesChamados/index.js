import { useState } from "react";
import "./styles.css";
import { Carousel, Modal } from "react-bootstrap";
import { baseURL } from "../../utils/api";

export default function DetalhesChamados({ data, ...rest }) {
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
                <span className="titheader">Detalhes do Chamado {data.id}</span>
              </header>
              <div className="divisor3"></div>
              <div>
                <Carousel className="carosselcham">
                  <Carousel.Item>
                    <img
                      className="fotochamadofit2"
                      src={`${baseURL}/files/${data.cha_foto1}`}
                      alt="fotochamado"
                    />
                  </Carousel.Item>
                  {data.cha_foto2 ? (
                    <Carousel.Item>
                      <img
                        className="fotochamadofit2"
                        src={`${baseURL}/${data.cha_foto2}`}
                        alt="fotochamado"
                      />
                    </Carousel.Item>
                  ) : null}
                  {data.cha_foto3 && data.cha_foto3 !== "" ? (
                    <Carousel.Item>
                      <img
                        className="fotochamadofit2"
                        src={`${baseURL}/files/${data.cha_foto3}`}
                        alt="fotochamado"
                      />
                    </Carousel.Item>
                  ) : null}
                </Carousel>
              </div>
              <main className="ladoa">
                <div className="ladflexcha">
                  <span className="dstq">Id</span>
                  <span>{data.id}</span>
                  <span className="impb">Pedido</span>
                  <span className="imp">{data.cha_pedido}</span>
                  <span className="dstq">Id de Usuário</span>
                  <span>{data.usuarios_id}</span>
                  <span className="impb">Setor</span>
                  <span
                    style={{
                      borderRadius: "5px",
                      color: "white",
                      textTransform: "capitalize",
                      background:
                        data.cha_setor === "manutenção de computadores"
                          ? "#5a88cd"
                          : data.cha_setor === "manutenção de áreas comuns"
                          ? "#67d0a4"
                          : data.cha_setor === "manutenção elétrica"
                          ? "#fea975"
                          : data.cha_setor === "manutenção de periféricos"
                          ? "#bb5353"
                          : "#919496"
                    }}
                  >
                    {data.cha_setor}
                  </span>
                  <span className="dstq">Status</span>
                  <span
                    style={{
                      borderRadius: "5px",
                      color: "white",
                      background:
                        data.cha_status === "Pendente"
                          ? "#d32824"
                          : data.cha_status === "Em Andamento"
                          ? "#495de2"
                          : data.cha_status === "Concluído"
                          ? "#0acf6b"
                          : "#a82121"
                    }}
                  >
                    {data.cha_status}
                  </span>
                  <span className="impb">Id de Local</span>
                  <span className="imp">{data.locais_id}</span>
                  <span className="dstq">Fechado Por</span>
                  <span className="nm">{data.cha_administrador}</span>
                  <span className="impb">Data de Criação</span>
                  <span className="imp">
                    {new Date(data.created_at).toLocaleString("pt-BR")}
                  </span>
                  <span className="dstq">Última Alteração</span>
                  <span className="nm">
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
