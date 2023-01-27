import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/users/users";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { Home } from "./pages/home/home";
import { Profil } from "./pages/profil/profil";
import { Layout } from "./components/loyout/loyout";
import { UpdateProfil } from "./pages/profil/updateProfil";
import { UpdateUsers } from "./pages/profil/updateUsers";
import { Contact } from "./pages/contact/contact"

// app est pour utiliser les routes 
export const users = React.createContext();

const App = () => {
  const [me, setMe] = React.useState();
  return (
    <>
      <users.Provider value={{ me, setMe }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route path="/profil" element={<Profil />} />
            <Route path="/users" element={<Users />} />
            <Route path="/updateProfil" element={<UpdateProfil />} />
            <Route path="/updateUsers" element={<UpdateUsers />} />
            <Route path="/contact" element={<Contact/>} />
          </Route>
        </Routes>
      </users.Provider>
    </>
  );
};

export default App;
