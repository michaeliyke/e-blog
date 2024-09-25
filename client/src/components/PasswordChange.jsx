import PropTypes from "prop-types";
import { useState } from "react";
import { request } from "../util/Tools";

export const PasswordChange = ({ toogleEditPasswordProfile }) => {
  const [error, setError] = useState("");
  const [pwdData, setPwdData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handlePasswordChange(e) {
    const { name, value } = e.target;
    setPwdData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmitPassword(e) {
    e.preventDefault();
    setError("");
    if (
      !(pwdData.oldPassword && pwdData.newPassword && pwdData.confirmPassword)
    ) {
      setError("Make sure you fill all fields");
      return;
    } else if (
      pwdData.newPassword.length < 8 ||
      pwdData.confirmPassword.length < 8
    ) {
      setError("New password must have more than 8 characters");
      return;
    } else if (pwdData.newPassword !== pwdData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("oldPassword", pwdData.oldPassword);
    formData.append("newPassword", pwdData.newPassword);
    formData.append("confirmPassword", pwdData.confirmPassword);
    try {
      request
        .put("http://127.0.0.1:3000/users/pwd-ch", formData)
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/profile";
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    } catch (err) {
      console.log("an error occurred", err);
    }
  }

  function editProfile(e) {
    e.preventDefault();
    toogleEditPasswordProfile(true);
  }
  return (
    <form onSubmit={handleSubmitPassword}>
      {/* Error message */}
      <div className="h-20">
        {error ? (
          <p className="text-center text-red-500 text-lg font-poppins font-medium">
            {error}
          </p>
        ) : (
          <br />
        )}
      </div>
      {/* Old Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Old Password
        </label>
        <input
          type="password"
          name="oldPassword"
          value={pwdData.oldPassword}
          onChange={handlePasswordChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* New Password */}
      <div className="flex justify-between gap-5">
        <div className="mb-4 flex-1">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={pwdData.newPassword}
            onChange={handlePasswordChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4 flex-1">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={pwdData.confirmPassword}
            onChange={handlePasswordChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-between">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
        >
          Save Changes
        </button>
        <button
          onClick={editProfile}
          className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
    </form>
  );
};

PasswordChange.propTypes = {
  toogleEditPasswordProfile: PropTypes.func.isRequired,
};
