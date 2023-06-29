import create from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  modalOpen: false,
  loggedIn: null,

  loginError: false,
  emailError: false,

  loginForm: {
    email: "",
    password: "",
  },

  signUpForm: {
    fullName: "",
    email: "",
    password: "",
  },

  userId: null,

  handleClose: () => {
    set({ modalOpen: false });
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

  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        signUpForm: {
          ...state.signUpForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    try {
      const { loginForm } = authStore.getState();
      const res = await axios.post("/login", loginForm, {
        withCredentials: true,
      });
      set({
        loggedIn: true,
        loginForm: {
          email: "",
          password: "",
        },
        modalOpen: true,
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

  signup: async () => {
    try {
      const { signUpForm } = authStore.getState();
      const res = await axios.post("/signup", signUpForm, {
        withCredentials: true,
      });
      set({
        loggedIn: true,
        signUpForm: {
          fullName: "",
          email: "",
          password: "",
        },
        modalOpen: true,
      });
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      )
        set({
          emailError: true,
        });
      else {
        set({
          emailError: false,
        });
      }
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios("/check-auth", { withCredentials: true });
      set({
        loggedIn: true,
        //  user: res.data.user,
        //  userId: res.data.user._id
      });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  logout: async () => {
    await axios.get("/logout", { withCredentials: true });
    window.location.replace("/started");
    set({ loggedIn: false });
  },
}));

export default authStore;
