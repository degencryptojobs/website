import Head from "next/head";
import { NavBar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Degen Cryp</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://res.cloudinary.com/pory/image/upload/v1664286412/production/public/62a49957d679c500098aa529/degen-crypto-jobs-6af24cec-faviconUrl.jpg"
        />
        <title>DCJ Home Page • Degen Crypto Jobs</title>
        <meta
          name="description"
          content="DCJ is a leading crypto jobs platform, elevating your career to its highest potential! Be it designing NFT&#x27;s or creating new blockchains, we&#x27;ve got you covered."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Degen Crypto Jobs. Elevate Your Career!"
        />
        <meta
          property="og:description"
          content="DCJ is a leading crypto jobs platform, elevating your career to its highest potential! Be it designing NFT&#x27;s or creating new blockchains, we&#x27;ve got you covered."
        />
        <meta
          name="twitter:title"
          content="DCJ Home Page • Degen Crypto Jobs"
        />
        <meta
          name="twitter:description"
          content="DCJ is a leading crypto jobs platform, elevating your career to its highest potential! Be it designing NFT&#x27;s or creating new blockchains, we&#x27;ve got you covered."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/pory/image/upload/v1665952170/production/public/62a49957d679c500098aa529/62a49957d679c500098aa52a-ogImage.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
        {children}
      </main>
    </>
  );
};
