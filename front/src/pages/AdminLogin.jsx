import LoginForm from "../components/LoginForm"

export default function AdminLogin() {
  
  return (
    <div>
      <h1>
        Admin Login
      </h1>
      <LoginForm submitTo={"../api/v1/admin/login"} next={"/admin/panel"}/>
    </div>
  )
}