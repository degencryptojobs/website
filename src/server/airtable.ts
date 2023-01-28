import Airtable, { Base } from "airtable";

export const base: Base = Airtable.base(process.env.AIRTABLE_BASE_ID!);
