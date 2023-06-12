import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

type TProtected = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const ProtectedRoute: FC<TProtected> = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store: any) => store.user.isAuthChecked);
  const user = useSelector((store: any) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: TProtected) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
