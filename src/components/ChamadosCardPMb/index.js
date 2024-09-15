import "./styles.css";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import ModalCardMb from "../../components/ModalCardMb/index";

export default function ChamadosCardPMb() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/chamados?cha_status_like=pendente&_sort=id&_order=desc&_expand=locais&_expand=usuarios`;

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
                <span className="titheaderchapmb">{element.cha_pedido}</span>
                <div className="divisor4"></div>
              </div>

              <div className="cantp">
                <span className="nmaechapmb">
                  {element?.usuarios?.usu_nome}
                </span>
                <span className="nmaechap2mb">
                  {new Date(element.created_at).toLocaleString("pt-BR")}
                </span>
                <ModalCardMb data={element}></ModalCardMb>
              </div>
            </Card>
          );
        })}
    </>
  );
}
