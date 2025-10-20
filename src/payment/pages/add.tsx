import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { NumberInput } from "@heroui/react";
import axios from "axios";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

export default function Add() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const handlePhoneNumber = (e: string) => {
    if (e.length < 15) {
      setPhoneNumber(e);
    } else {
      return;
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    const { tuitionFee, anualFee, registrationFee, uniformFee, ...etc } = data;
    console.log(etc, "etc");

    try {
      const { data: dataRes } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment`,
        {
          tuitionFee: +tuitionFee,
          anualFee: +anualFee,
          registrationFee: +registrationFee,
          uniformFee: +uniformFee,
          ...etc,
        }
      );
      toast.success(dataRes.message);
      setRegistrationLink(dataRes.url);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("internal server error");
      }
    }
  };
  return (
    <div className="bg-white">
      <h2>Add Student</h2>
      <Form
        className="w-1/2 flex flex-col flex-wrap gap-6  p-4 rounded-xl"
        onSubmit={onSubmit}
      >
  
  <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Nama"
          labelPlacement="outside"
          name="nama"
          placeholder="Masukan Nama"
          //   classNames={styledInput}
          variant="bordered"
          type="text"
        />
        <div className="w-full flex items-end gap-5">
          {/* <p className="text-sm mb-2">+62</p> */}
          <Input
            isRequired
            errorMessage="Pastikan Nomor HP Terisi"
            label="No Handphone"
            labelPlacement="outside"
            name="noHp"
            placeholder="Masukkan Nomor HP"
            onValueChange={handlePhoneNumber}
            value={phoneNumber}
            //   classNames={styledInput}
            //   defaultValue={new Date()}
            type="number"
            variant="bordered"
          />
        </div>


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
        <Input
          isRequired
          errorMessage="Pastikan Tahun Ajaran Terisi"
          label="Tahun Ajaran"
          labelPlacement="outside"
          name="tahunAjaran"
          placeholder="Tahun Ajaran"
          //   classNames={styledInput}
          // type="number"
          variant="bordered"
        />

        <Input
          isRequired
          errorMessage="Pastikan Registration Fee Terisi"
          label="Registration Fee"
          labelPlacement="outside"
          name="registrationFee"
          placeholder="Registration Fee"
          //   defaultValue={"Surti"}
          //   classNames={styledInput}
          variant="bordered"
        />


        <Input
          isRequired
          errorMessage="Pastikan Anual Fee terisi"
          label="Anual Fee"
          labelPlacement="outside"
          name="anualFee"
          placeholder="Anuall Fee"
          //   defaultValue={"Pardi"}
          //   classNames={styledInput}

          variant="bordered"
        />

        <Input
          isRequired
          errorMessage="Pastikan Tuition Fee Terisi"
          label="Tuition Fee"
          labelPlacement="outside"
          name="tuitionFee"
          placeholder="Tuition Fee"
          //   defaultValue={"Surti"}
          //   classNames={styledInput}
          variant="bordered"
        />
        <Input
          isRequired
          errorMessage="Pastikan Uniform Fee Terisi"
          label="Uniform Fee"
          labelPlacement="outside"
          name="uniformFee"
          placeholder="Uniform Fee"
          //   defaultValue={"Surti"}
          //   classNames={styledInput}
          variant="bordered"
        />
  
      
        <Input
          label="Link Registrarion"
          labelPlacement="outside"
          placeholder="Link Registration"
          disabled
          value={registrationLink}
          variant="bordered"
        />
        <Button type="submit" className="w-full" color="primary">
          Generate Link Registrasi
        </Button>
      </Form>
    </div>
  );
}
