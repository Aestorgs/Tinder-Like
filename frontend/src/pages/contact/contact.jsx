import { Link } from "react-router-dom";
import React from "react";
import { users } from "../../App";
import "../../css/App.css";
import { useEffect } from "react";

// pages contact afficher les contacts qui on été aimer 
export const Contact = () => {
  const { me } = React.useContext(users);
  const [user, setUser] = React.useState({});
  const [home, setHome] = React.useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/users/contact/${me}`)
      .then((res) => res.json())
      .then((data) => setHome(data.home))
      .catch((err) => console.log(err));
  }, []);

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
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/updateProfil"
                    >
                      Update Profil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/updateUsers"
                    >
                      Update Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
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

      <h1 className="h1">Contact</h1>
      <div className="list">
        {home.map((p, i) => {
          if (p.like === null || p.like === undefined) {
            return;
          } else {
            return (
              <div key={i}>
                <div className="card">
                  <img src={p.like?.photo} alt="photo" />
                  <div className="text-center">
                    <button className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-message-circle-2"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Pseudo : {p.usersId.lastname} {p.usersId.firstname}
                    </h5>
                    <p> Distance : {p.like?.distance} km</p>
                    <p> Ville : {p.usersId.city} </p>
                    <p> Sexe : {p.usersId.sexe} </p>
                    <p> Description : {p.like?.description}</p>
                  </div>
                  
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
