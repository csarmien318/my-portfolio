import { useState, useEffect } from "react";
import { omit } from "lodash";

const useLogin = (callback) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   console.log("useLogin errors: ", errors);
  // }, [errors]);

  const validate = (name, value) => {
    switch (name) {
      case "username":
        if (!new RegExp(/^[A-Za-z-0-9]+$/).test(value) || value.length !== 8) {
          setErrors({
            ...errors,
            username: true,
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;

      case "password":
        if (!new RegExp(/^[A-Za-z-0-9]+$/).test(value) || value.length !== 12) {
          setErrors({
            ...errors,
            password: true,
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;
    }
  };

  const handleChange = (e) => {
    e.persist();

    let name = e.target.name;
    let val = e.target.value;

    validate(name, val);

    if (name === "username") setUsername(val);
    if (name === "password") setPassword(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) callback();
    else {
      alert("Incorrect username or password");
      window.location.reload();
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
