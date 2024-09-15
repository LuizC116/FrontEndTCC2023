import { useState, useEffect } from "react";
import { api } from "../../utils/api";

export default function ModalRegistro() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [xTotalCount, setTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [queryButton, setQueryButton] = useState(false);

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/chamados?_sort=id&_order=desc&_expand=locais&_expand=usuarios&cha_status_like=${status}`;

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

  return (
    <>
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
                  Aberto em:
                  <span>
                    {new Date(element.created_at).toLocaleString("pt-BR")}
                  </span>
                  <br />
                  Realizador: {element?.usuarios?.usu_nome}
                  <br />
                  RM: {element.usuarios?.usu_rmcodigo}
                  <br />
                  E-mail: {element?.usuarios?.usu_email}
                  <br />
                  Cargo: {element?.usuarios?.usu_cargo}
                  <br />
                </div>
              </td>
              <td
                style={{
                  background:
                    element.cha_status === "Concluído" ? "#596ad3" : "#a82121"
                }}
              >
                <div className="Pgreg2">
                  Fechado em:
                  <span>
                    {new Date(element.updated_at).toLocaleString("pt-BR")}
                  </span>
                  <br />
                  {element.cha_status === "Concluído" ? (
                    <>Fechado por: {element.cha_administrador}</>
                  ) : (
                    <>Removido por: {element.cha_administrador}</>
                  )}
                  <br />
                  Setor: {element.cha_setor}
                  <br />
                </div>
                <div className="preenc">
                  <button className="exdetails"> Exibir detalhes »</button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
