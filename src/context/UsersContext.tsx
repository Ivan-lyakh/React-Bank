import { createContext } from "react";
import type { InitialState } from "../types/AuthTypes";
import type { Action } from "../hooks/useAuth";
import type { User } from "@supabase/supabase-js";
import type { ActionsUser } from "../types/AuthTypes";

type UserContext = {
  auth: InitialState,
  dispatch: React.Dispatch<Action>;
  user: User | null,
  actionsUser: ActionsUser,
  loadingUser: boolean
}

export const UsersContext = createContext<UserContext | null>(null)