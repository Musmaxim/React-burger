import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from "../../services/actions/Ingredients";
import { checkUserAuth } from "../../services/actions/User";
import Main from "../../pages/Main/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import { OrdersHistory } from "../../pages/Profile/OrderHistory";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { Feed } from "../../pages/Feed/Feed";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modals/Modal/Modal";
import IngredientDetails from "../Modals/IngredientDetails/IngredientDetails";
import { useAppDispatch } from "../../store/Hooks";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = (): void => {
    navigate(background);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
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
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
        <Route
          path="/profile/orders"
          element={<OnlyAuth component={<OrdersHistory />} />}
        />
        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<OrderDetails />} />}
        />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<OrderDetails />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderDetails inModal={true} />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderDetails inModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
export default App;
