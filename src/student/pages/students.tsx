import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
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
  const defaultBirthDay = new Date().toISOString().split("T")[0];

  console.log(noInduk);
  const getStudents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/student`
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

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    if (noInduk) {
      getDetailStudent();
    }
  }, [noInduk]);

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
                      <TableCell>{s.kelas}</TableCell>
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
        } h-full relative bg-white rounded-lg transition-all duration-700`}
      >
        <div
          className="absolute top-0 right-0 text-lg text-white"
          onClick={handleCloseDetail}
        >
          <MdClose />
        </div>
        {!loading && (
          <>
            <div className="w-full h-36 bg-[url(/space.jpg)] p-5 mb-2 rounded-lg">
              <div className="flex h-full items-center gap-5 text-white">
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-blue-700 text-white">
                  {detailStudent?.nama.charAt(0).toUpperCase()}
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
            </div>
            <div className="p-4">
              <Form className="border rounded-lg p-3">
                {/* <div className="w-full flex gap-3 justify-between items-center">
              <Input
                label="Nama"
                labelPlacement="outside"
                defaultValue={detailStudent?.nama}
                variant="bordered"
                disabled
              />
              <Input
                label="Kelas"
                labelPlacement="outside"
                defaultValue={detailStudent?.kelas}
                variant="bordered"
                disabled
              />
            </div> */}
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label="Tahun Ajaran"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.tahunAjaran.toString()}
                    variant="bordered"
                    disabled
                  />
                  <Input
                    labelPlacement="outside"
                    label={"Tanggal Lahir"}
                    name="tanggalLahir"
                    variant="bordered"
                    // selectorButtonPlacement="start"
                    defaultValue={
                      detailStudent.tanggalLahir
                        ? detailStudent.tanggalLahir
                        : defaultBirthDay
                    }
                    disabled
                    // showMonthAndYearPickers
                  />
                </div>
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label="Nama Ayah"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.namaAyah}
                    variant="bordered"
                    disabled
                  />
                  <Input
                    label="Nama Ibu"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.namaIbu}
                    variant="bordered"
                    disabled
                  />
                </div>
                <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    label="Nomor HP"
                    labelPlacement="outside"
                    defaultValue={detailStudent?.noHp}
                    variant="bordered"
                    type="number"
                    // className="w-1/2"
                    disabled
                  />
                  <Input
                    label="Jenis Kelamin"
                    labelPlacement="outside"
                    defaultValue={
                      detailStudent?.gender
                        ? detailStudent?.gender
                        : "LAKI-LAKI"
                    }
                    variant="bordered"
                    // type="number"
                    // className="w-1/2"
                    disabled
                  />
                </div>
              </Form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
