import create from "zustand";
import axios from "axios";

const teamStore = create((set) => ({
  modalOpen: false,

  team: null,

  createForm: {
    fullName: "",
    email: "",
    password: "",
    image: "",
    social: "",
  },

  updateForm: {
    _id: null,
    fullName: "",
    email: "",
    password: "",
    image: "",
    social: "",
  },

  fetchTeam: async () => {
    const res = await axios.get("http://localhost:3000/team");
    set({ team: res.data.team });
  },

  addTeam: async (e) => {
    e.preventDefault();
    const { createForm, team } = teamStore.getState();
    const res = await axios.post("http://localhost:3000/team", createForm);
    set({
      team: [...team, res.data.team],
      createForm: {
        fullName: "",
        email: "",
        password: "",
        image: "",
        social: "",
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

  toggleUpdate: ({ _id, fullName, email, password, image, social }) => {
    set({
      updateForm: {
        _id,
        fullName,
        email,
        password,
        image,
        social,
      },
    });
  },

  updateTeam: async (e) => {
    e.preventDefault();
    const {
      updateForm: { _id, fullName, email, password, image, social },
      team,
    } = teamStore.getState();
    const res = await axios.put(`http://localhost:3000/team/${_id}`, {
      fullName,
      email,
      password,
      image,
      social,
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
        social: "",
      },
    });
  },

  deleteTeam: async (_id) => {
    const res = await axios.delete(`http://localhost:3000/team/${_id}`);
    const { team } = teamStore.getState();
    const newTeam = [...team].filter((team) => {
      return team._id !== _id;
    });
    set({ team: newTeam });
  },
}));

export default teamStore;
