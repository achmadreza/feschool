export interface GetPayments {
  _id: string;
  id: string;
  nomorInduk: number;
  nama: string;
  anualFee: number;
  tuitionFee: number;
  registrationFee: number;
  uniformFee: number;
  paymentPhoto: string;
  createdDate: string;
  instalment: instalment[];
  isInstalment: boolean;
  student: Student;
  __v: number;
}

interface instalment {
  _id: string;
  id: string;
  paymentId: string;
  paymentFee: number;
  createdDate: Date;
}

interface Student {
  _id: string;
  id: string;
  kelas: string;
  nama: string;
  namaAyah: string;
  namaIbu: string;
  noHp: string;
  tahunAjaran: string;
  tanggalLahir: string;
  statusPembayaran: string;
  createdDate: string;
  gender: string;
  nomorInduk: number;
  __v: number;
  akteLahir: string;
  kk: string;
  pasPhoto: string;
  alamat: string;
}
