import "./styles.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { object, string } from "yup";
import { useToast } from "../../context/Toast";
import CadastrarLocalLista from "../../components/CadastrarLocalLista/index";
import { api } from "../../utils/api";

export default function CadastrarLocais() {
  const handleOpen = () => setShow(true);
  const { addToast } = useToast();

  const [clocal, setClocal] = useState("");

  const [show, setShow] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let local = {
      loc_nome: clocal.trim()
    };

    const localSchema = object({
      loc_nome: string().required("Digite o nome do local.")
    });

    try {
      await localSchema.validate(local);
    } catch (error) {
      console.log(error.message);
      return false;
    }

    const page = await api("/locais", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(local)
    });

    let statuspage = parseInt(page.status, 10);

    if (statuspage !== 201) {
      addToast({
        title: "O. R. System",
        message: `Erro: ${(await page.json()).error}`,
        type: "danger"
      });
      return false;
    }
    const data = await page.json();

    if (data.length === 0) {
      addToast({
        title: "O. R. System",
        message: "Erro: Erro de servidor.",
        type: "danger"
      });
      return false;
    }

    setClocal("");
    addToast({
      title: "O. R. System",
      message: "Local Cadastrado.",
      type: "info"
    });
  };

  return (
    <>
      <button onClick={handleOpen} className="botloc">
        +
      </button>
      <Modal show={show} centered>
        <Modal.Body>
          <div>
            <div className="cabcaio">
              <span className="titheader">Cadastrar Local</span>
            </div>
          </div>
          <div className="divisor3"></div>
          <div className="cant3">
            <p className="nmae">Lista de locais cadastrados:</p>
          </div>
          <CadastrarLocalLista />
          <div className="cant3">
            <p className="nmae">Registre o novo local:</p>
            <input
              value={clocal}
              onChange={(e) => setClocal(e.target.value)}
              placeholder="  Digite Aqui"
              className="inputcham"
            />
          </div>
          <main></main>
          <div className="divisor3"></div>
          <footer className="sbotord3">
            <button
              onClick={() => {
                setShow(false);
              }}
              className="sbot7"
            >
              Fechar
            </button>
            <button type="submit" onClick={handleSubmit} className="sbot6">
              Cadastar Local
            </button>
          </footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
