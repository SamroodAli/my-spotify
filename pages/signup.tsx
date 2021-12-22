import AuthForm, { Mode } from "../components/authForm";

const Signup = () => {
  return <AuthForm mode={Mode.signup} />;
};

Signup.authPage = true;

export default Signup;
