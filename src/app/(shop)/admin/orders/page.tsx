export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";

import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { Title } from "@/components";
import { getAllUserOrders } from "@/actions";

export const metadata = {
  title: "Manage Orders - Admin Panel",
  description:
    "Administer orders and shipping on Teslo Shop admin panel. Review, update, and fulfill customer orders efficiently.",
};

export default async function AdminOrdersPage() {
  const { ok, orders } = await getAllUserOrders();

  if (!ok) redirect("/auth/login");

  return (
    <div className="w-full xm:max-w-[1200px] mx-auto px-6 min-[600px]:px-9 mlg:px-12">
      <Title
        title="All Orders"
        className="pt-6 xm:pt-16 text-[28px] leading-[34px] tracking-[1.4px]"
      />

      {orders!.length > 0 ? (
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
                  Full Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Status
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
              {orders!.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b tracking-[1.2px] transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.split("-").at(-1)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress!.firstName}{" "}
                    {order.OrderAddress!.lastName}
                  </td>
                  <td
                    className={clsx(
                      "flex items-center text-sm font-light px-6 py-4 whitespace-nowrap",
                      {
                        "text-red-700": !order.isPaid,
                        "text-green-700": order.isPaid,
                      }
                    )}
                  >
                    <IoCardOutline />
                    <span className="mx-2">
                      {order.isPaid
                        ? "Payment Received"
                        : "Outstanding Payment"}
                    </span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline"
                    >
                      See Order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-normal mt-6 mx:mt-10 text-[12px] leading-[24px] tracking-[1.8px]">
          No user has placed an order
        </p>
      )}
    </div>
  );
}
