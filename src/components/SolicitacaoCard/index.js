import "./styles.css";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import PromocaoSolicitacao from "../PromocaoSolicitacao/index";

export default function SolicitacaoCard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let url = `/usuarios?usu_solativa=true&_sort=id&_order=desc`;

    const fetchData = async () => {
      const response = await api(url);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <div className="divcentro">
          <p className="frasenula">Nenhuma Solicitação Ativa.</p>
        </div>
      ) : (
        Array.isArray(data) &&
        data.map((element) => (
          <div key={element.id} className="tbsol">
            <div className="ftord">
              <img
                src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.app.github.dev/files/${element.usu_foto}`}
                alt="usuario"
                className="usuftsl"
              />
            </div>
            <div className="infosol">
              <div>
                <p className="infop">
                  RM: {element.usu_rmcodigo}
                  <br />
                  Nome: {element.usu_nome}
                  <br />
                  E-mail: {element.usu_email}
                  <br />
                  Cargo:{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {element.usu_cargo}
                  </span>
                  <br />
                  Enviado em:{" "}
                  {new Date(element.usu_solenviada).toLocaleString("pt-BR")}
                  <br />
                </p>
              </div>
              <PromocaoSolicitacao data={element} />
            </div>
          </div>
        ))
      )}
    </>
  );
}
