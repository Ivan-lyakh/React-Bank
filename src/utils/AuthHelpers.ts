import { supabase } from "../services/supabase/supabase";


export const createAccount = async (userId: string) => {
  const { data, error } = await supabase
    .from("accounts")
    .insert({
      balance: 0,
      user_id: userId,
      account_number: generateAccountNumber(),
    });

  if (error) {
    console.log(error);
  }

  return data;
};


export const generateAccountNumber = (): string => {
  const bankCode = "5000";

  const groups = [bankCode];

  for (let i = 0; i < 3; i++) {
    const group = Math.floor(1000 + Math.random() * 9000);
    groups.push(group.toString());
  }

  return groups.join(" ");
};