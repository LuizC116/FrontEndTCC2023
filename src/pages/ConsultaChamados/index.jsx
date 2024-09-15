import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import "./style.css";
import DetalhesChamados from "../../components/DetalhesChamados";
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
  const [pages, setPages] = useState(-1);
  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(false);
  const [queryAttribute, setQueryAttribute] = useState("id");
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("id");

  useEffect(() => {
    let url = `/chamados?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}&_expand=locais&_expand=usuarios`;

    if (query) {
      url += `&${queryAttribute}_like=${query}`;
    }
    setQueryButton(false);

    const fetchData = async () => {
      const response = await api(url);
      const xtotal = response.headers.get("x-total-count");
      const pages = Math.ceil(xtotal / limit);
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
        <h1 className="titl">Consulta de Chamados</h1>
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
              <option value="usuarios_id">Id de Usuário</option>
              <option value="cha_status">Status </option>
              <option value="cha_setor">Setor </option>
              <option value="locais_id">Id de Local </option>
              <option value="cha_foto1">Url da foto 1 </option>
              <option value="cha_foto2">Url da foto 2 </option>
              <option value="cha_foto3">Url da foto 3 </option>
              <option value="cha_pedido">Pedido</option>
              <option value="created_at">Data de Criação</option>
              <option value="updated_at">Última Alteração</option>
            </select>
          </div>
        </div>
        <table className="chatabela">
          <thead className="chatheadsk">
            <th>Id</th>
            <th>Id de Usuário</th>
            <th>Status</th>
            <th>Setor</th>
            <th>Local</th>
            <th></th>
          </thead>
          <thead className="chatheadmb">
            <th>Id</th>
            <th>Local</th>
            <th></th>
          </thead>
          {data.map((element, index) => {
            return (
              <tr>
                <td data-cell="id">{element.id}</td>
                <td data-cell="Nome">{element.usuarios_id}</td>
                <td data-cell="Status">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "45px",
                      borderRadius: "5px",
                      color: "white",
                      background:
                        element.cha_status === "Pendente"
                          ? "#d32824"
                          : element.cha_status === "Em Andamento"
                          ? "#495de2"
                          : element.cha_status === "Concluído"
                          ? "#0acf6b"
                          : "#a82121"
                    }}
                  >
                    {" "}
                    {element.cha_status}{" "}
                  </div>
                </td>
                <td data-cell="Setor Nome" className="nm">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "45px",
                      borderRadius: "5px",
                      color: "white",
                      background:
                        element.cha_setor === "manutenção de computadores"
                          ? "#5a88cd"
                          : element.cha_setor === "manutenção de áreas comuns"
                          ? "#67d0a4"
                          : element.cha_setor === "manutenção elétrica"
                          ? "#fea975"
                          : element.cha_setor === "manutenção de periféricos"
                          ? "#bb5353"
                          : "#919496"
                    }}
                  >
                    {element.cha_setor}
                  </div>
                </td>
                <td data-cell="Local">{element.locais_id}</td>
                <td>
                  {/*<button>Alterar</button>
                <button>Excluir</button>*/}
                  <DetalhesChamados data={element} />
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
                <option value="usuarios_id">Id de Usuário</option>
                <option value="cha_status">Status </option>
                <option value="cha_setor">Setor </option>
                <option value="locais_id">Id de Local </option>
                <option value="cha_foto1">Url da foto 1 </option>
                <option value="cha_foto2">Url da foto 2 </option>
                <option value="cha_foto3">Url da foto 3 </option>
                <option value="cha_pedido">Pedido</option>
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
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
