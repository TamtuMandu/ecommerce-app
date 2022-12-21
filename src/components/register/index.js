import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  return (
    <div>
      <RegisterForm />
      <Link style={{ textDecoration: "none", color: "royalBlue" }} to="/login">
        {" "}
        Already Have An Account?{" "}
      </Link>
    </div>
  );
};
