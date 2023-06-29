import { create } from "zustand";
import axios from "axios";

const adminStore = create((set) => ({
  modalOpen: false,

  admins: null,
  admin: null,

  createForm: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },

  updateForm: {
    _id: null,
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

  fetchAdmin: async () => {
    const res = await axios.get("/admin/1");
    set({
      admin: res.data.admin,
    });
  },

  addAdmin: async (e) => {
    e.preventDefault();
    const { createForm, admins } = adminStore.getState();

    const res = await axios.post("/admin", createForm);
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

  handleUpdateFieldChange: (e) => {
    const { value, name } = e.target;
    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  toggleUpdate: ({ _id, firstName, lastName, email, password }) => {
    set({
      updateForm: {
        _id,
        firstName,
        lastName,
        email,
        password,
      },
      modalOpen: true,
    });
  },

  toggleDelete: () => {
    set({
      modalOpen: true,
    });
  },

  updateAdmin: async (e) => {
    e.preventDefault();
    const {
      updateForm: { _id, firstName, lastName, email, password },
      admin,
    } = adminStore.getState();
    const res = await axios.put(`/admin/${_id}`, {
      firstName,
      lastName,
      email,
      password,
    });
    set({
      admin: res.data.admin,
      updateForm: {
        _id: null,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      modalOpen: false,
    });
  },

  deleteAdmin: async (_id) => {
    await axios.delete(`/admin/${_id}`);
    set({
      modalOpen: false,
    });
    window.location.replace("/dashboard");
  },
}));

export default adminStore;
