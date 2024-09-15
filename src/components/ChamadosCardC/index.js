import "./styles.css";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import ModalCard from "../../components/ModalCard/index";

export default function ChamadosCardC() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/chamados?cha_status_like=Concluído&_sort=id&_order=desc&_expand=locais&_expand=usuarios`;

    const fetchData = async () => {
      const response = await api(url);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      {Array.isArray(data) &&
        data.map((element) => {
          return (
            <Card className="cardchamados">
              <div>
                <span className="titheaderchap">{element.cha_pedido}</span>
                <div className="divisor4"></div>
              </div>

              <div className="cantp">
                <span className="nmaechap">{element?.usuarios?.usu_nome}</span>
                <span className="nmaechap2">
                  {new Date(element.created_at).toLocaleString("pt-BR")}
                </span>
                <ModalCard data={element} className="bdinf"></ModalCard>
              </div>
            </Card>
          );
        })}
    </>
  );
}
