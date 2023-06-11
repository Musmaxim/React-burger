import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from "../../services/actions/Ingredients";
import { checkUserAuth } from "../../services/actions/User";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import ProfileOrder from "../../pages/ProfileOrder/ProfileOrder";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modals/Modal/Modal";
import IngredientDetails from "../Modals/IngredientDetails/IngredientDetails";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = (): void => {
    navigate("/");
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(checkUserAuth());
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgotPassword"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/resetPassword"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
          <Route
            path="orders"
            element={<OnlyAuth component={<ProfileOrder />} />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal handleCloseModal={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
export default App;
