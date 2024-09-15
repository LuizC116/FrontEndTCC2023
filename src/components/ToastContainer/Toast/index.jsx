import { Toast as ToastB } from "react-bootstrap";
import { useToast } from "../../../context/Toast/index";

export function Toast({ id, title, message, type }) {
  const { removeToast } = useToast();

  setTimeout(() => {
    removeToast(id);
  }, 5000);

  return (
    <ToastB bg={type}>
      <ToastB.Header>
        {" "}
        <strong className="me-auto"> {title} </strong>
      </ToastB.Header>
      <ToastB.Body>{message} </ToastB.Body>
    </ToastB>
  );
}
