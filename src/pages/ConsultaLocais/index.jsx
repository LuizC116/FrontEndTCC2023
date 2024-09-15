import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import "./style.css";
import DetalhesLocais from "../../components/DetalhesLocais";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";

export default function ConsultaLocais() {
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

  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1); // Não para ser confundido com o page no singular

  const [query, setQuery] = useState(""); //Guarda o que eu to pesquisando
  const [queryButton, setQueryButton] = useState(false); // Verifica se eu apertei o botão ou não
  const [queryAttribute, setQueryAttribute] = useState("id"); //Atributo que eu quero pesquisar

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("id");

  const handleLimpar = () => {
    setQuery("");
    setQueryAttribute("id");
    setQueryButton(true);
  };

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/locais?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`; //obedece o setLimit e o setPage

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

  return (
    <div className="wrapper">
      <div className="mx-auto mt-3 mb-3  card text">
        <h1 className="titl">Consulta de Locais</h1>
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
              value={queryAttribute}
              className="subpesq"
              onChange={(e) => setQueryAttribute(e.target.value)}
            >
              <option value="id">Id </option>
              <option value="set_nome">Nome </option>
              <option value="created_at">Data de Criação</option>
              <option value="updated_at">Última Alteração</option>
            </select>
          </div>
        </div>
        <table className="tabela">
          <thead>
            <th>Id</th>
            <th>Local</th>
            <th></th>
          </thead>
          {data.map((element) => {
            return (
              <tr>
                <td data-cell="id">{element.id}</td>
                <td data-cell="Local" className="caps">
                  {element.loc_nome}
                </td>

                <td>
                  {/*<button>Alterar</button>
                <button>Excluir</button>*/}
                  <DetalhesLocais data={element} />
                </td>
              </tr>
            );
          })}
        </table>
        <div>
          <div className="alim">
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
            <div>
              <span> Ordem: </span>
              <select
                className="sel2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="id">Id </option>
                <option value="set_nome">Nome </option>
                <option value="created_at">Data de Criação</option>
                <option value="updated_at">Última Alteração</option>
              </select>
              <select
                className="sel2"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                <option value="asc">↑</option>
                <option value="desc">↓</option>
              </select>
            </div>
            <div>
              <div>
                <span> Itens: </span>
                <select
                  className="sel2"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                >
                  {" "}
                  <option value="3">3</option>
                  <option value="7">7</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
