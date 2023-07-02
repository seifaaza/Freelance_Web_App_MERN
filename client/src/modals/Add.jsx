import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import userStore from "../stores/UserStore";
import { TagsInput } from "react-tag-input-component";

export default function Add() {
  const store = userStore();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    store.fetchUser();
  }, []);

  return <div>Choose</div>;
}
