import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Form,
  Input,
  NumberInput,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import type { GetPayments } from "../../interface/getPayments.interface";
import { MdClose, MdLink, MdMoreHoriz, MdSchool } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function Payments() {
  const [q, setQ] = useState("");
  const [payments, setPayments] = useState<GetPayments[]>([]);
  const [detailPayment, setDetailPayment] = useState<GetPayments | undefined>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { noInduk } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseDetail = () => {
    navigate("/dashboard/payments/");
  };

  const handlePhoneNumber = (e: string) => {
    if (e.length < 15) {
      setPhoneNumber(e);
    } else {
      return;
    }
  };

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

  const getDetailPayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/${noInduk}`
      );
      setDetailPayment(data.data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPayment();
  }, [q]);

  useEffect(() => {
    if (noInduk) {
      getDetailPayment();
    }
  }, [noInduk]);
  console.log(detailPayment);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <div className="w-full h-full flex gap-3">
      <div className="flex-1 bg-white rounded-lg p-5">
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
                                navigate(`/dashboard/payments/${s.nomorInduk}`)
                              }
                            >
                              Detail
                            </DropdownItem>
                            <DropdownItem
                              key={"link"}
                              onClick={() => generateLink(s.nomorInduk)}
                            >
                              <div className="w-fit flex items-end gap-1 text-blue-400 underline cursor-pointer">
                                <MdLink size={16} /> Generate Lnik Registrasi
                              </div>
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
              <div className="flex h-full items-center gap-5 text-white">
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-blue-700 text-white">
                  {detailPayment?.nama.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">{detailPayment?.nama}</p>
                  <p className="text-white text-sm">{noInduk}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg overflow-auto">
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
                {/* <div className="w-full flex gap-3 justify-between items-center">
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Nama"
                    labelPlacement="outside"
                    name="nama"
                    placeholder="Masukan Nama"
                    //   classNames={styledInput}
                    variant={isEdit ? "bordered" : "faded"}
                    disabled={!isEdit}
                    type="text"
                  />
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
                    variant={isEdit ? "bordered" : "faded"}
                    disabled={!isEdit}
                  />
                </div> */}

                {/* <div className="w-full flex gap-3 justify-between items-center"> */}
                <NumberInput
                  isRequired
                  errorMessage="Pastikan Anual Fee terisi"
                  label="Anual Fee"
                  labelPlacement="outside"
                  name="anualFee"
                  defaultValue={detailPayment?.anualFee}
                  // placeholder="Masukan Nama Ayah"
                  //   defaultValue={"Pardi"}
                  //   classNames={styledInput}
                  variant={isEdit ? "bordered" : "faded"}
                  disabled={!isEdit}
                />
                <NumberInput
                  isRequired
                  errorMessage="Pastikan Tuition Fee Terisi"
                  label="Tuition Fee"
                  labelPlacement="outside"
                  name="tuitionFee"
                  // placeholder="Masukan Nama Ibu"
                  defaultValue={detailPayment?.tuitionFee}
                  //   classNames={styledInput}
                  variant={isEdit ? "bordered" : "faded"}
                  disabled={!isEdit}
                />
                {/* </div> */}

                {/* <div className="w-full flex gap-3 justify-between items-center"> */}
                <NumberInput
                  isRequired
                  errorMessage="Pastikan Registration Fee Terisi"
                  label="Registration Fee"
                  labelPlacement="outside"
                  name="registrationFee"
                  // placeholder="Masukan Nama Ibu"
                  defaultValue={detailPayment?.registrationFee}
                  //   classNames={styledInput}
                  variant={isEdit ? "bordered" : "faded"}
                  disabled={!isEdit}
                />
                <NumberInput
                  isRequired
                  errorMessage="Pastikan Uniform Fee Terisi"
                  label="Uniform Fee"
                  labelPlacement="outside"
                  name="uniformFee"
                  // placeholder="Masukan Nama Ibu"
                  defaultValue={detailPayment?.uniformFee}
                  //   classNames={styledInput}
                  variant={isEdit ? "bordered" : "faded"}
                  disabled={!isEdit}
                />
                {/* <Input
                          label="Nama Ayah"
                          name="namaAyah"
                          labelPlacement="outside"
                          defaultValue={detailPayment?.namaAyah}
                          variant={isEdit ? "bordered" : "faded"}
                          disabled={!isEdit}
                        />
                        <Input
                          label="Nama Ibu"
                          name="namaIbu"
                          labelPlacement="outside"
                          defaultValue={detailPayment?.namaIbu}
                          variant={isEdit ? "bordered" : "faded"}
                          disabled={!isEdit}
                        /> */}
                {/* </div> */}

                <div className="w-full flex gap-3 justify-between items-center">
                  {/* <Input
                    isRequired
                    errorMessage="Pastikan Tahun Ajaran Terisi"
                    label="Tahun Ajaran"
                    labelPlacement="outside"
                    name="tahunAjaran"
                    placeholder=""
                    //   classNames={styledInput}
                    type="number"
                    variant={isEdit ? "bordered" : "faded"}
                    disabled={!isEdit}
                  /> */}
                  {/* <Input
                    label="Link Registrarion"
                    labelPlacement="outside"
                    disabled
                    value={registrationLink}
                    variant="bordered"
                  /> */}

                  {/* <Input
                          label="Jenis Kelamin"
                          name="gender"
                          labelPlacement="outside"
                          defaultValue={
                            detailPayment?.gender
                              ? detailPayment?.gender
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
