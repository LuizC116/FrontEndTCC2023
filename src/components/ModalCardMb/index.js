import { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";
import "./styles.css";
import lixeira from "../../assets/lixeira.png";
import { useToast } from "../../context/Toast";
import { object, string } from "yup";
import { useAuth } from "../../context/Auth/index";
import { api, baseURL } from "../../utils/api";

export default function ModalCardMb({ children, data }) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const { addToast } = useToast();
  const [id] = useState(data.id);
  const { user } = useAuth();
  const [chamadoStatus, setChamadoStatus] = useState(data.cha_status);
  const [administrador, setAdministrador] = useState("");

  const handleClose = async (evt) => {
    evt.preventDefault();

    if (chamadoStatus === data.cha_status) {
      setShow(false);
      return;
    }

    let status = {
      cha_status: chamadoStatus.trim(),
      cha_administrador: administrador.trim()
    };

    const chamadoSchema = object({
      cha_status: string().required(
        "É necessário o status do chamado para vizualiza-lo."
      )
    });

    try {
      await chamadoSchema.validate(status);
    } catch (error) {
      console.log(error.message);
      return false;
    }

    const page = await api(`/chamados/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(status)
    });

    let statuspage = parseInt(page.status, 10);

    if (statuspage !== 200) {
      addToast({
        title: "O. R. System",
        message: `Erro: ${(await page.json()).error}`,
        type: "danger"
      });
      return false;
    }
    const responseData = await page.json();

    if (responseData.length === 0) {
      addToast({
        title: "O. R. System",
        message: "Erro: Erro de servidor.",
        type: "danger"
      });
      return false;
    }

    setShow(false);
    addToast({
      title: "O. R. System",
      message: "Chamado Atualizado.",
      type: "info"
    });
  };

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          color: "white",
          fontSize: "20px",
          border: "none",
          marginTop: "2px",
          height: "40px",
          borderRadius: "10px",
          width: "100%",
          background:
            data.cha_status === "Pendente"
              ? "#d32824"
              : data.cha_status === "Em Andamento"
              ? "#495de2"
              : "#0acf6b"
        }}
      >
        {children}Detalhes ⨠
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
              <span>{new Date(data.created_at).toLocaleString("pt-BR")}</span>
            </div>
            <div className="divisor3"></div>
            <main>
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
                      src={`${baseURL}/files/${data.cha_foto2}`}
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
              <div className="mddsk">
                <p className="paragrf">{data.cha_pedido}</p>
                <div>
                  <div className="cant2">
                    <span>Local: {data?.locais?.loc_nome}</span>
                    <span></span>
                    {user?.usuario?.id &&
                      user?.usuario?.usu_nivel === "administrador" &&
                      chamadoStatus === "Pendente" && (
                        <>
                          <button
                            className="botlix"
                            onClick={() => {
                              setChamadoStatus("Removido");
                              setAdministrador(user?.usuario.usu_nome);
                            }}
                          >
                            {" "}
                            <img
                              src={lixeira}
                              alt="lixeira"
                              className="lixeira"
                            />
                            Remover
                          </button>
                        </>
                      )}
                  </div>
                  <div className="cant13">
                    <span
                      style={{
                        borderRadius: "5px",
                        padding: "1px 5px 1px 5px",
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
                      {" "}
                      {data.cha_setor}
                    </span>
                    {chamadoStatus === "Pendente" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#d32824"
                          }}
                        >
                          Pendente
                        </span>
                      </>
                    )}
                    {chamadoStatus === "Em Andamento" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#495de2"
                          }}
                        >
                          Em andamento
                        </span>
                      </>
                    )}
                    {chamadoStatus === "Concluído" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#0acf6b"
                          }}
                        >
                          Concluído
                        </span>
                      </>
                    )}
                    {chamadoStatus === "Removido" && (
                      <>
                        <span
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            background: "#a82121"
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
                      marginTop: "-18px"
                    }}
                  >
                    {chamadoStatus === "Pendente" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#d32824"
                          }}
                        >
                          Pendente
                        </p>
                      </>
                    )}
                    {chamadoStatus === "Em Andamento" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#495de2"
                          }}
                        >
                          Em andamento
                        </p>
                      </>
                    )}
                    {chamadoStatus === "Concluído" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#0acf6b"
                          }}
                        >
                          Concluído
                        </p>
                      </>
                    )}
                    {chamadoStatus === "Removido" && (
                      <>
                        <p
                          style={{
                            borderRadius: "5px",
                            padding: "1px 17px 1px 17px",
                            color: "white",
                            width: "100%",
                            textAlign: "center",
                            background: "#a82121"
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
                    {user?.usuario?.id &&
                      user?.usuario?.usu_nivel === "administrador" &&
                      chamadoStatus === "Pendente" && (
                        <>
                          <button
                            className="botlix"
                            onClick={() => {
                              setChamadoStatus("Removido");
                              setAdministrador(user?.usuario.usu_nome);
                            }}
                          >
                            {" "}
                            <img
                              src={lixeira}
                              alt="lixeira"
                              className="lixeira"
                            />
                            Remover
                          </button>
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
                            data.cha_setor === "Manutenção de Computadores"
                              ? "#5a88cd"
                              : data.cha_setor === "Manutenção de Áreas Comuns"
                              ? "#67d0a4"
                              : data.cha_setor === "Manutenção Elétrica"
                              ? "#fea975"
                              : data.cha_setor === "Manutenção de Periféricos"
                              ? "#bb5353"
                              : "#919496"
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
              <button className="sbot7" onClick={handleClose}>
                Fechar
              </button>
              {user?.usuario?.id &&
                user?.usuario?.usu_nivel === "administrador" && (
                  <>
                    {chamadoStatus === "Pendente" && (
                      <button
                        className="sbot6"
                        onClick={() => setChamadoStatus("Em Andamento")}
                      >
                        Inicializar
                      </button>
                    )}
                    {chamadoStatus === "Em Andamento" && (
                      <button
                        className="sbot6"
                        onClick={() => {
                          setChamadoStatus("Concluído");
                          setAdministrador(user?.usuario.usu_nome);
                        }}
                      >
                        Finalizar
                      </button>
                    )}
                    {chamadoStatus === "Concluído" && <></>}
                  </>
                )}
            </footer>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
