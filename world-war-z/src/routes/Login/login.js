import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner/banner";
import "./login.css";

let username = "";
let password = "";
let bunker = "";

export default function Login() {
  const [headerItem, setHeaderItem] = useState("Login");
  const [banner, setBanner] = useState({
    show: false,
    status: null,
    message: null,
  });
  const navigate = useNavigate();

  function login() {
    if (username == "" || password == "") {
      setBanner({
        show: true,
        status: false,
        message: "Fill all the input fields please.",
      });
      return;
    }
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": " *",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("http://192.168.1.17:5000/authAPI/login", requestOptions)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res
            .json()
            .then((object) => {
              console.log(object);
              bunker = object.message;
              navigate("/menu/blog", {
                state: {
                  username: username,
                  bunker: bunker,
                },
              });
              /* username = "";
              password = "";
              bunker = ""; */
            })
            .catch((err) => {
              setBanner({
                show: true,
                status: false,
                message: err.message,
              });
            });
        } else {
          setBanner({
            show: true,
            status: false,
            message: "Invalid Credentials!",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setBanner({
          show: true,
          status: false,
          message: err.message,
        });
      });
  }

  function register() {
    if (username == "" || password == "" || bunker == "") {
      setBanner({
        show: true,
        status: false,
        message: "Fill all the input fields please.",
      });
      return;
    }
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": " *",
      },
      body: JSON.stringify({
        [username]: { password: password, bunker: bunker },
      }),
    };

    fetch("http://192.168.1.17:5000/authAPI/register", requestOptions)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          /* username = "";
          password = "";
          bunker = ""; */
          setBanner({
            show: true,
            status: true,
            message: "User registered successfully!",
          });
        } else {
          setBanner({
            show: true,
            status: false,
            message: "Error registering new user!",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setBanner({
          show: true,
          status: false,
          message: err.message,
        });
      });
  }

  if (banner.show)
    setTimeout(() => {
      setBanner({
        show: false,
        status: null,
        message: null,
      });
    }, 10000);

  return (
    <div id="ContainerLogin">
      {banner.show && (
        <Banner status={banner.status} message={banner.message} />
      )}

      <div id="LoginCard" aria-label={headerItem}>
        <div id="Header">
          <p
            className={
              headerItem === "Login" ? "HeaderItemSelected" : "HeaderItem"
            }
            onClick={() => setHeaderItem("Login")}
          >
            Login
          </p>
          <p
            className={
              headerItem === "Sign Up" ? "HeaderItemSelected" : "HeaderItem"
            }
            onClick={() => setHeaderItem("Sign Up")}
          >
            Sign Up
          </p>
        </div>
        <div className="field">
          <label>USERNAME</label>
          <br />
          <input
            type="text"
            className="LoginInput"
            aria-label="UsernameInput"
            placeholder="Example"
            onChange={(e) => (username = e.target.value)}
          />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <br />
          <input
            type="password"
            className="LoginInput"
            aria-label="PasswordInput"
            placeholder="Secret Password"
            onChange={(e) => (password = e.target.value)}
          />
        </div>
        {headerItem === "Login" ? (
          <button
            className="FormButton"
            aria-label="LogIn"
            onClick={() => login()}
          >
            Submit
          </button>
        ) : (
          <>
            <div className="field">
              <label>BUNKER</label>
              <br />
              <input
                type="text"
                className="LoginInput"
                placeholder="Bunker_1"
                onChange={(e) => (bunker = e.target.value)}
              />
            </div>
            <button
              className="FormButton"
              aria-label="Register"
              onClick={() => register()}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
