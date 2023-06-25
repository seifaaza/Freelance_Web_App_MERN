import { create } from "zustand";
import axios from "axios";

const adminStore = create((set) => ({
  modalOpen: false,

  admins: null,

  createForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },

  handleOpen: () => {
    set({ modalOpen: true });
  },
  handleClose: () => {
    set({ modalOpen: false });
  },

  fetchAdmins: async () => {
    const res = await axios.get("/admins");
    set({ admins: res.data.admins });
  },

  addAdmin: async (e) => {
    e.preventDefault();
    const { createForm, admins } = adminStore.getState();
    const res = await axios.post("/admins", createForm);
    set({
      admins: [...admins, res.data.admins],
      createForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      modalOpen: false,
    });
  },

  updateCreateForm: (e) => {
    const { name, value } = e.target;
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },
}));

export default adminStore;
