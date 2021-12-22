import AuthForm, { Mode } from "../components/authForm";

const Signin = () => {
  return <AuthForm mode={Mode.signin} />;
};

Signin.authPage = true;

export default Signin;
