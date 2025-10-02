import { Form, Input, Button } from "@heroui/react";
import { type FormEvent } from "react";
import { toast } from "react-toastify";

export default function Login() {
  // const [submitted, setSubmitted] = useState<any | null>(null);
  const styleInput = "py-1 px-2 border-2 border-purple-300 rounded-sm";
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resBody = await res.json();
    if (!res.ok) {
      toast.error(resBody.message);
    } else {
      console.log(resBody.message);
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="flex h-full">
        {/* form */}
        <div className="w-2/5 h-full flex flex-col items-center justify-center bg-purple-100">
          <h2 className="text-purple-400 font-bold text-left text-xl">
            Login Form
          </h2>
          <Form onSubmit={onSubmit} className="mt-5 flex flex-col gap-5 w-1/2">
            <Input
              isRequired
              errorMessage="Please enter a valid username"
              label="username"
              labelPlacement="outside"
              name="userName"
              placeholder="Enter your username"
              type="text"
              classNames={{
                input: styleInput,
              }}
            />
            <Input
              isRequired
              errorMessage="Please enter a valid password"
              label="password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              classNames={{
                input: styleInput,
              }}
            />
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="w-full bg-purple-500 text-white border border-purple-500 rounded-sm px-2 py-1 hover:bg-white hover:text-purple-500"
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        {/* background */}
        <div className="flex flex-1 w-full h-full">
          <img src="/bg.png" alt="" />
        </div>
      </div>
    </div>
  );
}
