import ModalRegistro from "../../components/ModalRegistro/index";
import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import "./styles.css";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";

export default function ConsultaChamados() {
  const navigate = useNavigate(); // Use useNavigate para redirecionamento
  const { addToast } = useToast();
  const { user } = useAuth();
  useEffect(() => {
    if (user?.usuario?.usu_nivel === "usuário") {
      navigate("/Header/Chamados");
      addToast({
        title: "O. R. System",
        message: "Você não possuí permissão para acessar essa página.",
        type: "warning"
      });
    }
  }, [navigate]);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1); // Não para ser confundido com o page no singular
  const [status, setStatus] = useState("Concluído");
  const [query, setQuery] = useState(""); //Guarda o que eu to pesquisando
  const [queryButton, setQueryButton] = useState(false); // Verifica se eu apertei o botão ou não
  const [queryAttribute, setQueryAttribute] = useState("id"); //Atributo que eu quero pesquisar

  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("id");

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/chamados?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&_expand=locais&_expand=usuarios&cha_status_like=${status}`; //obedece o setLimit e o setPage

    if (query) {
      url += `&${queryAttribute}_like=${query}`;
    }
    setQueryButton(false);

    const fetchData = async () => {
      const response = await api(url);
      const xtotal = response.headers.get("x-total-count");
      const pages = Math.ceil(xtotal / limit); // (xtotal/limit) => para descobrir o teto da divisão
      setXTotalCount(xTotalCount);
      setPages(pages);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [limit, page, sort, order, queryButton]);

  const handleLimpar = () => {
    setQuery("");
    setQueryAttribute("id");
    setQueryButton(true);
  };

  return (
    <div className="wrapper">
      <div className="mx-auto mt-3 mb-3 card text">
        <h1 className="titl">Registros de Chamados</h1>
        <div className="divisor3"></div>
        <div className="contentquery">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%"
            }}
          >
            <input
              className="barpesquisa"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar"
            />
            <button className="sbot13" onClick={() => setQueryButton(true)}>
              ⌕
            </button>
          </div>
          <div className="subord">
            <button className="sbot13" onClick={handleLimpar}>
              Limpar
            </button>
            <select
              value={status}
              className="subpesq2"
              onChange={(e) => {
                setStatus(e.target.value);
                setQueryButton(true);
              }}
            >
              <option value="Concluído">Concluídos </option>
              <option value="Removido">Removidos</option>
            </select>
            <select
              value={queryAttribute}
              className="subpesq2"
              onChange={(e) => setQueryAttribute(e.target.value)}
            >
              <option value="id">Id </option>
              <option value="usuarios_id">Id de Usuário</option>
              <option value="cha_setor">Setor </option>
              <option value="locais_id">Id de Local </option>
              <option value="cha_pedido">Pedido</option>
              <option value="created_at">Data de Criação</option>
              <option value="updated_at">Última Alteração</option>
            </select>
          </div>
        </div>
        <div className="ordenador">
          <table className="tabreg">
            {data.map((element, index) => {
              return (
                <tr>
                  <td>
                    <div className="Pgreg2">
                      Id do chamado: {element.id}
                      <br />
                      Local: {element?.locais?.loc_nome}
                      <br />
                      Aberto em{" "}
                      {new Date(element.created_at).toLocaleString("pt-BR")}
                      <br />
                      Realizador: {element?.usuarios?.usu_nome}
                      <br />
                      RM: {element.usuarios?.usu_rmcodigo}
                      <br />
                      E-mail: {element?.usuarios?.usu_email}
                      <br />
                      Cargo:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {element?.usuarios?.usu_cargo}
                      </span>
                      <br />
                    </div>
                  </td>
                  <td
                    style={{
                      background:
                        element.cha_status === "Concluído"
                          ? "#596ad3"
                          : "#a82121"
                    }}
                  >
                    <div className="Pgreg2">
                      Fechado em:{" "}
                      {new Date(element.updated_at).toLocaleString("pt-BR")}
                      <br />
                      {element.cha_status === "Concluído" ? (
                        <>Fechado por: {element.cha_administrador}</>
                      ) : (
                        <>Removido por: {element.cha_administrador}</>
                      )}
                      <br />
                      Setor:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {element.cha_setor}{" "}
                      </span>
                      <br />
                    </div>
                    <div className="preenc">
                      <ModalRegistro data={element}></ModalRegistro>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
          <div className="bdiv">
            <div className="alim2">
              <div>
                <span> Página: </span>
                <select
                  className="sel2"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                >
                  {Array.from({ length: pages }, (_, i) => i + 1).map(
                    (element) => {
                      return <option value={`${element}`}>{element}</option>;
                    }
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
