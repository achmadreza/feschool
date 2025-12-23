import { MdSchool, MdPayments, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router";
const baseDashboardUrl = "/dashboard";
const dataSideBar = [
  {
    icon: <MdSchool />,
    title: "Students",
    href: `${baseDashboardUrl}/students`,
  },
  {
    icon: <MdPayments />,
    title: "Payments",
    href: `${baseDashboardUrl}/payments`,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sticky left-0 top-0 w-[200px] h-full flex flex-col justify-between bg-gray-700 rounded-lg py-5 px-1">
      <div className="flex flex-col w-full gap-5  items-center">
        <div className="w-full h-16 flex justify-center border-b border-white">
          <h2 className="text-white text-2xl">School</h2>
        </div>
        <div className="w-full flex flex-col items-center justify-between gap-3">
          {dataSideBar.map((m) => (
            <Link key={m.title} to={m.href} className="w-full">
              <div className="rounded-lg flex justify-center p-3 items-center gap-4 text-white text-lg cursor-pointer hover:bg-gray-300 hover:text-black">
                <div>{m.icon}</div>
                <p>{m.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="rounded-lg w-full mt-auto flex justify-center p-3 items-center gap-4 text-white text-lg cursor-pointer hover:bg-gray-300 hover:text-black"
        onClick={() => navigate("/")}
      >
        <div>
          <MdLogout />
        </div>
        <p>Log out</p>
      </div>
    </div>
  );
}
