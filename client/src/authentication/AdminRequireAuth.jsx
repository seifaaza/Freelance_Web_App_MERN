import { useEffect } from "react";
import adminAuthStore from "../stores/AdminAuthStore";
import AdminLogin from "../pages/dashboard/AdminLogin";
import Progress from "../Progress";
import Dashboard from "../aside/aside-items/Users";

function AdminRequireAuth(props) {
  const store = adminAuthStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);

  if (adminAuthStore.loggedIn === true) {
    return <Dashboard />;
  }

  if (store.loggedIn === null) {
    return <Progress />;
  }

  if (store.loggedIn === false) {
    return <AdminLogin />;
  }

  return <div>{props.children}</div>;
}

export default AdminRequireAuth;
