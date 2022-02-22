import { useState, useEffect } from "react";
import { omit } from "lodash";

export const useContact = (callback) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [values]);

  const validate = (event, name, value) => {
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
      default:
        break;
    }
  };

  const handleChange = (event) => {
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      callback();
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
    handleChange,
    handleSubmit,
  };
};
