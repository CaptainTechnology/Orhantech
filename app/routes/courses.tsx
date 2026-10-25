import { Link } from "react-router";
import {
  ArrowRight,
  Laptop,
  ShieldCheck,
  Settings,
  BookOpen,
} from "lucide-react";

const courses = [
  {
    title: "Jamf Pro Administration",
    description:
      "Learn Apple device management, enrollment, configuration profiles, policies, application deployment, and automation.",
    icon: Laptop,
    category: "Apple Device Management",
    href: "/courses/jamf-pro",
    topics: [
      "Jamf Pro fundamentals",
      "Device enrollment and management",
      "Policies and configuration profiles",
      "Application deployment and automation",
    ],
  },
  {
    title: "Microsoft Intune & Entra ID",
    description:
      "Explore identity management, endpoint configuration, device compliance, and Microsoft device management integration.",
    icon: ShieldCheck,
    category: "Identity & Endpoint Management",
    href: "/courses/intune-entra",
    topics: [
      "Microsoft Entra ID fundamentals",
      "Device enrollment",
      "Configuration and compliance policies",
      "Endpoint management concepts",
    ],
  },
  {
    title: "macOS Support Engineering",
    description:
      "Build practical macOS support skills, troubleshoot common issues, and learn Mac administration fundamentals.",
    icon: Settings,
    category: "Apple Technical Support",
    href: "/courses/macos-support",
    topics: [
      "macOS installation and recovery",
      "Users and groups",
      "Troubleshooting and diagnostics",
      "Mac administration fundamentals",
    ],
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-indigo-500/10"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
            <BookOpen size={16} />
            OrhanTech.in Training Programs
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build Your Skills.
            <span className="mt-2 block text-blue-400">
              Advance Your IT Career.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore practical training programs in Apple device
            management, Microsoft endpoint management, and macOS support.
            Choose a course to explore its syllabus.
          </p>
        </div>
      </section>

      {/* Course cards */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Explore Programs
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Our Training Courses
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Select a training program to view its syllabus and course details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <article
                key={course.href}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.05] sm:p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
                  <Icon size={24} />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  {course.category}
                </p>

                <h3 className="mt-3 text-xl font-bold leading-snug text-white">
                  {course.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {course.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-200">
                    What you will explore
                  </h4>

                  <ul className="mt-4 space-y-3">
                    {course.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    to={course.href}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    View Syllabus
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/15 to-indigo-500/10 p-7 text-center sm:p-10">
          <h2 className="text-2xl font-bold">
            Ready to Start Learning?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore our training programs and review the course details
            to find the right learning path for you.
          </p>

          <Link
            to="/registration-fees"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20"
          >
            View Registration Fees
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}