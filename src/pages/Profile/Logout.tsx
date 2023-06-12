import { useEffect } from "react";
import { logout } from "../../services/actions/User";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/Hooks";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/login");
    // eslint-disable-next-line
  }, []);

  return null;
};

export default Logout;
