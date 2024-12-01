import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <div className="Home">
      <h2>Your Trusted Partner in Banking</h2>
      <p className="snippet">
        MoBank provides seamless and secure banking solutions tailored to meet your financial needs. Sign up today and experience a modern approach to banking.
      </p>
      <LoginForm submitTo={"api/v1/login"} next={"/dashboard"}/>
      <div className="signupLink">
        <p>Don't have an account? <Link to={"/signup"}>Sign up here!</Link></p>
      </div>
    </div>
  );
}
