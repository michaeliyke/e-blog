import axios from "axios";

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
  } else if (!/^[^@\s]+@[^@\s]+\.\w+$/.test(email)) {
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

export const register = async (form) => {
  // send post request to create a new user
  try {
    const res = await request.post("http://127.0.0.1:3000/auth/register/", {
      ...form,
    });
    return res.status;
  } catch (err) {
    return err.status;
  }
};

export const signInFormValidator = (form, setError) => {
  const { email, password } = form;

  if (!email) {
    // return false if no email is given
    setError("** Please enter your email **");
    return false;
  } else if (!/^[^@\s]+@[^@\s]+\.\w+$/.test(email)) {
    // return false if the email is not the right format
    setError("** Email is not in the correct format **");
    return false;
  }
  if (!password) {
    // return false if no password is given
    setError("** Please enter your password **");
    return false;
  }

  return true;
};

export const login = async (form) => {
  // send post request to create a new user
  try {
    const res = await request.post("http://127.0.0.1:3000/auth/login", {
      ...form,
    });
    return { status: res.status };
  } catch (err) {
    // const { message } = err.response.data;
    const { message } = err.response.data;
    return { status: err.status, message };
  }
};

export const request = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const deleteCookie = (name, path = "/", domain = "") => {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
  if (domain) {
    cookieString += ` domain=${domain};`;
  }
  document.cookie = cookieString;
};

export const unify = (word) => {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export function isUserOwner(href, userHref) {
  return href === userHref;
}
