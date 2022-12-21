import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link
        style={{ textDecoration: "none", color: "royalBlue" }}
        to="/register"
      >
        {" "}
        Don't Have An Account? Register{" "}
      </Link>
    </div>
  );
};
