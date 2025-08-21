import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.DBURL;
const supabaseKey = process.env.DBKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;