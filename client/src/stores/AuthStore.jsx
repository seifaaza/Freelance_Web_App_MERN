import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
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
}));

export default authStore;
