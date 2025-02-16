import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Image from "next/image";
import mainLogo from "@/public/images/homescanner_footer.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 z-40">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <Image src={mainLogo} alt="CirclePe Logo" width={150} height={50} />
          <p className="mt-4 text-neutral-400">Registered By:</p>
          <p className="text-neutral-400 font-semibold">HOMESCANNER PRIVATE LIMITED</p>
          <p className="mt-4 text-neutral-400">Office Address:</p>
          <p className="text-neutral-400">IIT DELHI, Haus Khas,110016</p>
          <p className="mt-4 text-neutral-400">Call Us:</p>
          <p className="text-white">+91 85957-83600 &nbsp; +91 86994-27745 &nbsp;</p>
        </div>

        {/* Middle Section */}
        <div className="text-center">
          <p className="text-lg  font-normal">Follow Our Social Media</p>
            <div className="flex justify-center relative right-5 gap-4 mt-3">
            <Link href="https://www.linkedin.com/company/homescanner/" passHref>
              <FaLinkedinIn className="text-3xl cursor-pointer hover:text-blue-500" />
            </Link>
            <Link href="https://www.facebook.com" passHref>
              <FaFacebookF className="text-3xl cursor-pointer hover:text-blue-600" />
            </Link>
            <Link href="https://www.twitter.com" passHref>
              <FaTwitter className="text-3xl cursor-pointer hover:text-blue-400" />
            </Link>
            <Link href="https://www.youtube.com/@homescanner-ai" passHref>
              <FaYoutube className="text-3xl cursor-pointer hover:text-pink-500" />
            </Link>
            </div>
          <div className="mt-12">
            <p className="text-2xl font-normal text-gray-500">Quick Links</p>
            <div className="flex flex-col justify-center gap-4 mt-4">
              <Link href="" className="hover:text-white cursor-pointer" >Privacy Policy</Link>
              <Link href="" className="hover:text-white cursor-pointer">Terms and Condition</Link>
              <Link href="" className="hover:text-white cursor-pointer">Cookies Policy</Link>
              <Link href="" className="hover:text-white cursor-pointer"></Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative left-16">
          <p className="text-lg font-semibold">Grievance Cell</p>
          <p className="text-white mt-2">Yash Kumar (Grievance Officer)</p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <AiOutlinePhone className="text-xl" /> +91 86994-27745
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <AiOutlineMail className="text-xl" /> support@homescanner.com
          </p>

          <div className="mt-6">
            <p className="text-lg font-semibold">Download Our App:</p>
            <div className="flex gap-4 mt-3">
              <FaApple className="text-4xl cursor-pointer hover:text-gray-300" />
              <FaGooglePlay className="text-4xl cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-neutral-400 mt-8">Copyright ©2025, All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
