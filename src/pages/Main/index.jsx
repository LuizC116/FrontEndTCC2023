import "./style.css";
import LogoSite from "../../assets/LogoSite.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";

export default function Main() {
  const { user } = useAuth();
  return (
    <div className="cor">
      <div className="espaco1">
        <img src={LogoSite} alt="Logo" className="logo1" />
      </div>
      <div className="cor2">
        <div className="msgi">
          <span className="bvindos">
            Bem-vindo ao Sistema de Chamados Abertos
          </span>
        </div>
        <div className="botaoini">
          {user?.usuario?.id ? (
            <>
              <Link as={Link} to="/Header/Chamados" className="button1">
                {" "}
                Entrar
              </Link>
            </>
          ) : (
            <>
              <Link as={Link} to="/signin" className="button1">
                {" "}
                Entrar
              </Link>
            </>
          )}
          <div className="teste">
            <h2 className="rodap1">@PrimEtec - 2023</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
