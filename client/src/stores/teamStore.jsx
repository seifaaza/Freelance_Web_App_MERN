import create from "zustand";
import axios from "axios";

const teamStore = create((set) => ({
  modalOpen: false,
  editToggle: false,
  emailError: false,

  team: null,

  createForm: {
    fullName: "",
    email: "",
    image: "",
    linkedin: "",
    github: "",
    figma: "",
  },

  updateForm: {
    _id: null,
    fullName: "",
    email: "",
    image: "",
    linkedin: "",
    github: "",
    figma: "",
  },

  handleOpen: () => {
    set({ modalOpen: true });
  },
  handleClose: () => {
    set({ modalOpen: false });
  },

  fetchTeam: async () => {
    const res = await axios.get("/team");
    set({ team: res.data.team });
  },

  addTeam: async (e) => {
    e.preventDefault();
    try {
      const { createForm, team } = teamStore.getState();
      const res = await axios.post("/team", createForm);
      set({
        team: [...team, res.data.team],
        createForm: {
          fullName: "",
          email: "",
          image: "",
          linkedin: "",
          github: "",
          figma: "",
        },
        modalOpen: false,
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

  handleImage: (e) => {
    const { name, value } = e.target.files[0];
    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
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

  toggleUpdate: ({ _id, fullName, email, image, linkedin, github, figma }) => {
    set({
      updateForm: {
        _id,
        fullName,
        email,
        image,
        linkedin,
        github,
        figma,
      },
      editToggle: true,
      modalOpen: true,
    });
  },

  updateTeam: async (e) => {
    e.preventDefault();
    const {
      updateForm: { _id, fullName, email, image, linkedin, github, figma },
      team,
    } = teamStore.getState();
    const res = await axios.put(`/team/${_id}`, {
      fullName,
      email,
      image,
      linkedin,
      github,
      figma,
    });
    const newTeam = [...team];
    const teamIndex = team.findIndex((team) => {
      return team._id === _id;
    });
    newTeam[teamIndex] = res.data.team;
    set({
      team: newTeam,
      updateForm: {
        _id: null,
        fullName: "",
        image: "",
        email: "",
        linkedin: "",
        github: "",
        figma: "",
      },
      modalOpen: false,
    });
  },

  deleteTeam: async (_id) => {
    const res = await axios.delete(`/team/${_id}`);
    const { team } = teamStore.getState();
    const newTeam = [...team].filter((team) => {
      return team._id !== _id;
    });
    set({ team: newTeam });
  },

  addSwitch: () => {
    set({ editToggle: false, modalOpen: true });
  },

  editSwitch: () => {
    set({ editToggle: true, modalOpen: true });
  },
}));

export default teamStore;
