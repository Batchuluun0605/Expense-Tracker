import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sgl = neon(
  "postgresql://Batchuluun0605:pUHqlI9Aje3v@ep-withered-resonance-a1e5q34l.ap-southeast-1.aws.neon.tech/expenseTracker?sslmode=require"
);

export const db = drizzle(sgl, { schema });
