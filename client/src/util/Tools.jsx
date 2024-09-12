export const formValidator = (form, setError) => {
  // form validator
  // check teh validity of the form
  const {
    firstname,
    lastname,
    email,
    password,
    repeatedPassword,
    termsAgreed,
  } = form;

  if (!firstname) {
    // return false if no firstname is given
    setError("** Please enter your first name **");
    return false;
  }

  if (!lastname) {
    // return false if no lastname is given
    setError("** Please enter your last name **");
    return false;
  }

  if (!email) {
    // return false if no email is given
    setError("** Please enter your email **");
    return false;
  } else if (!/[^@]+@[^@]+\.\w+/.test(email)) {
    // return false if the email is not the right format
    setError("** Email is not in the correct format **");
    return false;
  }

  if (!password) {
    // return false if no password is given
    setError("** Please set a password **");
    return false;
  } else if (password.length < 8) {
    // return false if password is less than 8 chars
    setError("** Password is too short **");
    return false;
  }

  if (!repeatedPassword) {
    // return false if no confirme password is given
    setError("** Please confirme the password **");
    return false;
  }

  if (password !== repeatedPassword) {
    // return false if the confirme password is not identical to the password
    setError("** The two passwords are not identical **");
    return false;
  }

  if (!termsAgreed) {
    // return false if the user didn't agree to the terms
    setError("** You haven't agreed to our terms **");
    return false;
  }

  // at the this point the form is all correct
  return true;
};

export const register = async ({
  // send post request to create a new user
  firstname,
  lastname,
  email,
  password,
  repeatedPassword,
}) => {
  const res = await fetch("http://127.0.0.1:3000/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify JSON data in the request
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
      repeatedPassword,
    }),
  });
  return res;
};
