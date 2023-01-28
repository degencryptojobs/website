import Link from "next/link";

export const Landing = () => {
  return (
    <div className="align-center mx-auto flex h-[calc(100vh-10rem)] flex-col items-center text-2xl">
      <div className="m-auto block align-middle">
        <h1 className="mb-20 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Degen Crypto Jobs
        </h1>
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <button
            type="button"
            className="mx-2 mb-2 rounded-lg bg-blue-600 px-5 py-2.5 text-2xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            <Link href="https://airtable.com/shrhCHdhdQHwiqOAR">
              Newsletter
            </Link>
          </button>
          <button
            type="button"
            className="mx-2 mb-2 rounded-lg bg-blue-600 px-5 py-2.5 text-2xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            <Link href="https://t.me/degencryptojobs">Telegram</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
