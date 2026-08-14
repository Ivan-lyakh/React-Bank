import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { supabase } from "../services/supabase/supabase";
import type { User } from "@supabase/supabase-js";



export const title = (value: string) => {

  switch (value) {

    case "transfer": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="titleModal">Transfer<FaPaperPlane /></h2>
    }

    case "deposit": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="titleModal">Deposit<FaPlusCircle /></h2>
    }

    case "windtraw": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="titleModal">Windtraw<FaMinusCircle /></h2>
    }

    case "loan": {
      return <h2 style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "5px" }} className="titleModal">Loan<FaHandHoldingUsd /></h2>
    }

  }

}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};






//*----------------------------------------изменение баланса отправителя! ----------------------------------------------------

export async function changeBalanceFrom(accountBalance: number, user: User, sum: number) {

  const { error } = await supabase
    .from("accounts")
    .update({
      balance: accountBalance - sum
    })
    .eq("user_id", user.id);

  if (error) {
    console.log("Ошибка changeBalanceFrom")
    return false
  }
}

//*----------------------------------------изменение баланса отправителя! ----------------------------------------------------



//*----------------------------------------Получение сщета получателя + изменение его баланса ----------------------------------------------------

export async function getActualBalanceWhere(where: string) {

  const { data, error } = await supabase
    .from("accounts")
    .select("balance")
    .eq("account_number", String(where))
    .single();

  if (error) {
    console.log("Ошибка: Неудалось найти пользователя по указаному номеру!")
    return false
  }

  return data.balance
}

export async function changeBalanceWhere(balanceWhere: number, where: string, sum: number) {

  const { error } = await supabase
    .from("accounts")
    .update({
      balance: balanceWhere + sum
    })
    .eq("account_number", where);

  if (error) {
    console.log("Ошибка changeBalanceWhere")
    return false
  }

  return true
}

//*----------------------------------------Получение сщета получателя + изменение его баланса ----------------------------------------------------







