import os

from dotenv import load_dotenv
from fire import Fire
from pyairtable import Table
from supabase import create_client, Client

load_dotenv('.env.local')


def load_airtable(apikey, base_id, table_name):
    try:
        return Table(apikey, base_id, table_name)
    except Exception as e:
        print(f'Failed loading! Try again! [{e}]')


def sync_companies(supabase):

    companies_table = load_airtable(
        os.environ.get("AIRTABLE_API_KEY"),
        os.environ.get("AIRTABLE_BASE_ID"),
        table_name="Companies",
    )

    i = 0
    for page in companies_table.iterate():
        for record in page:
            print(i)
            i += 1
            response = supabase.table("companies").select("*").eq("name", record["fields"]["Company"]).execute()
            if len(response.data) == 0:
                data = {
                    "name": record["fields"]["Company"],
                }
                if "Logo" in record["fields"]:
                    data["logo"] = record["fields"]["Logo"][0]
                response = supabase.table("companies").insert(data).execute()


def main():
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_SERVICE_ROLE")
    supabase: Client = create_client(url, key)

    jobs_table = load_airtable(
        os.environ.get("AIRTABLE_API_KEY"),
        os.environ.get("AIRTABLE_BASE_ID"),
        table_name="Jobs copy",
    )

    i = 0
    for page in jobs_table.iterate():
        for record in page:
            print(i)
            i += 1
            company_name = record["fields"]["Company (from Company)"][0]
            company = supabase.table("companies").select("*").eq("name", company_name).execute()
            company = company.data[0]
            response = supabase.table("jobs").select("*").eq("title", record["fields"]["Title"]).eq("company", company["id"]).execute()
            if len(response.data) == 0:
                data = {
                    "title": record["fields"]["Title"],
                    "company": company["id"],
                    "date": record["fields"]["Date"],
                    "link": record["fields"]["Link"],
                    "source": record["fields"]["Source"],
                    "location": record["fields"]["Location"],
                    "tags": record["fields"]["Tags"],
                    "description": record["fields"]["Description"],
                    "h1b_comparative_job": record["fields"]["H1b comparative job"],
                    "h1b_comparative_salary": record["fields"]["H1b comparative salary"],
                    "salary": record["fields"]["Salary"],
                    "pretty_url": record["fields"]["Pretty url"],
                }
                response = supabase.table("jobs").insert(data).execute()
    


if __name__ == "__main__":
    Fire(main)
