import create from "zustand";
import axios from "axios";

const userStore = create((set) => ({
  users: null,
  // emailError: false,
  modalOpen: false,
  // loggedIn: null,

  // createForm: {
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   image: "",
  // },

  // updateForm: {
  //   _id: null,
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   image: "",
  // },

  fetchUsers: async () => {
    const res = await axios.get("/users");
    set({ users: res.data.users });
  },

  // signup: async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { createForm, users } = userStore.getState();
  //     const res = await axios.post("/signup", createForm);
  //   } catch (err) {
  //     if (
  //       err.response &&
  //       err.response.status >= 400 &&
  //       err.response.status < 500
  //     )
  //       set({
  //         emailError: true,
  //       });
  //     else {
  //       set({
  //         emailError: false,
  //       });
  //     }
  //   }
  // },

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

  updateTeam: async (e) => {
    e.preventDefault();
    const {
      updateForm: { _id, fullName, email, password, image },
      users,
    } = userStore.getState();
    const res = await axios.put(`/user/${_id}`, {
      fullName,
      email,
      password,
      image,
    });
    const newUser = [...users];
    const userIndex = users.findIndex((users) => {
      return users._id === _id;
    });
    newUser[userIndex] = res.data.users;
    set({
      users: newUser,
      updateForm: {
        _id: null,
        fullName: "",
        email: "",
        password: "",
        image: "",
      },
      modalOpen: false,
    });
  },

  deleteUser: async (_id) => {
    const res = await axios.delete(`/users/${_id}`);
    const { users } = userStore.getState();
    const newUser = [...users].filter((users) => {
      return users._id !== _id;
    });
    set({ users: newUser });
  },
}));

export default userStore;
