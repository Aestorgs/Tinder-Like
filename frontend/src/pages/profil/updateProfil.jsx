import React from "react";
import { Link } from "react-router-dom";
import { users } from "../../App";
import { useEffect } from "react";

// pages updateprofil pour modifier sont profil 
export const UpdateProfil = () => {
    const [photo, setPhoto] = React.useState("");
    const [distance, setDistance] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [data, setData] = React.useState("");
    const fileRef = React.useRef();
    const [message, setMessage] = React.useState("");
    const { me } = React.useContext(users);
    const [user, setUser] = React.useState({});
    const [profil, setProfil] = React.useState({});
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const form = new FormData();
        form.append("file", photo);
        form.append("upload_preset", import.meta.env.VITE_upload_preset);
        form.append("cloud_name", import.meta.env.VITE_cloud_name);
        form.append("tags", import.meta.env.VITE_tags);
        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloud_name}}/image/upload`, {
          method: "POST",
          body: form,
        })
          .then((res) => res.json())
          .then(async (data) => {
            setData(data);
            const res = await fetch(`http://localhost:3000/profil/${me}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                photo: data.url,
                description: description,
                distance: distance,
                users: me,
              }),
            });
            if (res.status === 200 || res.body) {
               setMessage("Update profil is success")
            }
            else {
              res.status === 400 && setMessage("Some error occured");
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log("ERREUR", err);
      }
    };
  
    
    const handleDelete = () => {
      const form = new FormData();
      form.append("token", data.delete_token);
      fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloud_name}/delete_by_token`, {
        method: "POST",
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          setData("");
          fileRef.current.value = "";
        })
        .catch((err) => console.log(err));
    };
  
  
    useEffect(() => {
      fetch(`http://localhost:3000/users/${me}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
      fetch(`http://localhost:3000/profil/${me}`)
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
                    <Link className="nav-link" aria-current="page" to="/users">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/updateProfil" className="nav-link active" href="#">
                      Update Profil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/updateUsers">
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

      <h1 className="h1">Update Profil</h1>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-group">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleDelete}
                >
                  X
                </button>
                <img src={data.url} alt={"uploaded"} />
                <input
                  className="form-control"
                  type={"file"}
                  ref={fileRef}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  placeholder={profil.distance}
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div className="mb3">
                <div className="form-group">
                  <textarea
                    rows="5"
                    className="form-control form-control-lg"
                    placeholder={profil.description}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  onSubmit={handleSubmit}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Update Profil
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
    )
}