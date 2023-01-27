import React from "react";
import { Link } from "react-router-dom";
import { users } from "../../App";
import { useEffect } from "react";

// pages updateusers pour modifier sont utilisateur 
export const UpdateUsers = () => {
    const { me } = React.useContext(users);
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [city, setCity] = React.useState("");
    const [age, setAge] = React.useState("");
    const [sexe, setSexe] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [user, setUser] = React.useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/users/${me}`)
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch((err) => console.log(err));
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`http://localhost:3000/users/${me}`, {
            method: "PUT",
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
            }),
          });
    
          if (res.status === 200) {
            setMessage("Update the users")
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
            <Link className="navbar-brand" to="/users">
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
                  {user.lastname} {user.firstname}
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
                    <Link className="nav-link" aria-current="page" to="/users">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/updateProfil" className="nav-link " href="#">
                      Update Profil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/updateUsers">
                      Update Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>


      <h1 className="h1">Update Users</h1>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.firstname}
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.lastname}
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.city}
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.age}
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.sexe}
                  type="text"
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={user.email}
                  type="text"
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
                  Update Users
                </button>
                <div className="message">
                  {message ? <p>{message}</p> : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>)
}