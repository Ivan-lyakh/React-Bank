import { createClient } from "@supabase/supabase-js";

const URL = "https://spasdnhlfswcinowihpl.supabase.co"

const KEY = "sb_publishable_zPmoc7JzqPQd367jbUiArg_ODZQwylZ"

export const supabase = createClient(URL, KEY)