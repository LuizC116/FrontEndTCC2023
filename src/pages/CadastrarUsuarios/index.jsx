import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import { useAuth } from "../../context/Auth/index";
import { useToast } from "../../context/Toast";
import AdicionarUsuario from "../../components/AdicionarUsuario";
import { api, baseURL } from "../../utils/api";
import "./styles.css";

export default function Signup() {
  const navigate = useNavigate(); // Use useNavigate para redirecionamento
  const { addToast } = useToast();
  const { user } = useAuth();
  useEffect(() => {
    if (user?.usuario?.usu_nivel === "usuário") {
      navigate("/Header/Chamados");
      addToast({
        title: "O. R. System",
        message: "Você não possuí permissão para acessar essa página.",
        type: "warning",
      });
    }
  }, [navigate]);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1); // Não para ser confundido com o page no singular

  const [query, setQuery] = useState(""); //Guarda o que eu to pesquisando
  const [queryButton, setQueryButton] = useState(false); // Verifica se eu apertei o botão ou não
  const [queryAttribute, setQueryAttribute] = useState("id"); //Atributo que eu quero pesquisar

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("id");

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/usuarios?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`; //obedece o setLimit e o setPage

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
        <h1 className="titl">Lista de Usuários</h1>
        <div className="divisor3"></div>
        <div className="contentquery">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
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
              <option value="usu_nome">Nome </option>
              <option value="usu_rmcodigo">Código RM </option>
            </select>
          </div>
        </div>
        <table className="thd2">
          <tr>
            <td>Id</td>
            <td>Foto</td>
            <td>Nome </td>
            <td>Código RM</td>
            <td>Cargo </td>
            <td>Criado em</td>
          </tr>
        </table>
        <div className="overfl3">
          <table className="itensusu2">
            {data.map((element, index) => {
              return (
                <tr>
                  <td data-cell="id">{element.id}</td>
                  <td data-cell="foto">
                    <img
                      src={`${baseURL}/files/${element.usu_foto}`}
                      alt="usuario"
                      className="usuft2"
                    />
                  </td>
                  <td data-cell="nome">{element.usu_nome}</td>
                  <td data-cell="rm">{element.usu_rmcodigo}</td>
                  <td data-cell="cargo">{element.usu_cargo}</td>
                  <td data-cell="data">
                    {new Date(element.created_at).toLocaleString("pt-BR")}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
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
                  },
                )}
              </select>
            </div>
          </div>
          <AdicionarUsuario />
        </div>
      </div>
    </div>
  );
}
