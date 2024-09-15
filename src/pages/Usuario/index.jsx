import "./style.css";
import { Card } from "react-bootstrap";
import Tr from "../../components/Tr/index";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/Auth/index";
import UploadAvatarDsk from "../../components/UploadAvatarDsk";
import PerfilUsuario from "../../components/PerfilUsuario";

export default function Usuario() {
  const { user } = useAuth();
  const [id, setId] = useState(user?.usuario.id);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [xTotalCount, setTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);
  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(false);
  const [queryAttribute, setQueryAttribute] = useState("cid_nome");

  useEffect(() => {
    let url = `/chamados?usuarios_id=${id}&_expand=locais&_expand=usuarios`;

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

  return (
    <div className="Fundo">
      <div className="teste450">
        <div className="divusu">
          <PerfilUsuario />
          <Card className="dusu2">
            <h1 className="titulusua2">Chamados Realizados</h1>
            <div className="divisrusuch"></div>
            <div className="overfl">
              {data.length === 0 ? (
                <div className="overflhid">
                  <table className="itensusu">
                    <div className="divcentro">
                      <p className="frasenula">Nenhum chamado criado.</p>
                    </div>
                  </table>
                </div>
              ) : (
                Array.isArray(data) &&
                data.map((element) => (
                  <table className="itensusu">
                    <Tr data={element} className="bdinf">
                      <td data-cell="chamado">
                        <span>{element.cha_pedido}</span>
                      </td>
                      <td data-cell="data">
                        {" "}
                        {new Date(element.created_at).toLocaleString("pt-BR")}
                      </td>
                      <td data-cell="status">
                        <span
                          style={{
                            display: "block",
                            width: "80%",
                            marginLeft: "auto",
                            borderRadius: "5px",
                            textAlign: "center",
                            padding: "4px",
                            color: "white",
                            minWidth: "138px",
                            background:
                              element.cha_status === "Pendente"
                                ? "#d32824"
                                : element.cha_status === "Em Andamento"
                                ? "#495de2"
                                : "#0acf6b",
                          }}
                        >
                          {element.cha_status}
                        </span>
                      </td>
                    </Tr>
                  </table>
                ))
              )}
            </div>
          </Card>
        </div>{" "}
      </div>
    </div>
  );
}
