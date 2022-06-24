import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../account/account";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Todo } from "../type/type";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Inputs = {
  username: string;
  password: string;
};
interface props {
  isOpenPortal: boolean;
  setIsOpenPortal: (open: boolean) => void;
  user: string;
  setUser: (user: string) => void;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const LoginPage: React.FC<props> = ({
  todos,
  setTodos,
  user,
  setUser,
  isOpenPortal,
  setIsOpenPortal,
}) => {
  const [open, setOpen] = React.useState(false);
  const [wrong, setWrong] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) {
      auth.accounts.forEach((account) => {
        if (
          account.username === data.username &&
          account.password === data.password
        ) {
          setIsOpenPortal(false);
          setUser(account.name);
        } else {
          setOpen(true);
          setWrong(true);
        }
      });
    }
  };
  return (
    <div className="login-page">
      <p style={{ fontSize: "20px", color: "darkblue" }}>
        Welcome to Task Manager
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          size="small"
          id="log-user-name"
          label="username"
          variant="outlined"
          focused
          autoFocus
          sx={{ marginBottom: "20px", marginTop: "20px" }}
          {...register("username", {
            required: "Required Field",
          })}
          error={!!errors.username || wrong ? true : false}
          helperText={errors?.username ? errors.username.message : null}
        />
        <TextField
          type="password"
          size="small"
          id="log-password"
          label="password"
          variant="outlined"
          focused
          sx={{ marginBottom: "15px" }}
          {...register("password", {
            required: "Required Field",
          })}
          error={!!errors.password || wrong ? true : false}
          helperText={errors?.password ? errors.password.message : null}
        />
        <Button
          type="submit"
          onSubmit={(e) => e.preventDefault}
          endIcon={<SendIcon />}
          variant="contained"
        >
          Login
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Oops, there is a problem with your username or password
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
