import { useState, useEffect } from "react";
import "./styles.css";
import { useToast } from "../../context/Toast";
import { api } from "../../utils/api";
import { useAuth } from "../../context/Auth/index";

export default function UploadAvatarDsk() {
  const [foto, setFoto] = useState(null);
  const { addToast } = useToast();
  const { user } = useAuth();
  const [id] = useState(user?.usuario.id);

  const handleSubmit = async () => {
    if (!foto) {
      addToast({
        title: "O. R. System",
        message: "Selecione uma imagem antes de enviar.",
        type: "info"
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", foto);

    try {
      const page = await api(`/avatar/${id}`, {
        method: "POST",
        body: formData
      });

      if (page.ok) {
        addToast({
          title: "O. R. System",
          message:
            "Foto atualizada com sucesso. Atualize a página para ver as alterações.",
          type: "info"
        });
        setFoto(null);
      } else {
        const data = await page.json();
        addToast({
          title: "O. R. System",
          message: `Erro: ${data.error || "Erro desconhecido"}`,
          type: "danger"
        });
      }
    } catch (error) {
      addToast({
        title: "O. R. System",
        message: "Erro ao enviar a imagem:",
        error,
        type: "danger"
      });
    }
    window.location.reload();
  };

  useEffect(() => {
    if (foto) {
      handleSubmit();
    }
  }, [foto]);

  return (
    <form encType="multipart/form-data" className="forlb">
      <label htmlFor="selecao-arquivo" className="inpfoto2">
        Atualizar Foto 3x4
      </label>
      <input
        id="selecao-arquivo"
        className="inpfoto"
        type="file"
        onChange={(e) => setFoto(e.target.files[0])}
      />
    </form>
  );
}
