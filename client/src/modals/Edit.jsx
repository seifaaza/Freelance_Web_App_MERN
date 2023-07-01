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

export default function Edit() {
  const store = userStore();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    store.fetchUser();
  }, []);

  return (
    <form
      onSubmit={store.updateUser}
      encType="multipart/form-data"
      className="flex flex-col gap-5 w-full text-slate-700 dark:text-slate-400 laptop:max-w-sm"
    >
      <div className="text-small-heading text-center mb-6 font-main">
        <p className=" text-medium ">
          {/* Hello {store.user && store.user.fullName}{" "} */}
          Edit your profile
        </p>
        {/* please complet your profile informations */}
      </div>
      <div className="flex gap-5 ">
        <Avatar
          src={`http://localhost:3000/uploads/${store.updateForm.image}`}
          sx={{ width: 60, height: 60 }}
          className="-z-10"
        />
        <FormControl variant="outlined" className="input-image">
          <OutlinedInput
            className="input-image text-ellipsis"
            color="secondary"
            startAdornment={
              <div className="w-fit">
                <input
                  className="input-file bg-dark"
                  id="my-file"
                  type="file"
                  name="image"
                  onChange={store.handleUpdateImage}
                />{" "}
                <div className="flex items-center gap-4 text-violet-600">
                  <label
                    tabIndex="0"
                    htmlFor="my-file"
                    className="whitespace-nowrap "
                  >
                    Change profile picture
                  </label>
                </div>
              </div>
            }
          />
        </FormControl>
      </div>
      <p onClick={() => store.handleSkills(skills)}>
        {" "}
        skills from store :{" "}
        {store.skills &&
          store.skills.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
      </p>
      <TagsInput
        value={store.user && store.user.skills}
        onChange={setSkills}
        name="skills"
        placeHolder="Add your skills"
        // onClick={() => {store.skills(skills)}}
      />
      <TextField
        type="text"
        name="fullName"
        color="secondary"
        id="outlined-textarea"
        label="Username"
        placeholder="Your username"
        value={store.updateForm.fullName}
        onChange={store.handleUpdateFieldChange}
      />{" "}
      <TextField
        type="text"
        name="job"
        color="secondary"
        id="outlined-textarea"
        label="Job"
        placeholder="Your job"
        value={store.updateForm.job}
        onChange={store.handleUpdateFieldChange}
      />{" "}
      <TextField
        type="text"
        name="des"
        color="secondary"
        id="outlined-textarea"
        label="Description"
        placeholder="Describe your profile"
        multiline
        rows={4}
        value={store.updateForm.des}
        onChange={store.handleUpdateFieldChange}
      />{" "}
      <div className="flex justify-center gap-4">
        <Button
          variant="outlined"
          size="large"
          endIcon={<CloseIcon />}
          className="btn btn-outlined-danger grow"
          onClick={store.handleClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<CheckIcon />}
          className="btn btn-contained grow"
        >
          Save
        </Button>
      </div>
    </form>
  );
}

Edit.propTypes = {
  DeleteAdmin: PropTypes.string,
  Cancel: PropTypes.string,
};
