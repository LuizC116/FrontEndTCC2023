import { useState } from "react";
import "./styles.css";
import { Card, Carousel } from "react-bootstrap";
import cadeira1 from "../../assets/cadeira1.png";
import cadeira2 from "../../assets/cadeira2.jpg";
import cadeira3 from "../../assets/cadeira3.jpg";
export default function DetalhesChamadosGeral() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="exibdet3">Exibir Detalhes ⨠</button>
      {show && (
        <div className="modalSetores">
          <Card className="cmodal2">
            <div>
              <span className="titheaderchag">
                Cadeira com a perna faltando, encontrada na sala 6
              </span>
            </div>
            <div className="divisor3"></div>
            <div className="cant">
              <span className="nmaechag">Aluno Exemplo</span>
              <span>11/12/2023 12:04</span>
            </div>
            <div className="divisor3"></div>
            <main>
              <Carousel className="carosselcham">
                <Carousel.Item>
                  <img
                    className="fotochamadofit"
                    src={cadeira1}
                    //src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.preview.app.github.dev/fotos/${data.cha_foto1}`}
                    alt="fotochamado"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="fotochamadofit"
                    src={cadeira2}
                    //src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.preview.app.github.dev/fotos/${data.cha_foto2}`}
                    alt="fotochamado"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="fotochamadofit"
                    src={cadeira3}
                    //src={`https://luizcjr116-solid-cod-jv756wgwwgq35v9r-8080.preview.app.github.dev/fotos/${data.cha_foto3}`}
                    alt="fotochamado"
                  />
                </Carousel.Item>
              </Carousel>
              <p className="paragrf">
                Cadeira com a perna faltando, encontrada na sala 06.
              </p>
              <div>
                <div className="cant2">
                  <span>Local: Sala 06</span>
                  <span>
                    <span
                      style={{
                        borderRadius: "9px",
                        padding: "1px 17px 1px 17px",
                        color: "white",
                        background: "#d32824"
                      }}
                    >
                      {" "}
                      Pendente
                    </span>
                  </span>
                </div>
                <div className="cant2">
                  <span>
                    <span
                      style={{
                        borderRadius: "9px",
                        padding: "1px 5px 1px 5px",
                        color: "white",
                        background: "#67d0a4"
                      }}
                    >
                      {" "}
                      Manutenção de Áreas Comuns
                    </span>
                  </span>
                  <span></span>
                </div>
              </div>
            </main>
            <div className="divisor3"></div>
            <footer>
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="sbot8"
              >
                Fechar
              </button>
            </footer>
          </Card>
        </div>
      )}
    </>
  );
}
