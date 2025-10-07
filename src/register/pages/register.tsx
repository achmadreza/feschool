import { Form, Input, Button } from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

interface DataBase64 {
  nama: string;
  nomorInduk: string;
}

const kelas = ["TK A", "TK B"];
const jenisKelamin = ["LAKI-LAKI", "PEREMPUAN"];

export default function Register() {
  const [searchParams] = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const data = searchParams.get("data");
  //   console.log(data);
  const decodeBase64: DataBase64 = data && JSON.parse(atob(data));
  //   console.log(decodeBase64);

  const handlePhoneNumber = (e: string) => {
    if (e.length < 15) {
      setPhoneNumber(e);
    } else {
      return;
    }
  };

  //   const styledInput: SlotsToClasses<
  //     | "input"
  //     | "base"
  //     | "label"
  //     | "description"
  //     | "errorMessage"
  //     | "mainWrapper"
  //     | "inputWrapper"
  //     | "innerWrapper"
  //     | "clearButton"
  //     | "helperWrapper"
  //   > = {
  //     inputWrapper: ["bg-yellow-100", "dark:bg-yellow-900"],
  //   };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/student/${
        decodeBase64.nomorInduk ?? ""
      }`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const resBody = await res.json();
    if (!res.ok) {
      toast.error(resBody.message);
    } else {
      toast.success(resBody.message);
      //   console.log(resBody.message);
    }
  };
  return (
    <div className="w-full min-h-screen bg-[url(/bg.png)] bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center py-5">
      <Form
        className="w-2/5 flex flex-col gap-6 bg-white border-2 border-blue-950 p-4 rounded-xl"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Nama"
          labelPlacement="outside"
          name="nama"
          placeholder="Masukan Nama"
          defaultValue={decodeBase64?.nama ?? ""}
          //   classNames={styledInput}
          variant="bordered"
          type="text"
        />
        <Select
          label="Kelas"
          placeholder="Pilih Kelas"
          isRequired
          variant="bordered"
          name="kelas"
        >
          {kelas.map((k) => (
            <SelectItem key={k}>{k}</SelectItem>
          ))}
        </Select>
        <Select
          label="Jenis Kelamin"
          placeholder="Pilih Jenis Kelamin"
          isRequired
          variant="bordered"
          name="gender"
        >
          {jenisKelamin.map((k) => (
            <SelectItem key={k}>{k}</SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          errorMessage="Pastikan Nama Ayah terisi"
          label="Nama Ayah"
          labelPlacement="outside"
          name="namaAyah"
          placeholder="Masukan Nama Ayah"
          //   defaultValue={"Pardi"}
          //   classNames={styledInput}
          type="text"
          variant="bordered"
        />
        <Input
          isRequired
          errorMessage="Pastikan Nama Ibu Terisi"
          label="Nama Ibu"
          labelPlacement="outside"
          name="namaIbu"
          placeholder="Masukan Nama Ibu"
          //   defaultValue={"Surti"}
          //   classNames={styledInput}
          variant="bordered"
          type="text"
        />
        {/* <Input
          isRequired
          errorMessage="Pastikan Tanggal Lahir Terisi"
          label="Tanggal Lahir"
          labelPlacement="outside"
          name="tanggalLahir"
          placeholder=""
          //   defaultValue={new Date()}
          type="date"
        /> */}
        {/* <Calendar /> */}
        <DatePicker
          isRequired
          labelPlacement="outside"
          label={"Tanggal Lahir"}
          name="tanggalLahir"
          variant="bordered"
          selectorButtonPlacement="start"
          showMonthAndYearPickers
        />
        <Input
          isRequired
          errorMessage="Pastikan Nomor HP Terisi"
          label="Tahun Ajaran"
          labelPlacement="outside"
          name="tahunAjaran"
          placeholder=""
          //   classNames={styledInput}
          defaultValue={new Date().getFullYear().toString()}
          type="number"
          variant="bordered"
        />
        <div className="w-full flex items-end gap-5">
          {/* <p className="text-sm mb-2">+62</p> */}
          <Input
            isRequired
            errorMessage="Pastikan Nomor HP Terisi"
            label="Nomor HP"
            labelPlacement="outside"
            name="noHp"
            placeholder=""
            onValueChange={handlePhoneNumber}
            value={phoneNumber}
            //   classNames={styledInput}
            //   defaultValue={new Date()}
            type="number"
            variant="bordered"
          />
        </div>
        <Button type="submit" className="w-full" color="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}
