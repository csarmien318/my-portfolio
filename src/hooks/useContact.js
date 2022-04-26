import { useState, useEffect } from "react";
import axios from "axios";
import { omit } from "lodash";

export const useContact = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [values]);

  const validate = (name, value) => {
    switch (name) {
      case "username":
        if (value.length <= 1) {
          setErrors({
            ...errors,
            username: "Your name must contain at least 2 letters",
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;

      case "email":
        if (
          !new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Please enter a valid email (ex: johndoe@email.com)",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;
      // default:
      // break;
    }
  };

  const handleChange = (e) => {
    e.persist();

    let name = e.target.name;
    let val = e.target.value;

    validate(name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      console.log("Form Values: ", values);
      try {
        await axios.post("http://localhost:8080/api/auth");
        await axios.post("http://localhost:8080/api/save", values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        alert("Your response was submitted, thank you for reaching out!");
        window.location.reload();
      } catch (error) {
        alert(error?.response);
      }
    } else {
      alert(
        "Form was not submitted. Make sure required fields were filled correctly."
      );
    }
  };

  return {
    values,
    errors,
    submitted,
    validate,
    setValues,
    handleChange,
    handleSubmit,
  };
};
