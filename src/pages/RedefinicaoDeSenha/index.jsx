import React, { useState } from "react";
import { api } from "../../utils/api";
import { Link } from "react-router-dom";
import "./style.css";
import Rebarba from "../../assets/Rebarba.png";
import { object, string, ref } from "yup";
import { useToast } from "../../context/Toast/index";
import { useAuth } from "../../context/Auth/index";

export default function RedefinicaoDeSenha() {
  const [senha, setSenha] = useState("");
  const [contraSenha, setContraSenha] = useState("");
  const [menuAtivo, setMenuAtivo] = useState(1);
  const { addToast } = useToast();
  const { rm, signOutRm } = useAuth();
  const [cod] = useState(rm?.conta?.usu_codverificacao);

  const handleSubmit = async (evt) => {
    //declaro a variável que envia as informações de forma assíncrona(sempre tem que ser assíncrona)
    evt.preventDefault();
    // evt.preventDefault serve para não deixar o sítio carregando indefinidamente
    let novasenha = {
      usu_senha: senha.trim(),
      usu_contrasenha: contraSenha.trim()
    };
    /* Aqui ele declara uma função dentro do código para receber as informações de nome, email, senha, e contrasenha na memória */

    let novasenhaSchema = object({
      usu_senha: string()
        .required("Entre com a senha")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
          "A senha precisa ter no mínimo 6 caracteres, sendo: uma maiúscula, uma minúscula, um número e um caracter especial"
        ),
      //defino os parâmetros da senha através de uma expressão regular, que precisa de 6 caractéres, letras em caixa baixa e caixa alta, números, e símbolos
      usu_contrasenha: string()
        .required("Entre com a contra-senha")
        .oneOf(
          [ref("usu_senha"), null],
          "Senha e Contra-senha tem que ser iguais"
        )
    });
    const showToastForValidation = (errors) => {
      errors.forEach((error) => {
        addToast({
          title: "Erro de Validação",
          message: error.message,
          type: "danger"
        });
      });
    };

    const validatenovasenha = async () => {
      try {
        await novasenhaSchema.validate(novasenha, { abortEarly: false });
      } catch (error) {
        if (error.inner) {
          showToastForValidation(error.inner);
        } else {
          showToastForValidation([error]);
        }
        return false;
      }
      return true;
    };

    const isValidationSuccessful = await validatenovasenha();

    if (isValidationSuccessful) {
      const page = await api(`/defineNewPassword/${cod}`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(novasenha)
      });
      // a variável page converte a variável usuario com as informações para colocar no servidor com o método POST
      let statuspage = parseInt(page.status, 10);
      if (statuspage !== 200) {
        alert(`Erro: ${(await page.json()).error}`);
        return false;
      }
      // primeiro, é declarado a variável statuspage que verifica o código de status de resposta do envio, caso ele não volte com o código 201 ( que é o código de êxito ele retorna falso)

      const data = await page.json();
      if (data.length === 0) {
        alert(`Erro: erro de servidor`);
        return false;
      }
      // quando a variável data voltar com nada, eu exibo a mensagem de erro
      setSenha("");
      setContraSenha("");
      setMenuAtivo(2);
      signOutRm();
    }
  };

  return (
    <div className="content">
      <div className="teste250">
        <img src={Rebarba} alt="Login" className="rebarba" />
        <div className="solct3">
          <div className="margem">
            <p className="logo3">O.R. System</p>
            <div className="divisor1"></div>
            {menuAtivo === 1 && (
              <>
                <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
                  <p className="texts"> Redefinir Senha</p>
                  <div className="divisor2"></div>
                  <table>
                    <tr>
                      <td>Nova Senha:</td>
                      <td>
                        <input
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          placeholder="  Digite Aqui"
                          className="inputsign"
                          type="Password"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div className="divisor2"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>Confirmar Senha:</td>
                      <td>
                        <input
                          value={contraSenha}
                          onChange={(e) => setContraSenha(e.target.value)}
                          placeholder="  Digite Aqui"
                          className="inputsign"
                          type="Password"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div className="divisor2"></div>
                      </td>
                    </tr>
                  </table>
                  <div className="sbotord">
                    <button className="sbotfinalfinal">Alterar Senha</button>
                  </div>
                </form>
              </>
            )}
            {menuAtivo === 2 && (
              <>
                <form className="formulario">
                  <p className="texts"></p>
                  <div className="divisorfinal"></div>
                  <table>
                    <tr>
                      <td>
                        <p className="texts">Senha Redefinida com sucesso.</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="divisor2"></div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="pad2"></td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="divisor2"></div>
                      </td>
                    </tr>
                  </table>
                  <div className="sbotord">
                    <Link as={Link} to="/" className="sbotfinal">
                      Voltar para a página inicial.
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
