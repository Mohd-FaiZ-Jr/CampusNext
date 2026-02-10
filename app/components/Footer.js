import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Brand Section */}
        <div className="md:col-span-4">
          <h3 className="text-white text-xl font-bold mb-4 font-orbitron">
            CampusNest.
          </h3>
          <p className="text-sm text-gray-400 font-raleway max-w-sm">
            Student-first rental platform built for trust, speed, and comfort.
          </p>
        </div>

        {/* Right Footer Columns */}
        <div className="md:col-span-8 flex md:justify-end">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <FooterCol
              title="Explore"
              links={["Find Homes", "Verified Listings"]}
            />
            <FooterCol
              title="Company"
              links={["About Us", "Support"]}
            />
            <FooterCol
              title="Legal"
              links={["Privacy Policy", "Terms of Service"]}
            />
          </div>
        </div>
      </div>


      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400 font-nunito">
        © {new Date().getFullYear()} CampusNest. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="ml-10">
      <h4 className="text-white font-semibold mb-4 font-raleway">{title}</h4>
      <ul className="space-y-1 text-sm font-nunito">
        {links.map((l) => (
          <li key={l} className="hover:text-white cursor-pointer">{l}</li>
        ))}
      </ul>
    </div>
  );
}
