import { Link } from "react-router";

const modules = [
  {
    number: "01",
    title: "Jamf Pro Fundamentals & Architecture",
    topics: [
      "Jamf Pro architecture and administration",
      "Policies and configuration profiles",
      "Smart Groups and Extension Attributes",
      "Inventory collection and scope management",
    ],
  },
  {
    number: "02",
    title: "macOS Enrollment Methods",
    topics: [
      "Apple Business Manager (ABM) integration",
      "Automated Device Enrollment (ADE)",
      "PreStage Enrollment configuration",
      "Device Enrollment and User-Initiated Enrollment",
      "Enrollment customization and troubleshooting",
    ],
  },
  {
    number: "03",
    title: "Jamf Blueprint & CIS Benchmark",
    topics: [
      "Blueprint creation and configuration",
      "Compliance conditions and security baselines",
      "CIS Benchmark controls and implementation",
      "Compliance monitoring and remediation",
    ],
  },
  {
    number: "04",
    title: "Jamf Connect & Microsoft Entra ID",
    topics: [
      "Jamf Connect architecture and setup",
      "Entra ID identity provider integration",
      "Authentication and login configuration",
      "Identity integration troubleshooting",
    ],
  },
  {
    number: "05",
    title: "Jamf Pro & Jamf Account Integration",
    topics: [
      "Jamf Account and SSO concepts",
      "OIDC and identity provider configuration",
      "Jamf Pro authentication integration",
      "Integration testing and troubleshooting",
    ],
  },
  {
    number: "06",
    title: "Microsoft Entra ID & Conditional Access",
    topics: [
      "Conditional Access policy setup",
      "Device compliance and access requirements",
      "Identity-based access restrictions",
      "Policy validation and troubleshooting",
    ],
  },
  {
    number: "07",
    title: "Department-Wise Application Deployment",
    topics: [
      "IT, HR, Developer, Manager and Executive groups",
      "Policy scoping and exclusions",
      "Department-specific application deployment",
      "Self Service configuration and testing",
    ],
  },
  {
    number: "08",
    title: "Third-Party Application Automation",
    topics: [
      "Installomator deployment workflows",
      "Automated application installation and updates",
      "Patch management and version control",
      "Deployment scripts, logging and error handling",
    ],
  },
  {
    number: "09",
    title: "macOS Security & Compliance",
    topics: [
      "FileVault configuration and recovery",
      "Security configuration and restrictions",
      "Compliance reporting and monitoring",
      "Security remediation workflows",
    ],
  },
  {
    number: "10",
    title: "Troubleshooting & Enterprise Project",
    topics: [
      "Enrollment and policy troubleshooting",
      "Log collection and debugging",
      "Identity and application deployment issues",
      "Practical enterprise implementation project",
    ],
  },
];

const learningOutcomes = [
  "Configure Apple device enrollment workflows",
  "Implement security and compliance controls",
  "Understand Blueprint and CIS Benchmark concepts",
  "Integrate Jamf Connect with Entra ID",
  "Understand Jamf Pro and Jamf Account SSO",
  "Configure and test Conditional Access",
  "Deploy apps using department-based scoping",
  "Automate third-party application deployment",
];

const courseDetails = [
  { label: "Duration", value: "2 months" },
  { label: "Training", value: "Instructor-led practical learning" },
  { label: "Level", value: "Administration to enterprise engineering" },
  { label: "Labs", value: "Hands-on practice" },
];

export default function JamfProCourse() {
  return (
    <main className="min-h-screen bg-[#F3F6FB] pt-16 text-slate-900">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-[#071426] bg-cover bg-center px-5 py-16 text-white sm:py-24 lg:py-28"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(4,18,40,0.97) 0%, rgba(4,18,40,0.88) 42%, rgba(4,18,40,0.30) 100%), url('/jamf-hero.webp')",
        }}
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            to="/"
            className="text-sm font-medium text-blue-300 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              OrhanTech.in Academy
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Jamf Pro Administration &amp; Enterprise Engineering
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              Learn enterprise Apple device management, enrollment,
              security compliance, identity integration, Conditional
              Access and application deployment through practical
              implementation scenarios.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "2-Month Training Plan",
                "Practical Labs",
                "Enterprise Scenarios",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500"
            >
              Register as a Student →
            </Link>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="px-5 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Professional Training
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              About This Course
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-600">
              This advanced course focuses on real-world Jamf Pro
              administration and enterprise implementation. Students
              explore enrollment workflows, Blueprint compliance, CIS
              Benchmark controls, identity integrations, Conditional
              Access, macOS security and automated application deployment.
            </p>

            <h2 className="mt-10 text-xl font-bold sm:text-2xl">
              What You Will Learn
            </h2>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {learningOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>

                  <span className="text-sm leading-6 text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Information Card */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
              Course Details
            </p>

            <h3 className="mt-2 text-xl font-bold">
              Course Information
            </h3>

            <div className="mt-6 divide-y divide-slate-100">
              {courseDetails.map(({ label, value }) => (
                <div key={label} className="py-4">
                  <p className="text-sm text-slate-500">{label}</p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/signup"
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Create Student Account →
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Lab access and learning resources can be provided after
              registration review.
            </p>
          </aside>
        </div>
      </section>

      {/* Curriculum */}
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-[#EDF4FF] px-5 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Complete Curriculum
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Course Syllabus
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Explore ten practical modules covering Jamf Pro
            administration, enrollment, integrations, compliance,
            security and automation.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700">
                  {module.number}
                </div>

                <h3 className="mt-4 text-base font-bold leading-6 text-slate-900">
                  {module.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                    >
                      <span className="mt-1 text-blue-600">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Call to Action */}
      <section className="relative overflow-hidden bg-[#071426] px-5 py-14 text-white sm:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/jamf-hero.webp')",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-300">
            Build Your Enterprise Skills
          </p>

          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
            Ready to Start Learning?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
            Create your student account to begin the registration process.
            Lab access and learning resources can be provided after
            registration review.
          </p>

          <Link
            to="/signup"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500"
          >
            Register Now →
          </Link>
        </div>
      </section>
    </main>
  );
}