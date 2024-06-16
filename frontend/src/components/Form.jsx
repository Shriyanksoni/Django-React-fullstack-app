import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCSESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method == "login") {
        localStorage.setItem(ACCSESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="Enter User Name"
      />
      <input
        className="form-input"
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      {/* {isLoading && <LoadingIndicator />} */}
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default Form;
