import "./styles.css";
import React, { useState } from "react";
import { object, string } from "yup";
import { useToast } from "../../context/Toast";
import { Modal } from "react-bootstrap";
import warning from "../../assets/warning.png";
import { api } from "../../utils/api";

export default function PromocaoSolicitacao({ data }) {
  const { addToast } = useToast();
  const [solstatus, setSolstatus] = useState("usuário");
  const [show, setShow] = useState(false);
  const [id] = useState(data.id);
  const [senha] = useState(data.usu_senha);

  const handlePromoverSubmit = async () => {
    setShow(false);
    //setSolstatus("administrador");
    const promover = {
      usu_solativa: false,
      usu_nivel: "administrador",
      usu_senha: senha.trim(),
    };

    /*const promoverSchema = object({
      usu_nivel: string().required(
        "É necessário enviar uma solicitação para atualizá-lo.",
      ),
      usu_solativa: string().required("Não foi possível enviar."),
    });

    try {
      await promoverSchema.validate(promover);
    } catch (error) {
      console.log(error.message);
      return false;
    }*/

    const page = await api(`/usuarios/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(promover),
    });

    const statuspage = parseInt(page.status, 10);

    if (statuspage !== 200) {
      addToast({
        title: "O. R. System",
        message: `Erro: ${(await page.json()).error}`,
        type: "danger",
      });
      return false;
    }

    const responseData = await page.json();

    if (responseData.length === 0) {
      addToast({
        title: "O. R. System",
        message: "Erro: Erro de servidor.",
        type: "danger",
      });
      return false;
    }

    window.location.reload();
  };

  const handleNegarSubmit = async () => {
    //setSolstatus("usuário");
    const negar = {
      usu_solativa: false,
      usu_nivel: "usuário",
      usu_senha: senha.trim(),
    };

    /*const negarSchema = object({
      usu_solativa: string().required(
        "É necessário enviar uma solicitação para atualizá-lo.",
      ),
      usu_nivel: string().required("Não foi possível enviar."),
    });

    try {
      await negarSchema.validate(negar);
    } catch (error) {
      console.log(error.message);
      return false;
    }*/

    const page = await api(`/usuarios/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(negar),
    });

    const statuspage = parseInt(page.status, 10);

    if (statuspage !== 200) {
      addToast({
        title: "O. R. System",
        message: `Erro: ${(await page.json()).error}`,
        type: "danger",
      });
      return false;
    }

    const responseData = await page.json();

    if (responseData.length === 0) {
      addToast({
        title: "O. R. System",
        message: "Erro: Erro de servidor.",
        type: "danger",
      });
      return false;
    }

    window.location.reload();
  };

  return (
    <div className="ordflex25">
      <button className="bpromover" onClick={() => setShow(true)}>
        {" "}
        Promover
      </button>
      {show && (
        <Modal show={show} centered>
          <Modal.Body>
            <div>
              <div className="cabcaio">
                <span className="titheader">Atenção</span>
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
                src={warning}
                alt="atenção"
                style={{
                  width: "100px",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              />

              <p className="nmae">
                Esta ação não poderá ser revertida. Prosseguir?
              </p>
            </div>
            <div className="divisor3"></div>
            <footer className="sbotord3">
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="sbot7"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="sbot6"
                onClick={handlePromoverSubmit}
              >
                Confirmar
              </button>
            </footer>
          </Modal.Body>
        </Modal>
      )}
      <button className="bnegar" onClick={handleNegarSubmit}>
        {" "}
        Negar
      </button>
    </div>
  );
}
