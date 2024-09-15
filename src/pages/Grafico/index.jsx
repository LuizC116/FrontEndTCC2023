import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import LineChart from "./linechart";
import "./style.css";
import { api } from "../../utils/api";

export default function Grafico() {
  const [user1Semestre, setUser1Semestre] = useState({
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use o método api para fazer a requisição
        const response = await api("/chamados");

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const coresSetores = {
          "Manutenção de Computadores": "#5a88cd",
          "Manutenção de Áreas Comuns": "#67d0a4",
          "Manutenção de Periféricos": "#bb5353",
          "Manutenção Elétrica": "#fea975",
          "Manutenção de Encanamento": "#919496"
        };

        // Inicializa o objeto contagemChamados com um objeto vazio para cada setor
        const contagemChamados = {
          "Manutenção de Computadores": Array(6).fill(0),
          "Manutenção de Áreas Comuns": Array(6).fill(0),
          "Manutenção de Periféricos": Array(6).fill(0),
          "Manutenção Elétrica": Array(6).fill(0),
          "Manutenção de Encanamento": Array(6).fill(0)
        };

        data.forEach((chamado) => {
          const dataCriacao = new Date(chamado.created_at);
          const mes = dataCriacao.getMonth();
          const ano = dataCriacao.getFullYear();

          if (ano === 2023 && mes >= 0 && mes <= 5) {
            const setor = chamado.cha_setor;

            // Certifique-se de que contagemChamados[setor] está definido antes de incrementar
            contagemChamados[setor] =
              contagemChamados[setor] || Array(6).fill(0);

            contagemChamados[setor][mes] += 1;
          }
        });

        const datasets = Object.keys(contagemChamados).map((setor) => ({
          label: setor,
          data: contagemChamados[setor],
          backgroundColor: coresSetores[setor],
          borderColor: coresSetores[setor],
          borderWidth: 4
        }));

        setUser1Semestre({
          ...user1Semestre,
          datasets
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const [user2Semestre, setUser2Semestre] = useState({
    labels: ["Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use o método api para fazer a requisição
        const response = await api("/chamados");

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        const coresSetores = {
          "Manutenção de Computadores": "#5a88cd",
          "Manutenção de Áreas Comuns": "#67d0a4",
          "Manutenção de Periféricos": "#bb5353",
          "Manutenção Elétrica": "#fea975",
          "Manutenção de Encanamento": "#919496"
        };

        // Inicializa o objeto contagemChamados com um objeto vazio para cada setor
        const contagemChamados = {
          "Manutenção de Computadores": Array(6).fill(0),
          "Manutenção de Áreas Comuns": Array(6).fill(0),
          "Manutenção de Periféricos": Array(6).fill(0),
          "Manutenção Elétrica": Array(6).fill(0),
          "Manutenção de Encanamento": Array(6).fill(0)
        };

        data.forEach((chamado) => {
          const dataCriacao = new Date(chamado.created_at);
          const mes = dataCriacao.getMonth();
          const ano = dataCriacao.getFullYear();

          if (ano === 2023 && mes >= 5 && mes <= 11) {
            const setor = chamado.cha_setor;

            // Certifique-se de que contagemChamados[setor] está definido antes de incrementar
            contagemChamados[setor] =
              contagemChamados[setor] || Array(6).fill(0);

            contagemChamados[setor][mes - 6] += 1;
          }
        });

        const datasets = Object.keys(contagemChamados).map((setor) => ({
          label: setor,
          data: contagemChamados[setor],
          backgroundColor: coresSetores[setor],
          borderColor: coresSetores[setor],
          borderWidth: 4
        }));

        setUser2Semestre({
          ...user2Semestre,
          datasets
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Fundo">
      <div>
        <div>
          <Card className="graficobg">
            <h1 className="titl">Gráficos - Chamados por setor</h1>
            <div className="divisor3"></div>
            <h1 className="titulusua2">1º Semestre - 2023</h1>
            <div className="divisrusuch"></div>
            <div className="divcardgra">
              <LineChart chartData={user1Semestre} />
            </div>
            <h1 className="titulusua2">2º Semestre - 2023</h1>
            <div className="divisrusuch"></div>
            <div className="divcardgra">
              <LineChart chartData={user2Semestre} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
