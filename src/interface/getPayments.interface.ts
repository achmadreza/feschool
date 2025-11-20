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
  __v: number;
}

interface instalment {
  _id: string;
  id: string;
  paymentId: string;
  paymentFee: number;
  createdDate: Date;
}
