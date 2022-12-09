import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-40 py-5 border-b-2 border-gray-700">
      <div className="flex gap-10">
        <Link href="/">
          <button className="font-['Fasthand'] text-4xl">Flee</button>
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <Link href="/create">
          <button className="font-['Fasthand'] text-2xl">Create</button>
        </Link>
        <Link href="/myFlees">
          <button className="font-['Fasthand'] text-2xl">My flee</button>
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
}
