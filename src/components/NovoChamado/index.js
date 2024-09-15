import "./styles.css";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { object, string, ref, array } from "yup";
import { api } from "../../utils/api";
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";

export default function NovoChamado() {
  const [pedido, setPedido] = useState("");
  const { user } = useAuth();
  const [setor, setSetor] = useState("Manutenção de Áreas Comuns");
  const [locais, setLocais] = useState("1");
  const [imagem1, setImagem1] = useState("");
  const [imagem2, setImagem2] = useState("");
  const [imagem3, setImagem3] = useState("");

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [xTotalCount, setTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);
  const [queryButton, setQueryButton] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/locais?_order=asc&_sort=id`;

    // se o query n tiver valor n se coloca nada para pesquisar
    //query tem que ter um valor para aparecer algo na pesquisa
    const fetchData = async () => {
      const response = await api(url);
      const xtotal = response.headers.get("x-total-count");
      const pages = Math.ceil(xtotal / limit);
      setTotalCount(xtotal);
      setPages(pages);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [limit, page, queryButton]);

  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let chamado = {
      usuarios_id: user?.usuario?.id,
      cha_pedido: pedido.trim(),
      cha_setor: setor.trim(),
      locais_id: locais.trim(),
      cha_foto: [
        { name: imagem1.name },
        { name: imagem2.name },
        { name: imagem3.name }
      ].filter((imagem) => imagem.name) // Filtra imagens vazias
    };

    let chamadoSchema = object({
      usuarios_id: string().required(
        "Usuário deve estar conectado para enviar um chamado."
      ),
      cha_pedido: string().required("Insira os dados do chamado."),
      cha_setor: string().required("Selecione o setor do chamado."),
      locais_id: string().required("Selecione um local para o chamado."),
      cha_foto: array()
        .min(1, "Selecione pelo menos uma foto.")
        .of(
          object().shape({
            name: string().required("Nome da imagem é obrigatório")
            // Outras validações para cada objeto de imagem, se necessário
          })
        )
    });

    const showToastForValidation = (errors) => {
      errors.forEach((error) => {
        addToast({
          title: "Erro de Validação",
          message: error.message,
          type: "danger"
        });
      });
    };

    const validateChamado = async () => {
      try {
        await chamadoSchema.validate(chamado, { abortEarly: false });
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

    const isValidationSuccessful = await validateChamado();

    if (isValidationSuccessful) {
      const formData = new FormData();
      formData.append("cha_pedido", pedido);
      formData.append("cha_setor", setor);
      formData.append("locais_id", locais);
      formData.append("usuarios_id", user?.usuario?.id);
      formData.append("cha_foto", imagem1);
      formData.append("cha_foto", imagem2);
      formData.append("cha_foto", imagem3);

      const page = await api("/chamados", {
        method: "POST",
        body: formData
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
      setLocais(1);
      setPedido("");
      setImagem1("");
      setImagem2("");
      setImagem3("");
      setSetor("Manutenção de Áreas Comuns");
      setShow(false);
      window.location.reload();
      addToast({
        title: "O. R. System",
        message: "Chamado realizado.",
        type: "info"
      });
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="botcham">
        +
      </button>
      <Modal show={show} centered>
        <Modal.Body>
          <div>
            <div className="cabcaio">
              <span className="titheader">Novo Chamado</span>
            </div>
          </div>
          <div className="divisor3"></div>
          <div className="cant3">
            <p className="nmae">Informe o seu pedido:</p>
            <input
              value={pedido}
              placeholder="  Digite Aqui"
              className="inputcham"
              onChange={(e) => setPedido(e.target.value)}
            />
            <p className="nmae" onChange={(e) => setSetor(e.target.value)}>
              Setor:
            </p>
            <select
              value={setor}
              className="inputcham"
              onChange={(e) => setSetor(e.target.value)}
            >
              <option value="Manutenção de Áreas Comuns">
                Manutenção de Áreas Comuns{" "}
              </option>
              <option value="Manutenção de Computadores">
                Manutenção de Computadores
              </option>
              <option value="Manutenção de Periféricos">
                Manutenção de Periféricos
              </option>
              <option value="Manutenção Elétrica">Manutenção Elétrica</option>
              <option value="Manutenção de Encanamento">
                Manutenção de Encanamento
              </option>
            </select>
            <p className="cant4">
              <span>Insira uma Foto </span>
              <span style={{ color: "red" }}>(No mínimo uma)</span>
            </p>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                onChange={(e) => setImagem1(e.target.files[0])}
              />
              <Form.Control
                type="file"
                onChange={(e) => setImagem2(e.target.files[0])}
              />
              <Form.Control
                type="file"
                onChange={(e) => setImagem3(e.target.files[0])}
              />
            </Form.Group>
            <p className="nmae">Informe o Local:</p>
            <select
              value={locais}
              className="inputcham"
              onChange={(e) => setLocais(e.target.value)}
            >
              {Array.isArray(data) &&
                data.map((element, index) => {
                  return <option value={element.id}>{element.loc_nome}</option>;
                })}
            </select>
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
              Criar Chamado
            </button>
          </footer>
        </Modal.Body>
      </Modal>
    </>
  );
}
