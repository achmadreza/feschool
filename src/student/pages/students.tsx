import { Input } from "@heroui/input";
import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import type { GetStudent } from "../../interface/getStudent.interface";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Form,
  Checkbox,
  Button,
  // DateInput,
  DatePicker,
  SelectItem,
  Select,
  // DateInput,
  // DatePicker,
  // type DateInputValue,
  // DateInput,
} from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  // DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";

import { MdClose, MdMoreHoriz } from "react-icons/md";
import {
  // CalendarDate,
  parseDate,
  // type DateValue,
} from "@internationalized/date";
import { toast } from "react-toastify";
import { jenisKelamin, kelas } from "../../shared/studentEnum";

export default function Students() {
  const [students, setStudents] = useState<GetStudent[]>([]);
  const [detailStudent, setDetailStudent] = useState<GetStudent | null>(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const titlePage = pathname.split("/")[2];
  const { noInduk } = useParams();
  // const defaultBirthDay = new Date().toISOString().split("T")[0];
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(noInduk);
  const getStudents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/student?q=${q}`
      );
      setStudents(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailStudent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/${noInduk}`
      );
      setDetailStudent(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCloseDetail = () => {
    navigate("/dashboard/students/");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/student/${noInduk ?? ""}`,
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
      if (!resBody.message && res.status === 400) {
        return toast.error(resBody.error);
      }
      toast.error(resBody.message);
    } else {
      toast.success(resBody.message);
      setIsEdit(false);
      setSuccess(!success);
      //   console.log(resBody.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, [success, q]);

  useEffect(() => {
    if (noInduk) {
      getDetailStudent();
    }
  }, [noInduk, success]);

  return (
    <div className="w-full h-full flex gap-3">
      <div className={`flex-1 bg-white rounded-lg p-5`}>
        <h2 className="text-2xl capitalize">{titlePage}</h2>
        <div className="w-52 mt-3">
          <Input
            variant="bordered"
            value={q}
            onValueChange={setQ}
            placeholder="Pencarian by nama"
          />
        </div>
        <div className="mt-5 flex">
          <div className="w-full">
            <Table
              aria-label="Student collection table"
              //    bottomContent={
              //   students.length > 0 ? (
              //     <div className="flex w-full justify-center">
              //       <Pagination
              //         isCompact
              //         showControls
              //         showShadow
              //         color="primary"
              //         page={1}
              //         total={1}
              //         onChange={(page) => setPage(page)}
              //       />
              //     </div>
              //   ) : null
              // }
            >
              <TableHeader>
                <TableColumn>Nama</TableColumn>
                <TableColumn>Kelas</TableColumn>
                {/* <TableColumn>Jenis Kelamin</TableColumn> */}
                <TableColumn>Tahun Ajaran</TableColumn>
                <TableColumn className="text-transparent">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {students?.map((s, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{s.nama}</TableCell>
                      <TableCell className="text-xs">{s.kelas}</TableCell>
                      {/* <TableCell>{s.gender}</TableCell> */}
                      <TableCell>{s.tahunAjaran}</TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger className="w-full">
                            <MdMoreHoriz />
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              key={"detail"}
                              className="flex items-center gap-2 text-green-500"
                              onClick={() =>
                                navigate(`/dashboard/students/${s.nomorInduk}`)
                              }
                            >
                              Detail
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {/* detail */}

      <div
        className={`${
          noInduk ? "w-3/4  visible " : "invisible w-0 overflow-hidden"
        } h-full relative  rounded-lg transition-all duration-700`}
      >
        <div
          className="absolute top-0 right-0 text-lg text-white cursor-pointer"
          onClick={handleCloseDetail}
        >
          <MdClose />
        </div>
        {!loading && (
          <>
            <div className="w-full h-36 bg-[url(/space.jpg)] p-5 mb-2 rounded-lg">
              {!isEdit && (
                <div className="flex h-full items-center gap-5 text-white">
                  <div className="w-16 h-16 rounded-full flex justify-center items-center bg-blue-700 text-white">
                    {detailStudent?.pasPhoto ? (
                      <img
                        src={`${detailStudent?.pasPhoto}`}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      detailStudent?.nama?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl">{detailStudent?.nama}</p>
                    <p className="text-white text-sm">
                      {detailStudent?.kelas
                        ? detailStudent?.kelas
                        : "Belum ada Kelas"}{" "}
                      | {noInduk}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="w-full flex items-center justify-end mb-3">
                <Checkbox
                  isSelected={isEdit}
                  checked={isEdit}
                  onValueChange={setIsEdit}
                >
                  Edit Field
                </Checkbox>
              </div>
              <Form className="border rounded-lg p-3" onSubmit={onSubmit}>
                <div className="w-full flex gap-3 justify-between items-center">
                  {isEdit && (
                    <>
                      <Input
                        label="Nama"
                        name="nama"
                        labelPlacement="outside"
                        defaultValue={detailStudent?.nama}
                        variant="bordered"
                        disabled={!isEdit}
                      />
                      <Select
                        label="Kelas"
                        placeholder="Pilih Kelas"
                        isRequired
                        variant="bordered"
                        labelPlacement="outside"
                        name="kelas"
                        defaultSelectedKeys={[detailStudent?.kelas]}
                      >
                        {kelas.map((k) => (
                          <SelectItem key={k}>{k}</SelectItem>
                        ))}
                      </Select>
                    </>
                  )}
                </div>
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label="Tahun Ajaran"
                    name="tahunAjaran"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.tahunAjaran.toString()}
                    variant={isEdit ? "bordered" : "faded"}
                    isDisabled={!isEdit}
                  />

                  {isEdit ? (
                    <DatePicker
                      labelPlacement="outside"
                      label="Tanggal Lahir"
                      name="tanggalLahir"
                      // selectorButtonPlacement="start"
                      // defaultValue={
                      //   detailStudent?.tanggalLahir
                      //     ? (parseDate(
                      //         detailStudent?.tanggalLahir.split("T")[0]
                      //       ) as unknown as DateValue)
                      //     : (parseDate(defaultBirthDay) as unknown as DateValue)
                      // }
                      variant={isEdit ? "bordered" : "faded"}
                      // disabled={!isEdit}
                      isRequired
                      selectorButtonPlacement="start"
                      showMonthAndYearPickers
                      // showMonthAndYearPickers
                    />
                  ) : (
                    <Input
                      defaultValue={
                        detailStudent && detailStudent.tanggalLahir
                          ? parseDate(
                              detailStudent?.tanggalLahir?.split("T")[0]
                            ).toString()
                          : ""
                      }
                      label="Tanggal Lahir"
                      placeholder="Tanggal Lahir"
                      name="tanggalLahir"
                      labelPlacement="outside"
                      isDisabled={!isEdit}
                      variant={isEdit ? "bordered" : "faded"}
                    />
                  )}
                </div>
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label={"Nama Ayah"}
                    name="namaAyah"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.namaAyah}
                    variant={isEdit ? "bordered" : "faded"}
                    placeholder="Nama Ayah"
                    isDisabled={!isEdit}
                  />
                  <Input
                    label="Nama Ibu"
                    name="namaIbu"
                    placeholder="Nama Ibu"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.namaIbu}
                    variant={isEdit ? "bordered" : "faded"}
                    isDisabled={!isEdit}
                  />
                </div>
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label="Nomor HP"
                    name="noHp"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.noHp}
                    variant={isEdit ? "bordered" : "faded"}
                    type="number"
                    // className="w-1/2"
                    isDisabled={!isEdit}
                  />

                  <Select
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"
                    labelPlacement="outside"
                    isRequired={isEdit}
                    variant={isEdit ? "bordered" : "faded"}
                    name="gender"
                    defaultSelectedKeys={[detailStudent?.gender]}
                    isDisabled={!isEdit}
                  >
                    {jenisKelamin.map((k) => (
                      <SelectItem key={k}>{k}</SelectItem>
                    ))}
                  </Select>

                  {/* <Input
                    label="Jenis Kelamin"
                    name="gender"
                    labelPlacement="outside"
                    defaultValue={
                      detailStudent?.gender
                        ? detailStudent?.gender
                        : "LAKI-LAKI"
                    }
                    variant={isEdit ? "bordered" : "faded"}
                    // type="number"
                    // className="w-1/2"
                    disabled={!isEdit}
                  /> */}
                </div>
                {isEdit && (
                  <div className="mt-3 w-full flex justify-end">
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </div>
                )}
              </Form>
              <div className="w-full mt-5 grid grid-cols-1 gap-5">
                {detailStudent?.kk && (
                  <div className="space-y-2">
                    <p>KK</p>
                    <img src={`${detailStudent?.kk}`} />
                  </div>
                )}
                {detailStudent.akteLahir && (
                  <div className="space-y-2">
                    <p>Akte Kelahiran</p>
                    <img src={`${detailStudent?.akteLahir}`} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
