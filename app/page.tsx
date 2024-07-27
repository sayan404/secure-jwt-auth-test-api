import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-lg pb-24 font-sans font-bold text-center p-5"> <span className="bg-slate-400 rounded-md p-2 mr-1 text-white">secure-jwt-auth </span> is a simple and lightweight utility library for encoding, decoding, and validating JSON Web Tokens in TypeScript</h1>
      <Link href={`https://www.npmjs.com/package/secure-jwt-auth`} target="_blank">
        <button className="bg-black text-white p-5 rounded-xl ">
          secure-jwt-auth package
        </button>
      </Link>
      <Link href={`https://documenter.getpostman.com/view/23890489/2sA3kYk1S8`} target="_blank">
        <button className="bg-black text-white p-5  rounded-xl ">
          Checkout Docs
        </button>
      </Link>
    </main>
  );
}
