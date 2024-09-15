import { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import "./styles.css";
import lixeira from "../../assets/lixeira.png";

export default function ModalRegistro({ data }) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);

  const handleClose = async (evt) => {
    evt.preventDefault();

    setShow(false);
    return;
  };

  return (
    <>
      <button
        className="exdetails"
        style={{
          color: data.cha_status === "Concluído" ? "#596ad3" : "#a82121",
        }}
        onClick={handleOpen}
      >
        {" "}
        Exibir detalhes »
      </button>
      <Modal show={show} centered>
        <Modal.Body>
          <div className="scale">
            <div>
              <span className="titheaderchag">{data.cha_pedido}</span>
            </div>
            <div className="divisor3"></div>
            <div className="cant">
              <span className="nmaechag">{data?.usuarios?.usu_nome}</span>
              <span> {new Date(data.created_at).toLocaleString("pt-BR")}</span>
            </div>
            <div className="divisor3"></div>
            <main>
              <Carousel className="carosselcham">
                <Carousel.Item>
                  <img
                    className="fotochamadofit2"
                    src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev/files/${data.cha_foto1}`}
                    alt="fotochamado"
                  />
                </Carousel.Item>
                {data.cha_foto2 ? (
                  <Carousel.Item>
                    <img
                      className="fotochamadofit2"
                      src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev/files/${data.cha_foto2}`}
                      alt="fotochamado"
                    />
                  </Carousel.Item>
                ) : null}
                {data.cha_foto3 && data.cha_foto3 !== "" ? (
                  <Carousel.Item>
                    <img
                      className="fotochamadofit2"
                      src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev/files/${data.cha_foto3}`}
                      alt="fotochamado"
                    />
                  </Carousel.Item>
                ) : null}
              </Carousel>
              <div className="mddsk">
                <p className="paragrf">{data.cha_pedido}</p>
                <div>
                  <div className="cant2">
                    <span>Local: {data?.locais?.loc_nome}</span>
                    <span></span>
                  </div>
                  <div className="cant13">
                    <span
                      style={{
                        borderRadius: "5px",
                        padding: "1px 5px 1px 5px",
                        color: "white",
                        textTransform: "capitalize",
                        background:
                          data.cha_setor === "Manutenção de Computadores"
                            ? "#5a88cd"
                            : data.cha_setor === "Manutenção de Áreas Comuns"
                            ? "#67d0a4"
                            : data.cha_setor === "Manutenção Elétrica"
                            ? "#fea975"
                            : data.cha_setor === "Manutenção de Periféricos"
                            ? "#bb5353"
                            : "#919496",
                      }}
                    >
                      {" "}
                      {data.cha_setor}
                    </span>
                    {data.cha_status === "Concluído" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#0acf6b",
                          }}
                        >
                          Concluído
                        </span>
                      </>
                    )}
                    {data.cha_status === "Removido" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#a82121",
                          }}
                        >
                          <img
                            src={lixeira}
                            alt="lixeira"
                            className="lixeira"
                          />
                          Removido
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="mdmbl">
                <p className="paragraf2">{data.cha_pedido}</p>
                <div className="cant5">
                  <div>
                    <p>Local: {data?.locais?.loc_nome}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "-18px",
                    }}
                  >
                    {data.cha_status === "Concluído" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#0acf6b",
                          }}
                        >
                          Concluído
                        </p>
                      </>
                    )}
                    {data.cha_status === "Removido" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#a82121",
                          }}
                        >
                          <img
                            src={lixeira}
                            alt="lixeira"
                            className="lixeira"
                          />
                          Removido
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <span>
                      <p
                        style={{
                          borderRadius: "5px",
                          padding: "1px 5px 1px 5px",
                          color: "white",
                          marginTop: "-10px",
                          textAlign: "center",
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
                              : "#919496",
                        }}
                      >
                        {" "}
                        {data.cha_setor}
                      </p>
                    </span>
                    <span></span>
                  </div>
                </div>
              </div>
            </main>
            <div className="divisor3"></div>
            <footer className="sbotord3">
              <button className="sbot17" onClick={handleClose}>
                Fechar
              </button>
            </footer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
