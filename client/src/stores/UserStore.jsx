import create from "zustand";
import axios from "axios";

const userStore = create((set) => ({
  modalOpen: false,

  users: null,
  user: null,

  image: null,
  updateImage: null,

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

  handleImage: (e) => {
    set({
      image: e.target.files[0],
    });
  },

  handleUpdateImage: (e) => {
    set({
      updateImage: e.target.files[0],
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
      image,
      modalOpen: true,
    });
  },

  // updateUser: async () => {
  //   const {
  //     updateForm: { _id, fullName, email, password, image, job, des },
  //   } = userStore.getState();
  //   const res = await axios.put(`/update-user/${_id}`, {
  //     fullName,
  //     email,
  //     password,
  //     image,
  //     job,
  //     des,
  //   });
  //   set({
  //     modalOpen: false,
  //     updateForm: {
  //       _id: null,
  //       fullName: "",
  //       email: "",
  //       password: "",
  //       image: "",
  //       job: "",
  //       des: "",
  //     },
  //   });
  // },

  updateUser: async () => {
    const {
      updateForm: { _id, fullName, email, password, image, job, des },
      updateImage,
    } = userStore.getState();
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("fullName", fullName);
    formdata.append("password", password);
    formdata.append("image", updateImage);
    formdata.append("job", job);
    formdata.append("des", des);
    const res = await axios.put(`/update-user/${_id}`, formdata);
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
