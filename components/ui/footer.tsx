import Image from "next/image";
import Link from "next/link";
import mainLogo from "@/public/images/homescanner_footer.png";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-8 py-6 sm:gap-10 sm:py-8 sm:grid-cols-12 md:py-12 ${
            border ? "border-t [border-image:linear-gradient(to_right,transparent,theme(colors.slate.200),transparent)1]" : ""
          }`}
        >
          {/* 1st block */}
          <div className="space-y-2 text-center sm:text-left sm:col-span-12 lg:col-span-4">
            <div className="flex justify-center sm:justify-start">
              <Image src={mainLogo} alt="main-logo" width={120} height={120} />
            </div>
            <div className="text-base sm:text-lg lg:text-xl text-gray-600">
              &copy; homescanner - All rights reserved.
            </div>
          </div>

          {/* Social Component */}
          <div className="sm:col-span-12 lg:col-span-8">
            <div className="flex justify-center sm:justify-end">
              <div className="py-2 sm:py-3 space-y-2">
                <h3 className="text-lg sm:text-xl font-base text-center sm:text-right">Social</h3>
                <ul className="flex gap-2 sm:gap-3">
                  <li>
                    <Link
                      className="flex items-center justify-center text-amber-900 transition hover:text-blue-600"
                      href="#0"
                      aria-label="Twitter"
                    >
                      <svg
                        className="h-6 w-6 sm:h-8 sm:w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center justify-center text-amber-900 transition hover:text-blue-600"
                      href="#0"
                      aria-label="Medium"
                    >
                      <svg
                        className="h-6 w-6 sm:h-8 sm:w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23 8H9a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Zm-1.708 3.791-.858.823a.251.251 0 0 0-.1.241V18.9a.251.251 0 0 0 .1.241l.838.823v.181h-4.215v-.181l.868-.843c.085-.085.085-.11.085-.241v-4.887l-2.41 6.131h-.329l-2.81-6.13V18.1a.567.567 0 0 0 .156.472l1.129 1.37v.181h-3.2v-.181l1.129-1.37a.547.547 0 0 0 .146-.472v-4.749a.416.416 0 0 0-.138-.351l-1-1.209v-.181H13.8l2.4 5.283 2.122-5.283h2.971l-.001.181Z"></path>
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center justify-center text-amber-900 transition hover:text-blue-600"
                      href="#0"
                      aria-label="Github"
                    >
                      <svg
                        className="h-6 w-6 sm:h-8 sm:w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"></path>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-8 sm:-mt-16 h-40 sm:h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[90px] sm:text-[150px] font-bold leading-none before:bg-gradient-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['homescanner'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['homescanner'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-32 w-32 sm:h-56 sm:w-56 rounded-full border-[12px] sm:border-[20px] border-blue-700 blur-[40px] sm:blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
