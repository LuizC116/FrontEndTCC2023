import "./styles.css";
import React, { useState } from "react";
import { useToast } from "../../context/Toast";
import { useAuth } from "../../context/Auth/index";
import { api } from "../../utils/api";

export default function AtivarConta() {
  const { addToast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async () => {
    const page = await api(
      `/activationrequest/${user?.usuario?.usu_rmcodigo}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }
    );

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
      message: "Confira seu E-mail.",
      type: "info"
    });
  };

  return (
    <button className="botaosolicitacao" onClick={handleSubmit}>
      Ativar Conta
    </button>
  );
}
