import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import type { GetStudent } from "../../interface/getStudent.interface";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
export default function Students() {
  const [students, setStudents] = useState<GetStudent[]>([]);
  const [q, setQ] = useState("");
  const location = useLocation();
  const pathname = location.pathname;
  const titlePage = pathname.split("/")[2];
  const { noInduk } = useParams();
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

  useEffect(() => {
    getStudents();
  }, []);

  console.log(students);
  return (
    <div className="w-full h-full">
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
        <div className="flex-1">
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
              <TableColumn>Jenis Kelamin</TableColumn>
              <TableColumn>Tahun Ajaran</TableColumn>
            </TableHeader>
            <TableBody>
              {students?.map((s, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{s.nama}</TableCell>
                    <TableCell>{s.kelas}</TableCell>
                    <TableCell>{s.gender}</TableCell>
                    <TableCell>{s.tahunAjaran}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
