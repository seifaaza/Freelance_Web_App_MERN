import create from "zustand";
import axios from "axios";

const userStore = create((set) => ({
  modalOpen: false,
  editToggle: false,
  deleteToggle: false,
  addToggle: false,

  users: null,
  user: null,

  image: null,
  updateImage: null,
  test: null,

  skills: [],

  createForm: {
    fullName: "",
    email: "",
    password: "",
    image: "",
    des: "",
    job: "",
  },

  updateForm: {
    _id: null,
    fullName: "",
    email: "",
    password: "",
    image: "",
    des: "",
    job: "",
  },

  handleSkills: (res) => {
    const { skills } = userStore.getState();
    set({ skills: res });
    console.log(skills);
  },

  openDelete: () => {
    set({
      modalOpen: true,
      deleteToggle: true,
      editToggle: false,
      addToggle: false,
    });
  },

  openAdd: () => {
    set({
      modalOpen: true,
      addToggle: true,
      editToggle: false,
      deleteToggle: false,
    });
  },

  openEdit: () => {
    set({
      modalOpen: true,
      editToggle: true,
      deleteToggle: false,
      addToggle: false,
    });
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

  fetchUser: async () => {
    const res = await axios.get("/user/1");
    set({
      user: res.data.user,
    });
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

  updateUser: async (e) => {
    e.preventDefault();
    try {
      const {
        updateForm: { _id, fullName, email, password, image, des, job },
        user,
        updateImage,
        skills,
      } = userStore.getState();
      const formdata = new FormData();
      formdata.append("fullName", fullName);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("image", updateImage);
      formdata.append("job", job);
      formdata.append("des", des);
      for (var i = 0; i < skills.length; i++) {
        formdata.append("skills", skills[i]);
      }
      console.log(skills);
      const res = await axios.put(`/update-user/1`, formdata);
      set({
        user: res.data.user,
        modalOpen: false,
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteUser: async (_id) => {
    const res = await axios.delete(`/user/${_id}`);
    const { users } = userStore.getState();
    const newUser = [...users].filter((users) => {
      return users._id !== _id;
    });
    set({ users: newUser });
  },

  deleteAccount: async (_id) => {
    await axios.delete(`/user-account/${_id}`);
    set({
      modalOpen: false,
    });
    window.location.replace("/started");
  },
}));

export default userStore;
