"use client";

import Link from "next/link";

import { User } from "@/interfaces";
import { changeUserRole } from "@/actions";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className="w-full overflow-auto mt-6 xm:mt-10">
      <table className="w-full border">
        <thead className="bg-gray-200 border-b">
          <tr className="tracking-[1.2px]">
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Role
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b tracking-[1.2px] transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.id.split("-").at(-1)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  className="bg-transparent uppercase"
                  value={user.role}
                  onChange={(event) =>
                    changeUserRole(user.id, event.target.value)
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4">
                <Link href={`/profile/${user.id}`} className="hover:underline">
                  See User
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
