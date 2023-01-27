import React from "react";
import { users } from "../../App";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../../css/App.css";

// pages users pour afficher les profils qui veut aimer
export const Users = () => {
  const { me } = React.useContext(users);
  const [user, setUser] = React.useState({});
  const [profil, setProfil] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmitLike = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profil: p.users?.id,
          like: p.users?.id,
          usersId: p.users?.id,
          users: me,
        }),
      });

      if (res.status === 201) {
        setMessage({ id: p.users.id, message: "You have Like" });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  const handleSubmitNoLike = async (p) => {
    try {
      const res = await fetch("http://localhost:3000/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profil: p.users?.id,
          dislike: p.users?.id,
          usersId: p.users?.id,
          users: me,
        }),
      });

      if (res.status === 201) {
        setMessage({ id: p.users.id, message: "You have No Like " });
      } else {
        res.status === 400 && setMessage("Some error occured");
      }
    } catch (err) {
      console.log("ERREUR", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/users/${me}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/profil`)
      .then((res) => res.json())
      .then((data) => setProfil(data))
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
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/users"
                    >
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

      <h1 className="h1">Home</h1>
      <form className="container">
        <div className="form-group">
          <div className="input-group">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              type="number"
              name="search"
              placeholder="Search Age "
              required
            />
          </div>
        </div>
      </form>

      {profil
        .filter((p, i) => p.users?.age == search)
        .map((p, i) => {
          return (
            <div key={i}>
              <div className="card">
                <img src={p.photo} className="card-img-top" alt="photo" />
                <div className="card-body">
                  <h5 className="card-title">
                    Pseudo : {p.users.lastname} {p.users.firstname}
                  </h5>
                  <p> Distance : {p.distance} km </p>
                  <p> Age : {p.users.age} ans </p>
                  <p> Ville : {p.users.city} </p>
                  <p> Sexe : {p.users.sexe} </p>
                  <p className="card-text">
                    {`Description : ` + p.description}
                  </p>
                  <div>
                    <button
                      onClick={() => handleSubmitLike(p)}
                      className="btn btn-success"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-heart"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="text-end">
                    <button
                      onClick={() => handleSubmitNoLike(p)}
                      className="btn btn-danger"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-heart-off"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M3 3l18 18m-1.5 -8.428l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572"></path>
                      </svg>
                    </button>
                    <p id="message">
                      {p.users.id === message.id && message.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
