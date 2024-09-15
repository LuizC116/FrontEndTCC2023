import "./styles.css";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { object, string } from "yup";
import lixeira from "../../assets/lixeira.png";
import { useToast } from "../../context/Toast";
import { api } from "../../utils/api";

export default function AdicionarUsuario() {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const { addToast } = useToast();

  const [nome, setNome] = useState("");
  const [rmcodigo, setRmcodigo] = useState("");
  const [codigoetec, setCodigoetec] = useState("");
  const [cargo, setCargo] = useState("aluno");
  const [email, setEmail] = useState("");
  const [dtnascimento, setDtnascimento] = useState("");

  const handleDateInputChange = (e) => {
    const inputValue = e.target.value;

    const cleanedValue = inputValue.replace(/[^0-9]/g, "");

    if (cleanedValue.length >= 8) {
      const formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
        2,
        4,
      )}/${cleanedValue.slice(4, 8)}`;
      setDtnascimento(formattedValue);
    } else {
      setDtnascimento(cleanedValue);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const dataNascimentoSemBarras = dtnascimento.replace(/\//g, "");

    let usuario = {
      usu_nome: nome.trim(),
      usu_email: email.trim(),
      usu_rmcodigo: rmcodigo.trim(),
      usu_codigoetec: codigoetec.trim(),
      usu_cargo: cargo.trim(),
      usu_senha: dataNascimentoSemBarras,
    };

    let usuarioSchema = object({
      usu_nome: string()
        .required("Entre com seu nome completo")
        .min(7, "Mínimo de 7 caracteres")
        .matches(/\s/, "O nome deve conter um espaço"),
      usu_email: string()
        .email("Entre com um e-mail válido")
        .required("Entre com o e-mail")
        .matches(/\./, "Entre com um e-mail válido"),
      usu_rmcodigo: string()
        .required("Entre com o código")
        .min(5, "Mínimo de 5 caracteres"),
      usu_codigoetec: string().required("Entre com o código"),
      usu_senha: string().required("Uma senha é necessária"),
      usu_cargo: string().required("Insira o cargo"),
    });

    const showToastForValidation = (errors) => {
      errors.forEach((error) => {
        addToast({
          title: "Erro de Validação",
          message: error.message,
          type: "danger",
        });
      });
    };

    const validateUsuario = async () => {
      try {
        await usuarioSchema.validate(usuario, { abortEarly: false });
      } catch (error) {
        if (error.inner) {
          showToastForValidation(error.inner);
        } else {
          showToastForValidation([error]);
        }
        return false;
      }
      return true;
    };

    const isValidationSuccessful = await validateUsuario();

    if (isValidationSuccessful) {
      const page = await api("/usuarios", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      let statuspage = parseInt(page.status, 10);

      if (statuspage !== 201) {
        addToast({
          title: "O. R. System",
          message: `Erro: ${(await page.json()).error}`,
          type: "danger",
        });
        return false;
      }
      const data = await page.json();

      if (data.length === 0) {
        addToast({
          title: "O. R. System",
          message: "Erro: Erro de servidor.",
          type: "danger",
        });
        return false;
      }

      setNome("");
      setEmail("");
      setRmcodigo("");
      setCodigoetec("");
      setCargo("");
      setDtnascimento("");
      setCargo("aluno");
      addToast({
        title: "O. R. System",
        message: "Usuário Adicionado.",
        type: "info",
      });
    }
  };

  const handleReset = async (evt) => {
    evt.preventDefault();

    setNome("");
    setEmail("");
    setRmcodigo("");
    setCodigoetec("");
    setCargo("");
    setDtnascimento("");
    setCargo("aluno");
  };

  return (
    <>
      <button onClick={handleOpen} className="botaddusu">
        + Adicionar Usuário
      </button>
      <Modal show={show} centered>
        <Modal.Body>
          <div>
            <div className="cabcaio">
              <span className="titheader">Adicionar Usuário</span>
            </div>
          </div>
          <div className="divisor3"></div>
          <div className="cant3">
            <p className="nmae">Informe os dados:</p>
          </div>
          <table className="ordados">
            <tr>
              <td>
                <span>Nome: </span>
              </td>
              <td>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome Completo"
                  className="inputcham"
                />
              </td>
            </tr>
            <tr>
              <td>Código RM:</td>
              <td>
                <input
                  value={rmcodigo}
                  onChange={(e) => setRmcodigo(e.target.value)}
                  placeholder="Rm do usuário"
                  className="inputcham"
                  maxLength="6"
                />
              </td>
            </tr>
            <tr>
              <td>Código da Etec:</td>
              <td>
                <input
                  value={codigoetec}
                  className="inputcham"
                  onChange={(e) => setCodigoetec(e.target.value)}
                  placeholder="Código"
                  maxLength="3"
                />
              </td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>
                <input
                  type="email"
                  value={email}
                  className="inputcham"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
              </td>
            </tr>
            <tr>
              <td>Data de Nascimento:</td>
              <td>
                <input
                  type="text"
                  value={dtnascimento}
                  onChange={handleDateInputChange}
                  placeholder="DDMMAAAA"
                  className="inputcham"
                  pattern="[0-9]*"
                />
              </td>
            </tr>
            <tr>
              <td>Cargo:</td>
              <td>
                <select
                  value={cargo}
                  className="inputcham"
                  onChange={(e) => setCargo(e.target.value)}
                >
                  <option value="aluno">Aluno </option>
                  <option value="professor">Professor </option>
                  <option value="funcionário">Funcionário </option>
                </select>
              </td>
            </tr>
          </table>
          <button className="limpcamp" type="reset" onClick={handleReset}>
            <img src={lixeira} alt="lixeira" className="lixeira" />
            Limpar Campos
          </button>
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
              Adicionar
            </button>
          </footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
