import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginError: false,

  loginForm: {
    email: "",
    password: "",
  },

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

  login: async (e) => {
    try {
      e.preventDefault();
      const { loginForm } = authStore.getState();
      const res = await axios.post("/login", loginForm, {
        withCredentials: true,
      });
      window.location.replace("/profile");
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
      await axios("/check-auth", { withCredentials: true });
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
}));

export default authStore;
