import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { GetPayments } from "../../interface/getPayments.interface";
import { MdLink, MdSchool } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Payments() {
  const [q, setQ] = useState("");
  const [payments, setPayments] = useState<GetPayments[]>([]);
  const navigate = useNavigate();

  const getPayment = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment`
      );
      setPayments(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPayment();
  }, [q]);

  const generateLink = async (noInduk: number) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/generate/${noInduk}`
      );
      toast.success("generate link registrasi telah tercopy");
      navigator.clipboard.writeText(data.url);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("internal server error");
      }
    }
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl capitalize">Payment</h2>
      <div className="flex justify-between items-center">
        <div className="w-52 mt-3">
          <Input
            variant="bordered"
            value={q}
            onValueChange={setQ}
            placeholder="Pencarian by nama"
          />
        </div>
        <Button
          onPress={() => navigate("/dashboard/payments/add")}
          className="flex items-center gap-2 bg-gray-900 text-white"
        >
          <MdSchool /> Add Student
        </Button>
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
              <TableColumn>Nomor Induk</TableColumn>
              <TableColumn>Nama</TableColumn>
              <TableColumn>Annual fee</TableColumn>
              <TableColumn>Tuition fee</TableColumn>
              <TableColumn>Registration fee</TableColumn>
              <TableColumn>Uniform fee</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {payments?.map((s, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{s.nomorInduk}</TableCell>
                    <TableCell>{s.nama}</TableCell>
                    <TableCell>{s.anualFee}</TableCell>
                    <TableCell>{s.tuitionFee}</TableCell>
                    <TableCell>{s.registrationFee}</TableCell>
                    <TableCell>{s.uniformFee}</TableCell>
                    <TableCell
                      className="flex items-end gap-1 text-blue-400 underline cursor-pointer"
                      onClick={() => generateLink(s.nomorInduk)}
                    >
                      <MdLink size={16} /> Lnik Registrasi
                    </TableCell>
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
