import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../css/App.css";

// pages register pour crée un utlisateur  
export const Register = () => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [city, setCity] = React.useState("");
  const [age, setAge] = React.useState("");
  const [sexe, setSexe] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstLogs, setFirstLogs] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          city: city,
          age: Number(age),
          sexe: sexe,
          email: email,
          password: password,
          firstLogs : firstLogs
        }),
      });

      if (res.status === 201) {
        navigate("/login");
      } else {
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
                    <Link to="/login" className="nav-link " href="#">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link active" href="#">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <h1 className="h1">Register</h1>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  id="gender"
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  required
                >
                  <option hidden>Select Gender</option>
                  <option value={"man"}>Man</option>
                  <option value={"women"}>Women</option>
                  <option value={"transgender"}>Transgender</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="Firstname"
                  type="texr"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="Lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
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
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder="Age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  onSubmit={handleSubmit}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Register
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
