
import { Link } from "react-router";

const courses = [
  {
    id: "jamf-pro",
    name: "Jamf Pro Administration & Engineering",
    duration: "2 Months",
    fee: "₹8,000",
    description:
      "Learn Apple device management, Jamf Pro administration, deployment, security and automation through practical labs.",
    features: [
      "Jamf Pro administration",
      "Apple Business Manager and ADE",
      "Device deployment and automation",
      "Practical labs and troubleshooting",
    ],
    href: "/courses/jamf-pro",
  },
  {
    id: "intune-entra",
    name: "Microsoft Intune & Entra ID",
    duration: "Duration to be confirmed",
    fee: "₹8,000",
    description:
      "Learn identity management, endpoint enrollment, device compliance and security for enterprise environments.",
    features: [
      "Microsoft Entra ID fundamentals",
      "Microsoft Intune enrollment",
      "Configuration and compliance policies",
      "Mac and Windows lab practice",
    ],
    href: "/courses/intune-entra",
  },
  {
    id: "macos-support",
    name: "macOS Support Engineering",
    duration: "12 Weeks",
    fee: "₹6,000",
    description:
      "Build practical macOS support skills in troubleshooting, system administration and endpoint security.",
    features: [
      "macOS installation and recovery",
      "Users, groups and permissions",
      "Terminal and troubleshooting",
      "macOS security and support",
    ],
    href: "/courses/macos-support",
  },
];

export default function RegistrationFees() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            ORHANTECH.IN ACADEMY
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Course Registration
            <span className="mt-2 block text-blue-400">
              & Fees
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Choose your course, explore the training details and
            register to begin your learning journey.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-7 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl transition hover:-translate-y-1 hover:border-blue-400/50"
            >
              <span className="w-fit rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
                Professional Training
              </span>

              <h2 className="mt-5 text-2xl font-bold leading-snug">
                {course.name}
              </h2>

              <p className="mt-4 min-h-20 text-sm leading-7 text-slate-300">
                {course.description}
              </p>

              <div className="my-7 rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Course Fee
                </p>

                <p className="mt-2 text-4xl font-black text-white">
                  {course.fee}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  Duration: {course.duration}
                </p>
              </div>

              <h3 className="text-sm font-bold text-white">
                What you will learn
              </h3>

              <ul className="mt-4 flex-1 space-y-3">
                {course.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-6 text-slate-300"
                  >
                    <span className="font-bold text-blue-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-3">
                <Link
                  to="/signup"
                  className="block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  Register Now
                </Link>

                <Link
                  to={course.href}
                  className="block rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-300"
                >
                  View Course Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Ready to start learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Create your student account to begin the registration
            process and explore your selected course.
          </p>

          <Link
            to="/signup"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-500"
          >
            Create Student Account
          </Link>
        </div>
      </section>
    </main>
  );
}
