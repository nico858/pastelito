import "../styles/register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { registerRequest } from "../api/auth";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (values) => {
    //onsole.log(values);
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
    <div>
      <div className="login-box">
        <h2>Regístrate</h2>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link className="fontStyle" to="/login">
            Inicia Sesión
          </Link>
        </p>
        <form onSubmit={onSubmit}>
          <div className="user-box">
            <input
              type="text"
              {...register("firstName")}
              placeholder="Nombre completo"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              {...register("lastName")}
              placeholder="Apellido"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              {...register("email")}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="user-box">
            <input
              type="number"
              {...register("phone")}
              placeholder="Teléfono"
              required
            />
          </div>
          <div className="user-box">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("userPassword")}
                placeholder="Contraseña"
                required
              />
              <FontAwesomeIcon
                className="password-icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="centerButton">
            <button type="submit">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}
