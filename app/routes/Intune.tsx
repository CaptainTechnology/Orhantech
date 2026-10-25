
import { Link } from "react-router";

const modules = [
  {
    number: "01",
    title: "Microsoft Entra ID Fundamentals",
    topics: [
      "Tenant and directory fundamentals",
      "Users, groups and administrative roles",
      "MFA, SSO and authentication methods",
      "Enterprise applications and identity troubleshooting",
    ],
  },
  {
    number: "02",
    title: "Conditional Access & Identity Security",
    topics: [
      "Conditional Access policies and assignments",
      "MFA enforcement and sign-in controls",
      "Device-based access and compliance signals",
      "Sign-in logs and policy troubleshooting",
    ],
  },
  {
    number: "03",
    title: "Microsoft Intune Fundamentals",
    topics: [
      "Intune admin center and tenant setup",
      "Device enrollment and ownership",
      "Device groups and assignment filters",
      "Configuration profiles and policy deployment",
    ],
  },
  {
    number: "04",
    title: "macOS Management — Basic to Advanced",
    topics: [
      "macOS enrollment and device management",
      "Configuration profiles and restrictions",
      "FileVault, security settings and compliance",
      "Application deployment, updates and scripting",
      "Logs and troubleshooting",
    ],
  },
  {
    number: "05",
    title: "iOS & iPadOS Management",
    topics: [
      "Apple Business Manager fundamentals",
      "Automated Device Enrollment",
      "Apple Push Notification service (APNs)",
      "Managed applications and app protection",
      "Compliance and restrictions",
    ],
  },
  {
    number: "06",
    title: "Windows Support — L1",
    topics: [
      "Windows enrollment and device registration",
      "Configuration profiles and compliance policies",
      "Application deployment and updates",
      "Basic endpoint and access troubleshooting",
    ],
  },
  {
    number: "07",
    title: "Windows Support — L2",
    topics: [
      "Policy and application deployment failures",
      "Windows event logs and diagnostic collection",
      "Enrollment and compliance troubleshooting",
      "Windows Autopilot fundamentals",
      "Root-cause analysis and escalation",
    ],
  },
  {
    number: "08",
    title: "Enterprise Lab & Final Project",
    topics: [
      "Configure users, groups and Conditional Access",
      "Enroll and manage supported devices",
      "Deploy applications and security policies",
      "Troubleshoot real-world support scenarios",
      "Final practical assessment",
    ],
  },
];

const platforms = [
  {
    code: "macOS",
    title: "Apple Mac",
    description:
      "Device management, profiles, security and application deployment.",
  },
  {
    code: "iOS",
    title: "iPhone & iPad",
    description:
      "Enrollment, managed applications, restrictions and compliance.",
  },
  {
    code: "L1",
    title: "Windows L1",
    description:
      "Enrollment, apps, configuration and everyday IT support.",
  },
  {
    code: "L2",
    title: "Windows L2",
    description:
      "Logs, policy failures, diagnostics and advanced troubleshooting.",
  },
];

export default function IntuneCourse() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="overflow-hidden bg-[#081426] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200 sm:text-sm">
              OrhanTech Academy · Practical Training
            </p>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Microsoft Intune
              <span className="block text-blue-300">& Entra ID</span>
            </h1>

            <h2 className="mt-4 max-w-xl text-xl font-semibold leading-snug text-slate-200 sm:text-2xl">
              From Fundamentals to Enterprise Support
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              Build practical endpoint management and identity security skills
              across macOS, iOS, iPadOS and Windows, from initial setup to
              enterprise troubleshooting.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400"
              >
                Enrol Now →
              </Link>
              <a
                href="#course-syllabus"
                className="rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Curriculum
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="text-xl font-bold sm:text-2xl">12 Weeks</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Learning plan
                </p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">4 Platforms</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Apple & Windows
                </p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">Hands-on</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Practical labs
                </p>
              </div>
            </div>
          </div>

          {/* Full image: no crop and no overlay */}
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-3 rounded-3xl bg-blue-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white p-2 shadow-2xl sm:p-3">
              <img
                src="/intune.webp"
                alt="Microsoft Intune and Entra ID training"
                className="block h-auto max-h-[560px] w-full rounded-xl object-contain"
                loading="eager"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Entra ID", "Microsoft Intune", "Endpoint Security"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 sm:text-sm"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Course Overview
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn the skills modern IT teams use
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Understand how Microsoft Entra ID and Intune work together to
              manage identities, secure access and maintain device compliance.
              Progress from foundational administration to practical
              troubleshooting for enterprise environments.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Designed for IT support engineers, endpoint administrators,
              macOS support professionals and learners preparing for enterprise
              IT roles.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-xl font-bold">What you will learn</h3>
            <ul className="mt-5 space-y-4">
              {[
                "Manage users, groups and identities in Entra ID",
                "Configure MFA and Conditional Access",
                "Enroll and manage Apple and Windows devices",
                "Deploy applications, profiles and security policies",
                "Investigate compliance and deployment failures",
                "Troubleshoot common L1 and L2 support incidents",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>
                  <span className="text-sm leading-6 text-slate-700 sm:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="border-y border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Platforms Covered
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              One course. Multiple environments.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Learn the workflows used to manage devices and support users
              across modern workplace platforms.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform) => (
              <article
                key={platform.code}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                  {platform.code}
                </div>
                <h3 className="mt-5 text-lg font-bold">{platform.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {platform.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section
        id="course-syllabus"
        className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-8 lg:py-20"
      >
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
            Curriculum
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your learning roadmap
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Eight structured modules covering identity, Apple device
            management, Windows endpoint support and troubleshooting.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {modules.map((module) => (
            <details
              key={module.number}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition open:border-blue-200 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-open:bg-blue-600 group-open:text-white">
                  {module.number}
                </span>
                <span className="flex-1 text-sm font-bold sm:text-base">
                  {module.title}
                </span>
                <span className="text-xl text-slate-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:pl-[5.75rem]">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                    >
                      <span className="text-blue-600">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Audience and course details */}
      <section className="bg-[#081426] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm">
              Who Should Join?
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
              Take the next step in your IT career
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Suitable for service desk professionals, IT support engineers,
              macOS administrators, Windows support engineers and aspiring
              endpoint management specialists.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">
            <h3 className="text-xl font-bold">Course Details</h3>
            <dl className="mt-6 space-y-4">
              {[
                ["Duration", "12 weeks"],
                ["Training format", "Live / practical labs"],
                ["Skill level", "Beginner to advanced"],
                ["Platforms", "macOS, iOS, Windows"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-slate-400">{label}</dt>
                  <dd className="text-right text-sm font-semibold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-6 text-slate-400">
              Practical lab access depends on trial eligibility, licensing and
              supported devices. Some enterprise features require additional
              licenses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            OrhanTech Academy
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
            Ready to learn Intune & Entra ID?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Develop practical identity and endpoint management skills for
            modern enterprise environments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Create Your Account →
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
