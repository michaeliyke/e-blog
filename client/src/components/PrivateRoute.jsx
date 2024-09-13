import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { authenticateUser } from "../state/AuthSlice/AuthSlice";

export const PrivateRoute = ({ open = false, element: Element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        await dispatch(authenticateUser());
      } catch (err) {
        console.log("error on dispatch", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserStatus();
  }, [dispatch, setIsLoading]);

  if (isLoading) return null;

  if (open) return <Element />;

  return isAuthenticated ? <Element /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  open: PropTypes.bool,
  element: PropTypes.elementType.isRequired,
};
