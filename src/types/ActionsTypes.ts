import type { User } from "@supabase/supabase-js"

export type InitalState = {
  error: string,
  loading: boolean,
  form: {
    status: string,
    done: boolean,
    sum: string,
    from: string,
    massege: string,
    date: string,
  }
}

export type ActionsAction = {
  changeBalance: (user: User | null, value: number, mode: "deposit" | "windtraw") => Promise<void>
  transfer: (user: User | null, where: string, sum: number) => Promise<void>
}