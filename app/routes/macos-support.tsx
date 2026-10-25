
import { Link } from "react-router";

const modules = [
  {
    number: "01",
    title: "macOS Fundamentals & Architecture",
    topics: [
      "macOS versions, architecture and system components",
      "Finder, Dock, Menu Bar and System Settings",
      "APFS, volumes, containers and storage",
      "Hardware details and system information",
      "Essential macOS support terminology",
    ],
  },
  {
    number: "02",
    title: "Users, Groups & Permissions",
    topics: [
      "Standard, administrator and guest accounts",
      "Local users, groups and account management",
      "File ownership and permissions",
      "chmod, chown and sudo fundamentals",
      "Troubleshoot login and access issues",
    ],
  },
  {
    number: "03",
    title: "macOS Installation & Recovery",
    topics: [
      "Erase All Content and Settings",
      "macOS Recovery and startup options",
      "Disk Utility, APFS volumes and First Aid",
      "Reinstall macOS and activation basics",
      "Create a bootable macOS installer",
    ],
  },
  {
    number: "04",
    title: "Startup, Login & User Environment",
    topics: [
      "Startup failures and recovery options",
      "Safe Mode and diagnostic startup",
      "Login items and background applications",
      "Troubleshoot login loops and frozen sessions",
      "Collect evidence before escalation",
    ],
  },
  {
    number: "05",
    title: "Application & Performance Troubleshooting",
    topics: [
      "Activity Monitor: CPU, memory and energy",
      "Application crashes and force quit",
      "Disk space and performance investigations",
      "Install, update and uninstall applications",
      "Interpret crash reports and diagnostic data",
    ],
  },
  {
    number: "06",
    title: "Network, VPN & Peripheral Support",
    topics: [
      "Wi-Fi and network troubleshooting",
      "DNS, IP addresses, routes and connectivity",
      "VPN connectivity and certificate basics",
      "Printers, displays, audio and peripherals",
      "Useful network diagnostic commands",
    ],
  },
  {
    number: "07",
    title: "Terminal & macOS Diagnostics",
    topics: [
      "Terminal navigation and filesystem commands",
      "Processes, services and launchctl basics",
      "System logs and log show",
      "Disk, network and hardware diagnostics",
      "Collect diagnostic evidence for support tickets",
    ],
  },
  {
    number: "08",
    title: "Bash Scripting for Support Engineers",
    topics: [
      "Variables, arguments and exit codes",
      "Conditions, loops and functions",
      "File checks and command output",
      "Logging and safe error handling",
      "Build a reusable Mac health-check script",
    ],
  },
  {
    number: "09",
    title: "macOS Security & Privacy",
    topics: [
      "FileVault status and recovery-key concepts",
      "Gatekeeper and application security",
      "Privacy permissions and TCC",
      "Keychain and certificate troubleshooting",
      "Firewall basics and secure support practices",
    ],
  },
  {
    number: "10",
    title: "Software, Updates & Data Protection",
    topics: [
      "Application installation troubleshooting",
      "macOS update failures and compatibility",
      "Storage cleanup and disk-space investigation",
      "Backup, restore and migration fundamentals",
      "User data protection and recovery planning",
    ],
  },
  {
    number: "11",
    title: "Advanced L2 Troubleshooting",
    topics: [
      "Investigate complex multi-symptom incidents",
      "Correlate logs and identify probable root causes",
      "Resolve recurring performance and login issues",
      "Capture diagnostics and document findings",
      "Escalation, incident communication and RCA",
    ],
  },
  {
    number: "12",
    title: "Capstone Project & Job Readiness",
    topics: [
      "Complete an end-to-end support ticket",
      "Diagnose and resolve assigned Mac issues",
      "Write a clear technical resolution report",
      "Demonstrate safe troubleshooting practices",
      "Final practical assessment and interview scenarios",
    ],
  },
];

const outcomes = [
  "Support users with everyday macOS issues",
  "Diagnose startup, login and application failures",
  "Troubleshoot networking and connected devices",
  "Use Terminal and logs to investigate problems",
  "Create basic Bash scripts for repetitive support tasks",
  "Document incidents and escalate with useful evidence",
];

const labs = [
  {
    week: "01",
    title: "Mac inventory & health report",
    description:
      "Collect macOS version, hardware details, storage information and basic system status.",
  },
  {
    week: "02",
    title: "User access troubleshooting",
    description:
      "Investigate a test account, administrator access and file-permission problems.",
  },
  {
    week: "03",
    title: "Recovery & reinstall workflow",
    description:
      "Practice Recovery and Disk Utility procedures using a test Mac and approved test data.",
  },
  {
    week: "04",
    title: "Startup & login incident",
    description:
      "Work through a simulated startup, login-item or user-session failure.",
  },
  {
    week: "05",
    title: "Slow Mac investigation",
    description:
      "Use Activity Monitor and diagnostics to investigate CPU, memory and storage pressure.",
  },
  {
    week: "06",
    title: "Network & peripheral diagnosis",
    description:
      "Investigate a simulated DNS, connectivity, printer or peripheral issue.",
  },
  {
    week: "07",
    title: "Diagnostic evidence collection",
    description:
      "Use Terminal and system logs to prepare evidence for a support ticket.",
  },
  {
    week: "08",
    title: "Build a support script",
    description:
      "Create a Bash health-check script with readable output, logging and error handling.",
  },
  {
    week: "09",
    title: "Security & privacy investigation",
    description:
      "Investigate application permissions, Gatekeeper behavior and FileVault status.",
  },
  {
    week: "10",
    title: "Application update recovery",
    description:
      "Troubleshoot an application installation or update failure while protecting user data.",
  },
  {
    week: "11",
    title: "L2 incident & root-cause analysis",
    description:
      "Correlate symptoms and logs, document findings and recommend a safe resolution.",
  },
  {
    week: "12",
    title: "Final practical support assessment",
    description:
      "Handle a simulated ticket from initial triage through resolution and closure notes.",
  },
];

export default function MacOSSupportCourse() {
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
              macOS Support
              <span className="block text-blue-300">Engineering</span>
            </h1>

            <h2 className="mt-4 max-w-xl text-xl font-semibold leading-snug text-slate-200 sm:text-2xl">
              From Desktop Support to Advanced L2 Troubleshooting
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
              Build practical Mac support skills through guided labs covering
              macOS recovery, users and permissions, applications, networking,
              Terminal, scripting, security and real-world incident handling.
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
                  Structured plan
                </p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">12 Labs</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Practical focus
                </p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">L1 + L2</p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Support skills
                </p>
              </div>
            </div>
          </div>

          {/* macOS hero visual */}
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-3 rounded-3xl bg-blue-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-6 shadow-2xl sm:p-8">
              <div className="flex items-center gap-2 border-b border-white/10 pb-5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-slate-400">
                  macOS Support Lab
                </span>
              </div>

              <div className="py-9 sm:py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-3xl text-blue-200">
                  
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                  Learn · Diagnose · Resolve
                </p>

                <h3 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  Master everyday
                  <span className="block text-blue-300">
                    Mac troubleshooting.
                  </span>
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                  Hands-on practice with the tools and workflows used by
                  professional desktop support teams.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "System Recovery",
                  "Terminal & Logs",
                  "Network Support",
                  "Bash Scripting",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm font-medium text-slate-200"
                  >
                    <span className="mr-2 text-blue-300">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Practical training using supported macOS devices and test
              scenarios.
            </p>
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
              Learn to troubleshoot Macs with confidence
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              This 12-week program takes learners from macOS fundamentals to
              structured L1 and L2 troubleshooting. Learn to investigate
              common issues, use built-in diagnostic tools, understand logs,
              automate routine checks and communicate technical findings.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              The course focuses on macOS support rather than MDM
              administration. No prior enterprise Mac administration
              experience is required, although basic computer knowledge helps.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h3 className="text-xl font-bold">Course outcomes</h3>
            <ul className="mt-5 space-y-4">
              {outcomes.map((item) => (
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

      {/* Skills */}
      <section className="border-y border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Core Skill Areas
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              The skills behind effective Mac support
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Build a repeatable approach to investigation, resolution,
              documentation and escalation.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "System Administration",
                description:
                  "Users, groups, permissions, storage and macOS recovery.",
              },
              {
                number: "02",
                title: "Troubleshooting",
                description:
                  "Startup, applications, performance, connectivity and devices.",
              },
              {
                number: "03",
                title: "Command Line",
                description:
                  "Terminal commands, system logs and diagnostic collection.",
              },
              {
                number: "04",
                title: "Automation",
                description:
                  "Basic Bash scripting and repeatable support health checks.",
              },
              {
                number: "05",
                title: "Security Basics",
                description:
                  "FileVault, Gatekeeper, privacy permissions and Keychain.",
              },
              {
                number: "06",
                title: "IT Service Support",
                description:
                  "Ticket ownership, root-cause analysis and clear escalation.",
              },
            ].map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                  {item.number}
                </div>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
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
            12-Week Curriculum
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Your learning roadmap
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Twelve structured modules progressing from foundational support
            through diagnostics, scripting and advanced L2 incident handling.
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
                  Week {Number(module.number)}: {module.title}
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

      {/* Practical Labs */}
      <section className="border-y border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Hands-on Practice
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Practice real support scenarios
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Every week includes a practical task that reinforces the
              troubleshooting methods covered in the module.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab) => (
              <article
                key={lab.week}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Week {lab.week}
                </p>
                <h3 className="mt-3 text-lg font-bold">{lab.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {lab.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            <strong>Lab safety:</strong> Recovery, reinstall and encryption
            exercises must use an authorized test device or safely prepared
            test environment. Verify backups and obtain approval before any
            destructive operation. Do not experiment on production devices.
          </div>
        </div>
      </section>

      {/* Career & Details */}
      <section className="bg-[#081426] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm">
              Career Preparation
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
              Build a foundation for Mac support roles
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Practice ticket triage, diagnosis, resolution notes and
              escalation. Learn to explain what you investigated, what you
              found and why your recommended fix is appropriate.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "macOS Support Engineer",
                "Apple Desktop Support",
                "IT Support L1",
                "IT Support L2",
              ].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 sm:text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-8">
            <h3 className="text-xl font-bold">Course Details</h3>
            <dl className="mt-6 space-y-4">
              {[
                ["Duration", "12 weeks"],
                ["Level", "L1 + L2"],
                ["Format", "Practical learning"],
                ["Focus", "macOS support only"],
                ["MDM labs", "Not included"],
                ["Registration fee", "To be announced"],
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
              A compatible Mac and supported test environment are recommended.
              Some labs may vary by macOS version and hardware.
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
            Ready to start your macOS support journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Develop practical troubleshooting, diagnostic and technical
            support skills through a structured 12-week learning program.
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
