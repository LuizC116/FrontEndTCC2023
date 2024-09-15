import "./styles.css";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";
import ModalCardR from "../../components/ModalCardR/index";
import { Carousel } from "react-bootstrap";
import { baseURL } from "../../utils/api";

export default function ChamadosCardP() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = `/chamados?cha_status_ne=Removido&_limit=3&_sort=id&_order=desc&_expand=locais&_expand=usuarios`;

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
            <Card className="cardchamadosr">
              <div className="cant">
                <span className="titheaderchapr">{element.cha_pedido}</span>
                <span
                  style={{
                    borderRadius: "5px",
                    color: "white",
                    width: "28%",
                    textAlign: "center",
                    height: "30px",
                    background:
                      element.cha_status === "Pendente"
                        ? "#d32824"
                        : element.cha_status === "Em Andamento"
                        ? "#495de2"
                        : "#0acf6b"
                  }}
                >
                  {" "}
                  {element.cha_status}
                </span>
              </div>
              <div className="divisor3"></div>

              <div className="cantp">
                <div className="dflename">
                  <span className="nmaechap3">
                    {element?.usuarios?.usu_nome}
                  </span>
                  <span className="nmaechap4">
                    {" "}
                    {new Date(element.created_at).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="divisor3"></div>
                <Carousel className="carosselchamr">
                  <Carousel.Item>
                    <img
                      className="fotochamadofit"
                      src={`${baseURL}/files/${element.cha_foto1}`}
                      alt="fotochamado1"
                    />
                  </Carousel.Item>
                  {element.cha_foto2 ? (
                    <Carousel.Item>
                      <img
                        className="fotochamadofit"
                        src={`${baseURL}/files/${element.cha_foto2}`}
                        alt="chamadofoto2"
                      />
                    </Carousel.Item>
                  ) : null}
                  {element.cha_foto3 && element.cha_foto3 !== "" ? (
                    <Carousel.Item>
                      <img
                        className="fotochamadofit"
                        src={`${baseURL}/files/${element.cha_foto3}`}
                        alt="chamadofoto3"
                      />
                    </Carousel.Item>
                  ) : null}
                </Carousel>
                <p className="paragrf5">{element.cha_pedido}</p>
                <ModalCardR data={element} className="bdinf"></ModalCardR>
              </div>
            </Card>
          );
        })}
    </>
  );
}
