import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import "./styles.css";
import { Card } from "react-bootstrap";
import { useAuth } from "../../context/Auth/index";
import UploadAvatarDsk from "../UploadAvatarDsk/index";

export default function PerfilUsuario() {
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1); // Não para ser confundido com o page no singular
  const { user } = useAuth();
  const [id, setId] = useState(user?.usuario.id);
  const [query, setQuery] = useState(""); //Guarda o que eu to pesquisando
  const [queryButton, setQueryButton] = useState(false); // Verifica se eu apertei o botão ou não
  const [queryAttribute, setQueryAttribute] = useState("id"); //Atributo que eu quero pesquisar

  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("id");

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/usuarios?id=${id}`; //obedece o setLimit e o setPage

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
    <>
      {data.map((element, index) => {
        return (
          <Card className="dusu1">
            <h1 className="titulusua">Área do Usuário</h1>
            <div className="divisrusuch"></div>

            <div className="divusflex">
              <img
                src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev/files/${element.usu_foto}`}
                alt="Foto "
                className="usuft"
              />
              <div className="usuinfo">
                <p>
                  RM: {element.usu_rmcodigo}
                  <br />
                  Nome: {element.usu_nome}
                  <br />
                  E-mail: {element.usu_email}
                  <br />
                  Função:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {" "}
                    {element.usu_cargo}
                  </span>
                </p>
              </div>
            </div>
            {user?.usuario.usu_cadastroativo === true ? (
              <>
                <UploadAvatarDsk />
              </>
            ) : (
              <></>
            )}
          </Card>
        );
      })}
    </>
  );
}
