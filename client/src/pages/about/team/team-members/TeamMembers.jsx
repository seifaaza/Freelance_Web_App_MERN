import { useEffect } from "react";
import { Link } from "react-router-dom";
import TeamStore from "../../../../stores/TeamStore";
import Avatar from "@mui/material/Avatar";

export default function TeamMembers() {
  const store = TeamStore();

  useEffect(() => {
    store.fetchTeam();
  }, []);

  const TeamItems = () => {
    return (
      store.team &&
      store.team.map((item, index) => {
        return (
          <div
            key={index}
            className="laptop:w-1/4 flex flex-col tablet:flex-row laptop:flex-col items-center gap-5 bg-orange-opacity text-slate-700 tablet:max-w-lg p-4 tablet:p-5"
          >
            <Avatar
              alt={`${item.fullName} photo`}
              src={
                item.image == "avatar"
                  ? `/assets/images/default-avatar.svg`
                  : `http://localhost:3000/uploads/${item.image}`
              }
              sx={{ width: 150, height: 150 }}
            />

            <div className="flex flex-col items-center tablet:items-start laptop:items-center gap-5 ">
              <div className="flex flex-col items-center tablet:items-start laptop:items-center">
                <h3 className="font-medium text-lg dark:text-white">
                  {item.fullName}
                </h3>
                <Link
                  onClick={() => {
                    window.location.href = `mailto:${item.email}`;
                  }}
                  className="text-slate-500 text-small dark:text-slate-400 hover:underline"
                >
                  {" "}
                  {item.email}
                </Link>
              </div>
              <div className="flex gap-6">
                {item.linkedin ? (
                  <Link to={item.linkedin} target="_blank">
                    <img
                      src={`/assets/svg/icons/linkedin.svg`}
                      className="w-5 opacity-70 hover:opacity-100"
                      alt={`Linkedin icon`}
                    />
                  </Link>
                ) : null}
                {item.github ? (
                  <Link to={item.github} target="_blank">
                    <img
                      src={`/assets/svg/icons/github.svg`}
                      className="w-5 opacity-70 hover:opacity-100"
                      alt={`Github icon`}
                    />
                  </Link>
                ) : null}
                {item.figma ? (
                  <Link to={item.figma} target="_blank">
                    <img
                      src={`/assets/svg/icons/figma.svg`}
                      className="w-5 opacity-70 hover:opacity-100"
                      alt={`Figma icon`}
                    />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div className="flex flex-col items-center laptop:flex-row laptop:gap-8">
      <div className="flex flex-col laptop:flex-row justify-center flex-wrap laptop:w-full">
        <TeamItems />
      </div>
    </div>
  );
}
