import Link from "next/link";

export const Hero = () => {
  return (
    <section className="bg-gray-800 text-gray-100">
      <div className="container mx-auto flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24">
        <div className="flex flex-col justify-center rounded-sm p-6 text-center lg:max-w-md lg:text-left xl:max-w-lg">
          <h1 className="text-3xl font-bold leading-none sm:text-4xl">
            Degen <span className="text-[#47def1]">Crypto</span> Jobs
          </h1>
          <p className="mt-6 mb-8 text-base sm:mb-12 sm:text-lg">
            Discover 1000+ global opportunities in the crypto industry on Degen
            Crypto Jobs. Connect with top employers and advance your career in
            this exciting field. Join us now!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link
              rel="noopener noreferrer"
              href="https://airtable.com/shrhCHdhdQHwiqOAR"
              className="rounded bg-[#47def1] px-8 py-3 text-lg font-semibold text-gray-900"
            >
              Join us now
            </Link>
            <Link
              rel="noopener noreferrer"
              href="https://t.me/degencryptojobs"
              className="rounded border border-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Telegram
            </Link>
          </div>
        </div>
        <div className="xl:h-112 2xl:h-128 mt-8 hidden h-72 items-center justify-center p-6 sm:flex sm:h-80 lg:mt-0 lg:h-96">
          <img
            src="/hero_image.jpg"
            alt=""
            width="0"
            height="0"
            className="h-72 w-auto rounded-full object-contain sm:h-80 lg:h-96"
          />
        </div>
      </div>
    </section>
  );
};
