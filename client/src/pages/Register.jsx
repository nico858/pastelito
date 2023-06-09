import "../styles/register.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <form
          onSubmit={handleSubmit((values) => {
            console.log(values);
          })}
        >
          <div className="user-box">
            <label className="font">Nombre</label>
            <input
              type="text"
              {...register("clientName", { required: true })}
            />
          </div>
          <div className="user-box">
            <label>Apellido</label>
            <input type="text" {...register("lastname", { required: true })} />
          </div>
          <div className="user-box">
            <label>Correo</label>
            <input type="text" {...register("email", { required: true })} />
          </div>
          <div className="user-box">
            <label>Contraseña</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <FontAwesomeIcon
                className="password-icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}
