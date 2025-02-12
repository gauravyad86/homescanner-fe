"use client"
import Link from "next/link";
import mainlogo from "@/public/images/homescannerLogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";

export default function Header() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/map");
  };

  const handleTeam = () => {
    window.location.href = "https://stamper.ai";
  };

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <Image src={mainlogo} alt="Logo" width={35} height={35} />
            </Link>
          </div>
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              <Button onClick={handleStart} className="btn-sm bg-[#83d454] text-gray-200 shadow hover:bg-blue-600">
                Start Magic
              </Button>
            </li>
            <li>
              <Button onClick={handleTeam} className="btn-sm bg-[#83d454] text-gray-200 shadow hover:bg-blue-600">
                Our Team
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}