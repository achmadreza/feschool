import { FaSmileBeam } from "react-icons/fa";
export default function Thanks() {
  return (
    <div className="w-full min-h-screen bg-[url(/bg.png)] bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center py-5 gap-5">
      <FaSmileBeam color="yellow" size={72} />
      <p className="text-2xl">Thank you for your information</p>
    </div>
  );
}
