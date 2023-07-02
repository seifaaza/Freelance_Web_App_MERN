import { create } from "zustand";
import axios from "axios";

const serviceStore = create((set) => ({
  modalOpen: false,

  services: null,
  service: null,

  createForm: {
    title: "",
    des: "",
    price: "",
  },

  image: null,
  updateImage: null,

  showForm: {
    _id: null,
    title: "",
    des: "",
    price: "",
    image: "",
  },

  handleOpen: () => {
    set({ modalOpen: true });
  },
  handleClose: () => {
    set({ modalOpen: false });
  },

  fetchServices: async () => {
    const res = await axios.get("/services");
    set({ services: res.data.services });
  },

  // fetchService: async (_id) => {
  //   const res = await axios.get(`/service/${_id}`);
  //   set({
  //     service: res.data.service,
  //     modalOpen: true,
  //   });
  // },

  toggleShow: ({ _id, title, des, image, price }) => {
    set({
      showForm: {
        _id,
        title,
        des,
        image,
        price,
      },
      modalOpen: true,
    });
  },

  //   addTeam: async (e) => {
  //     e.preventDefault();
  //     const { createForm, team, image } = serviceStore.getState();
  //     const formdata = new FormData();
  //     formdata.append("email", createForm.email);
  //     formdata.append("fullName", createForm.fullName);
  //     formdata.append("linkedin", createForm.linkedin);
  //     formdata.append("figma", createForm.figma);
  //     formdata.append("github", createForm.github);
  //     formdata.append("image", image);
  //     const res = await axios.post("/team", formdata);
  //     set({
  //       team: [...team, res.data.team],
  //       createForm: {
  //         fullName: "",
  //         email: "",
  //         image: "",
  //         linkedin: "",
  //         github: "",
  //         figma: "",
  //       },
  //       modalOpen: false,
  //     });
  //   },

  //   handleImage: (e) => {
  //     set({
  //       image: e.target.files[0],
  //     });
  //   },

  //   handleUpdateImage: (e) => {
  //     set({
  //       updateImage: e.target.files[0],
  //     });
  //   },

  //   updateCreateForm: (e) => {
  //     const { name, value } = e.target;
  //     set((state) => {
  //       return {
  //         createForm: {
  //           ...state.createForm,
  //           [name]: value,
  //         },
  //       };
  //     });
  //   },

  //   handleUpdateFieldChange: (e) => {
  //     const { value, name } = e.target;
  //     set((state) => {
  //       return {
  //         updateForm: {
  //           ...state.updateForm,
  //           [name]: value,
  //         },
  //       };
  //     });
  //   },

  //   toggleUpdate: ({ _id, fullName, email, image, linkedin, github, figma }) => {
  //     set({
  //       updateForm: {
  //         _id,
  //         fullName,
  //         email,
  //         image,
  //         linkedin,
  //         github,
  //         figma,
  //       },
  //       image,
  //       editToggle: true,
  //       modalOpen: true,
  //     });
  //   },

  //   updateTeam: async (e) => {
  //     e.preventDefault();
  //     const {
  //       updateForm: { _id, fullName, email, image, linkedin, github, figma },
  //       team,
  //       updateImage,
  //     } = serviceStore.getState();
  //     const formdata = new FormData();
  //     formdata.append("email", email);
  //     formdata.append("fullName", fullName);
  //     formdata.append("linkedin", linkedin);
  //     formdata.append("figma", figma);
  //     formdata.append("github", github);
  //     formdata.append("image", updateImage);
  //     const res = await axios.put(`/team/${_id}`, formdata);
  //     const newTeam = [...team];
  //     const teamIndex = team.findIndex((team) => {
  //       return team._id === _id;
  //     });
  //     newTeam[teamIndex] = res.data.team;
  //     set({
  //       team: newTeam,
  //       updateForm: {
  //         _id: null,
  //         fullName: "",
  //         image: "",
  //         email: "",
  //         linkedin: "",
  //         github: "",
  //         figma: "",
  //       },
  //       modalOpen: false,
  //     });
  //   },

  //   deleteTeam: async (_id) => {
  //     const res = await axios.delete(`/team/${_id}`);
  //     const { team } = serviceStore.getState();
  //     const newTeam = [...team].filter((team) => {
  //       return team._id !== _id;
  //     });
  //     set({ team: newTeam });
  //   },

  //   addSwitch: () => {
  //     set({
  //       editToggle: false,
  //       modalOpen: true,
  //       createForm: {
  //         fullName: "",
  //         email: "",
  //         image: "",
  //         linkedin: "",
  //         github: "",
  //         figma: "",
  //       },
  //     });
  //   },

  //   editSwitch: () => {
  //     set({ editToggle: true, modalOpen: true });
  //   },
}));

export default serviceStore;
