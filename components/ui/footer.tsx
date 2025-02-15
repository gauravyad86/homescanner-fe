import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Image from "next/image";
import mainLogo from "@/public/images/homescanner_footer.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 z-2">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">

        <div>
          <Image src={mainLogo} alt="CirclePe Logo" width={150} height={50} />
          <p className="mt-4 text-neutral-400">Registered By:</p>
          <p className="text-neutral-400 font-semibold">HOMESCANNER PRIVATE LIMITED</p>
          <p className="mt-4 text-neutral-400">Office Address:</p>
          <p className="text-neutral-400">Sector 27, Near IIT DELHI, Gurgaon, 122001</p>
          <p className="mt-4 text-neutral-400">Call Us:</p>
          <p className="text-black">+91 83683 76123 &nbsp; +91 75052 03489 &nbsp; +91 70076 72505</p>
        </div>

        {/* Middle Section */}
        <div className="text-center">
          <p className="text-lg  font-normal">Follow Our Social Media</p>
            <div className="flex justify-center  gap-4 mt-3">
            <Link href="https://www.linkedin.com" passHref>
              <FaLinkedinIn className="text-3xl cursor-pointer text-blue-500" />
            </Link>
            <Link href="https://www.facebook.com" passHref>
              <FaFacebookF className="text-3xl cursor-pointer text-blue-600" />
            </Link>
            <Link href="https://www.twitter.com" passHref>
              <FaTwitter className="text-3xl cursor-pointer text-blue-400" />
            </Link>
            <Link href="https://www.instagram.com" passHref>
              <FaInstagram className="text-3xl cursor-pointer text-pink-500" />
            </Link>
            </div>
          <div className="mt-12">
            <p className="text-2xl font-normal text-gray-500">Site Links</p>
            <div className="flex flex-col justify-center gap-4 mt-4">
              <Link href="" className="hover:text-black cursor-pointer" >For Tenants</Link>
              <Link href="" className="hover:text-black cursor-pointer">For Landlord</Link>
              <Link href="" className="hover:text-black cursor-pointer">About Us</Link>
              <Link href="" className="hover:text-black cursor-pointer">Blogs</Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative left-16">
          <p className="text-lg font-semibold">Grievance Cell</p>
          <p className="text-black mt-2">Vishal Das Saini (Grievance Officer)</p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <AiOutlinePhone className="text-xl" /> +91 93542-35813
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-2">
            <AiOutlineMail className="text-xl" /> support@circlepe.com
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
