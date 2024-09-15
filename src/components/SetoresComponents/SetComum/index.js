import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../../utils/api";
import ModalCardSet from "../../../components/ModalCardSet/index";

export default function SetComum() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [xTotalCount, setTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);
  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(false);

  useEffect(() => {
    // let url = "/cidades?cid_nome_like=TU";
    let url = `/chamados?cha_setor_like=manutenção de áreas comuns&cha_status_ne=Removido&_order=desc&_sort=id`;

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
    <table className="mintabl1">
      <>
        {data.map((element) => {
          return (
            <tr className="mintabl15">
              <td className="mintabl2">{element.cha_pedido}</td>
              <td className="mintabl3">
                <ModalCardSet data={element}></ModalCardSet>
              </td>
              <td className="mintabl3">
                {new Date(element.created_at).toLocaleString("pt-BR")}
              </td>
            </tr>
          );
        })}
      </>
    </table>
  );
}
