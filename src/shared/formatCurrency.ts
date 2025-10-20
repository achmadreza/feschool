export function formatCurrency(number: number) {
  return new Intl.NumberFormat("id-ID", {
    // style: "currency",
    // currency: "",
  }).format(number);
}
