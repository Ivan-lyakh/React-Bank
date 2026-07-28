import type { User } from "@supabase/supabase-js"

export type Account = {
  id: number,
  created_at: string,
  balance: number,
  user_id: string,
  account_number: string
  PIN: number
}

export type InitialState = {
  error: string,
  loading: boolean,
  account: null | Account
}


export type LoadAccount = {
  loadAccount: (user: User | null) => Promise<void>
}
