import { useState, useEffect } from "react";
import { api } from "../../utils/api";

export default function Ativador({ data }) {
  const [cod] = useState(data.usu_codverificacao);

  useEffect(() => {
    const handleUpdate = async () => {
      const page = await api(`/activate/${cod}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      });

      const statuspage = parseInt(page.status, 10);

      if (statuspage !== 200) {
        return false;
      }

      const responseData = await page.json();

      if (responseData.length === 0) {
        return false;
      }
    };

    handleUpdate();
  }, [cod]);

  return null; // Este componente não renderiza nada, então retornamos null
}
