import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/Hooks";

type TProtected = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

const ProtectedRoute: FC<TProtected> = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useAppSelector((store) => store.user?.isAuthChecked);
  const user = useAppSelector((store) => store.user?.user);
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
export const OnlyUnAuth = React.memo(({ component }: TProtected) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
));
