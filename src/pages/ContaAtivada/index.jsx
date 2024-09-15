import React, { useState, useEffect } from "react";
import { useToast } from "../../context/Toast";
import { useAuth } from "../../context/Auth/index";
import "./style.css";
import Rebarba from "../../assets/Rebarba.png";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import Ativador from "../../components/Ativador/index";

export default function ContaAtivada() {
  const { addToast } = useToast;
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [xTotalCount, setXTotalCount] = useState(-1);
  const [pages, setPages] = useState(-1);
  const [query, setQuery] = useState("");
  const [queryButton, setQueryButton] = useState(false);
  const [queryAttribute, setQueryAttribute] = useState("id");
  const [order, setOrder] = useState("asc");
  const [sort, setSort] = useState("id");
  const [id] = useState(user?.usuario?.id);

  useEffect(() => {
    let url = `/usuarios?id=${id}`;

    if (query) {
      url += `&${queryAttribute}_like=${query}`;
    }

    setQueryButton(false);

    const fetchData = async () => {
      try {
        const response = await api(url);
        const xtotal = response.headers.get("x-total-count");
        const pages = Math.ceil(xtotal / limit);

        setXTotalCount(xtotal);
        setPages(pages);

        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [limit, page, sort, order, query, queryAttribute]);

  return (
    <div className="content">
      {user?.usuario?.id &&
        data.map((element, index) => (
          <>
            <Ativador data={element} key={index} />
          </>
        ))}
      <div className="teste250">
        <img src={Rebarba} alt="Login" className="rebarba" />
        <div className="solct2">
          <div className="margem">
            <p className="logo3">O.R. System</p>
            <div className="divisor1"></div>
            <form className="formulario">
              <p className="texts">Conta Ativada com Sucesso.</p>
              <div className="divisor2"></div>
              <table>
                <tr>
                  <td>
                    <p className="texts">Para usufruir de todos os recursos,</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <p className="texts"> por favor reinicie sua sessão.</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="divisor2"></div>
                  </td>
                </tr>
              </table>
              <div className="sbotord">
                <Link to="/" className="sbotfinal">
                  Voltar para a página inicial.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
