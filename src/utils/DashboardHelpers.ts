import toast from "react-hot-toast";

export const handleCopy = async (value: string) => {
  await navigator.clipboard.writeText(value);
  toast.success(`Card number copied to your clipboard`);
};

export function formatNumber(number: number): string {
  return number.toLocaleString("de-DE");
}


export const formatAccountNumber = (accountNumber: string ): string => {
  return accountNumber.replace(/(.{4})/g, "$1 ").trim();
};