import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth">
      <h2>Signup</h2>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={() => navigate("/")}>Signup</button>
    </div>
  );
}

export default Signup;
