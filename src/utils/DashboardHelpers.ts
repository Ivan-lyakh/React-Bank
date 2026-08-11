import toast from "react-hot-toast";
import type { History } from "../types/HistoryTypes";
import { supabase } from "../services/supabase/supabase";

export const handleCopy = async (value: string) => {
  await navigator.clipboard.writeText(value);
  toast.success(`Card number copied to your clipboard`);
};

export function formatNumber(number: number): string {
  return number.toLocaleString("de-DE");
}


export const formatAccountNumber = (accountNumber: string): string => {
  return accountNumber.replace(/(.{4})/g, "$1 ").trim();
};


export const changeStatusRead = async (item: History) => {

  const { error } = await supabase
    .from("history")
    .update({ recipient_read: true })
    .eq("id", item.id)


  if (error) {
    console.log(error);
    console.log(`Error change status newTrasnfer: ${error}`)
  }


}


export const validateName = (name: string): boolean => {
  return name.length >= 2 && /^[\p{L}]+$/u.test(name);
};


