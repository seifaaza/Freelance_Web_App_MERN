import create from "zustand";
import axios from "axios";

const userStore = create((set) => ({
  users: null,
  modalOpen: false,

  fetchUsers: async () => {
    const res = await axios.get("/users");
    set({ users: res.data.users });
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
