import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TeamMembers() {
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    const res = await axios.get("http://localhost:3000/team");
    setTeam(res.data.team);
    console.log(res);
  };

  const TeamItems = () => {
    return (
      team &&
      team.map((item, index) => {
        return (
          <div
            key={index}
            className="laptop:w-1/4 flex flex-col tablet:flex-row laptop:flex-col items-center gap-5 bg-orange-opacity text-slate-700 tablet:max-w-lg p-4 tablet:p-5"
          >
            <div
              style={{
                backgroundImage: `url(/assets/images/${
                  item.image ? item.image : "default-avatar.svg"
                })`,
              }}
              className="w-16 h-16 tablet:w-20 tablet:h-20 laptop:w-28 laptop:h-28  rounded-full bg-cover bg-center "
            ></div>

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
                {item.social.map((item, index) => {
                  return item.icon != false && item.icon != "false" ? (
                    <Link to={item.link} target="_blank" key={index}>
                      <img
                        src={`/assets/svg/icons/${item.icon}.svg`}
                        className="w-5 opacity-70 hover:opacity-100"
                        alt={`${item.icon} icon`}
                      />
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div className="flex flex-col items-center laptop:flex-row laptop:gap-8">
      <div className="flex flex-col laptop:flex-row flex-wrap laptop:w-full">
        <TeamItems />
      </div>
    </div>
  );
}
