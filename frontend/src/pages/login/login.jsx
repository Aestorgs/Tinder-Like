import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/App.css";
import { users } from "../../App";
import { useEffect } from "react";

// pages login pour ce connecter 
export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { setMe } = React.useContext(users);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data)
       await fetch(`http://localhost:3000/users/${data.users}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstLogs" : false
        }),
      });
      if (res.status === 200 && data.firstLogs === true) {
        navigate("/profil");
        setMe(data.users);
      }
      else if (res.status === 200 && data.firstLogs === false){
        navigate("/users")
      }
      else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-dark bg-dark ">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Tinder Like
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end text-bg-dark"
              tabIndex="-1"
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                  Menu
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/login" className="nav-link active" href="#">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link" href="#">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <h1 className="Loginh1">Login</h1>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <input
                  _ngcontent-c0=""
                  className="form-control form-control-lg"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  onSubmit={handleSubmit}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Login
                </button>
                <div className="message">
                  {message ? <p>{message}</p> : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
