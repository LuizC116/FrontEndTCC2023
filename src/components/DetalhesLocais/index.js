import { useState } from "react";
import "./styles.css";
import { Modal } from "react-bootstrap";

export default function DetalhesLocais({ data }) {
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
                <span className="titheader">Detalhes do Local</span>
                <div className="divisor3"></div>
              </header>
              <main className="ladflexloc">
                <div className="ladflexloc">
                  <span className="dstq">Id</span>
                  <span>{data.id}</span>
                  <span className="impb">Local</span>
                  <span className="imp">{data.loc_nome}</span>
                  <span className="dstq">Data de Criação</span>
                  <span>
                    {new Date(data.created_at).toLocaleString("pt-BR")}
                  </span>
                  <span className="impb">Última Alteração</span>
                  <span className="imp">
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
