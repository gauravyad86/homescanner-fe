"use client"
import Link from "next/link";
import mainlogo from "@/public/images/homescannerLogo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@headlessui/react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    router.push("/map");
  };

  const handleTeam = () => {
    window.open("https://stamper.ai", "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between rounded-2xl bg-white/95 px-4 shadow-lg shadow-black/[0.03] backdrop-blur-sm transition-all duration-300 hover:bg-white/100">
          <div className="flex flex-1 items-center">
            <Link href="/" className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
              <Image src={mainlogo} alt="Logo" width={35} height={35} className="rounded-lg" />
              <span className="hidden text-lg font-semibold text-gray-800 md:inline-block">HomeScanner</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end gap-3">
            <Button
              onClick={() => setIsOpen(true)}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#83d454] to-[#68bb39] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <span className="relative">Sign Up</span>
            </Button>
            <Button
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <span className="relative">Start Magic</span>
            </Button>
            <Button
              onClick={handleTeam}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-md"
            >
              <span className="relative">Our Team</span>
            </Button>
          </nav>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">
                      {submitted ? "Thank you! 🎉" : "Sign Up for Early Access"}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {!submitted ? (
                    <>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">
                          Join our waitlist to get early access to our platform and exclusive features.
                        </p>
                      </div>
                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full rounded-lg bg-gradient-to-r from-[#83d454] to-[#68bb39] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#83d454]/50"
                        >
                          Join Waitlist
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="mt-6 text-center">
                      <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-green-100 p-2">
                        <svg
                          className="h-8 w-8 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">
                        Thanks for joining our waitlist! We'll review your request and send you login credentials once approved.
                      </p>
                      <Button
                        onClick={() => {
                          setIsOpen(false);
                          setSubmitted(false);
                        }}
                        className="mt-6 w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200"
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}