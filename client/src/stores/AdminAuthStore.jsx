import create from "zustand";
import axios from "axios";

const adminAuthStore = create((set) => ({
  loggedIn: null,

  loginError: false,

  loginForm: {
    email: "",
    password: "",
  },
  admin: null,

  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    try {
      const { loginForm } = adminAuthStore.getState();
      const res = await axios.post("/admin-login", loginForm, {
        withCredentials: true,
      });
      set({
        loggedIn: true,
        loginForm: {
          email: "",
          password: "",
        },
      });
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      )
        set({
          loginError: true,
        });
      else {
        set({
          loginError: false,
        });
      }
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/admin-check-auth", {
        withCredentials: true,
      });
      set({
        loggedIn: true,
        admin: res.data.admin,
      });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  logout: async () => {
    await axios.get("/admin-logout", { withCredentials: true });
    set({ loggedIn: false });
  },
}));

export default adminAuthStore;
