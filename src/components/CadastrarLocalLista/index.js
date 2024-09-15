import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";

export default function CadastrarLocalLista() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/locais?_order=asc&_sort=id`;

    const fetchData = async () => {
      const response = await api(url);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="listlocaiscrp">
        <div className="listlocais">
          <table className="listagem">
            <thead className="thd">
              <th>Id</th>
              <th>Local</th>
              <th>Criado em:</th>
            </thead>
            <>
              {Array.isArray(data) &&
                data.map((element) => {
                  return (
                    <tr>
                      <td>{element.id}</td>
                      <td>{element.loc_nome}</td>
                      {new Date(element.created_at).toLocaleString("pt-BR")}
                    </tr>
                  );
                })}
            </>
          </table>
        </div>
      </div>
    </>
  );
}
