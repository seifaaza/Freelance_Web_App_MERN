import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UserStore from "../../stores/UserStore";

export default function Users() {
  const store = UserStore();

  useEffect(() => {
    store.fetchUsers();
  }, []);

  return (
    <div className="flex gap-10 font-main text-slate-700 dark:text-white w-full">
      <table className=" rounded-md overflow-hidden divide-y divide-slate-800 w-full">
        <thead>
          <tr className="bg-slate-300 dark:bg-slate-600 font-medium">
            <td className="px-6 py-3">Fullname</td>
            <td className="px-6 py-3"> Email</td>
            <td className="px-6 py-3"> Password</td>
            <td className="px-6 py-3"> Actions</td>
          </tr>
        </thead>
        <tbody>
          {store.users &&
            store.users.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-slate-100 even:bg-slate-200 dark:odd:bg-slate-800 dark:even:bg-slate-700 "
                >
                  <td className="px-6 py-3 whitespace-nowrap">
                    {item.fullName}
                  </td>
                  <td className="px-6 py-3">{item.email}</td>
                  <td className="px-6 py-3 text-ellipsis overflow-hidden max-w-sm whitespace-nowrap">
                    {item.password}
                  </td>
                  <td className="px-6 ">
                    <IconButton
                      aria-label="delete"
                      className="text-danger"
                      onClick={() => store.deleteUser(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
