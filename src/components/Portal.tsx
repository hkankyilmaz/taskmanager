import { createPortal } from "react-dom";
import "./Portal.css";
import LoginPage from "./LoginPage";
import { Todo } from "../type/type";
interface props {
  isOpenPortal: boolean;
  setIsOpenPortal: (open: boolean) => void;
  user: string;
  setUser: (user: string) => void;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const Portal: React.FC<props> = ({
  todos,
  setTodos,
  user,
  setUser,
  isOpenPortal,
  setIsOpenPortal,
}) => {
  if (!isOpenPortal) return null;

  return createPortal(
    <div className="modal-container">
      <LoginPage
        todos={todos}
        setTodos={setTodos}
        user={user}
        setUser={setUser}
        isOpenPortal={isOpenPortal}
        setIsOpenPortal={setIsOpenPortal}
      />
    </div>,
    document.getElementById("root") as HTMLElement
  );
};

export default Portal;
