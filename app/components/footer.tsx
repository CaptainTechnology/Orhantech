import { Link } from "react-router";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo, SocialIcons } from "./header";
import { Separator } from "./ui/separator";

const companyLinks = [
  { label: "About Us", to: "/about-mazhar" },
  { label: "Our Courses", to: "/courses" },
  { label: "Registration Fees", to: "/registration-fees" },
];

const learningLinks = [
  { label: "Jamf Pro Training", to: "/courses/jamf-pro" },
  { label: "Microsoft Intune & Entra ID", to: "/courses/intune-entra" },
  { label: "macOS Support", to: "/courses/macos-support" },
  { label: "Student Login", to: "/login" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 size-80 rounded-full bg-blue-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="max-w-sm">
              <Logo theme="dark" />

              <p className="mt-5 text-sm leading-7 text-slate-400">
                Build practical IT skills with industry-focused training
                in Jamf Pro, Apple device management, Microsoft Intune,
                Entra ID, and macOS support.
              </p>

              <div className="mt-6">
                <SocialIcons />
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Programs */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Training Programs
            </h3>

            <ul className="mt-5 space-y-3">
              {learningLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Get in Touch
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Have questions about our training programs? Contact us
              for course details and enrollment information.
            </p>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+918433602364"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                >
                  <Phone
                    size={17}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  <span>+91 84336 02364</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:mazhar.husain@orhantech.in"
                  className="flex items-start gap-3 text-sm transition-colors hover:text-white"
                >
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  <span className="break-all">
                    mazhar.husain@orhantech.in
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-blue-400"
                />
                <span>India · Online Training</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs leading-5 text-slate-500">
            © {new Date().getFullYear()} OrhanTech.in. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Practical learning. Real-world skills.
          </p>
        </div>
      </div>
    </footer>
  );
}