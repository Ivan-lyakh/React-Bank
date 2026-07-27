import toast from "react-hot-toast";

export const handleCopy = async (value: string) => {
  await navigator.clipboard.writeText(value);
  toast.success(`Card number copied to your clipboard`);
};

export function formatNumber(number: number): string {
  return number.toLocaleString("de-DE");
}