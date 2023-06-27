import create from "zustand";
import axios from "axios";

const userStore = create((set) => ({
  modalOpen: false,

  users: null,
  user: null,

  createForm: {
    fullName: "",
    email: "",
    password: "",
    image: "",
    des: "",
    job: "",
  },

  updateForm: {
    fullName: "",
    email: "",
    password: "",
    image: "",
    des: "",
    job: "",
  },

  handleOpen: () => {
    set({ modalOpen: true });
  },
  handleClose: () => {
    set({ modalOpen: false });
  },

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

  toggleUpdate: ({ _id, fullName, image, email, password, des, job }) => {
    set({
      updateForm: {
        _id,
        fullName,
        email,
        password,
        image,
        des,
        job,
      },
      modalOpen: true,
    });
  },

  updateUser: async () => {
    const {
      updateForm: { _id, fullName, email, password, image, job, des },
    } = userStore.getState();
    const res = await axios.put(`/update-user/${_id}`, {
      fullName,
      email,
      password,
      image,
      job,
      des,
    });
    set({
      modalOpen: false,
      updateForm: {
        _id: null,
        fullName: "",
        email: "",
        password: "",
        image: "",
        job: "",
        des: "",
      },
    });
  },

  deleteUser: async (_id) => {
    const res = await axios.delete(`/user/${_id}`);
    const { users } = userStore.getState();
    const newUser = [...users].filter((users) => {
      return users._id !== _id;
    });
    set({ users: newUser });
  },
}));

export default userStore;
