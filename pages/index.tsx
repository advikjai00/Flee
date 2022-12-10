import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = () => {
  return (
    <div className=" text-white mt-16">
      <Head>
        <title>Flee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center px-40 justify-between gap-20">
        <div>
          <p className="text-5xl italic mb-5 font-bold">Flee tokens.</p>
          <p className="">
            Flee is an token streaming protocol for handling streamed
            subscriptions for any services like salaries, rewards or anything.
          </p>
          <Link href="/create">
            <button className="bg-red-400 font-bold-700 creat-border px-10 py-3 rounded-lg mt-5 uppercase">
              Create
            </button>
          </Link>
        </div>
        <Image src="/money_stream.gif" alt="logo" width={700} height={700} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
