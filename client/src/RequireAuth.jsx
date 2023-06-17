import { useEffect } from "react";
import authStore from "./stores/AuthStore";
import Started from "./pages/started/Started";
import Progress from "./Progress";
import Profile from "./pages/profile/Profile";

function RequireAuth(props) {
  const store = authStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);

  if (authStore.loggedIn === true) {
    return <Profile />;
  }

  if (store.loggedIn === null) {
    return <Progress />;
  }

  if (store.loggedIn === false) {
    return <Started />;
  }

  return <div>{props.children}</div>;
}

export default RequireAuth;
