import "./styles.css";
import React, { useState } from "react";
import { object, string } from "yup";
import { useToast } from "../../context/Toast";
import { useAuth } from "../../context/Auth/index";
import { api } from "../../utils/api";

export default function SolicitacaoBotao({ data }) {
  const { addToast } = useToast();
  const { user } = useAuth();
  const [solAtiva] = useState(data.usu_solativa);
  const [id] = useState(user?.usuario.id);
  const [senha] = useState(data.usu_senha);
  const [nivel] = useState(data.usu_nivel);

  const handleSubmit = async () => {
    if (solAtiva === true) {
      addToast({
        title: "O. R. System",
        message: "Solicitação já enviada.",
        type: "danger"
      });
      return;
    }
    if (nivel === "administrador") {
      addToast({
        title: "O. R. System",
        message: "Reinicie sua sessão.",
        type: "danger"
      });
      return;
    }

    const solicitacao = {
      usu_solativa: true,
      usu_nivel: nivel.trim(),
      usu_senha: senha.trim(),
      usu_solenviada: new Date()
    };

    const solicitacaoSchema = object({
      usu_solativa: string().required(
        "É necessário enviar uma solicitação para atualizá-lo."
      ),
      usu_nivel: string().required("Não foi possível enviar."),
      usu_solenviada: string().required("Não foi possível enviar.")
    });

    try {
      await solicitacaoSchema.validate(solicitacao);
    } catch (error) {
      addToast({
        title: "O. R. System",
        message: `Erro ao buscar dados: ${error.message}`,
        type: "danger"
      });
      return false;
    }

    const page = await api(`/usuarios/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(solicitacao)
    });

    const statuspage = parseInt(page.status, 10);

    if (statuspage !== 200) {
      addToast({
        title: "O. R. System",
        message: `Erro: ${(await page.json()).error}`,
        type: "danger"
      });
      return false;
    }

    const responseData = await page.json();

    if (responseData.length === 0) {
      addToast({
        title: "O. R. System",
        message: "Erro: Erro de servidor.",
        type: "danger"
      });
      return false;
    }

    addToast({
      title: "O. R. System",
      message:
        "Solicitação Enviada. O resultado da solicitação será enviado ao seu E-mail em tempo.",
      type: "info"
    });
  };

  return (
    <button className="botaosolicitacao" onClick={handleSubmit}>
      Solicitação para ADM
    </button>
  );
}
