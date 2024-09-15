import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth/index";
import "./styles.css";
import { api, baseURL } from "../../utils/api";
import { useToast } from "../../context/Toast";

export default function FotoHeader() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const { addToast } = useToast();
  const [id] = useState(user?.usuario.id);

  useEffect(() => {
    let url = `/usuarios?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await api(url);
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        addToast({
          title: "O. R. System",
          message: `Erro ao buscar dados: ${error.message}`,
          type: "danger",
        });
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {Array.isArray(data) &&
        data.map((element) => (
          <img
            src={`${baseURL}/files/${element.usu_foto}`}
            alt="foto de perfil"
            className="fperfilmob"
          />
        ))}
    </>
  );
}
