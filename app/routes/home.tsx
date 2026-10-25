
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Code2,
  Laptop,
  Mail,
  Monitor,
  ShieldCheck,
  Settings,
  GraduationCap,
  ClipboardCheck,
  Wrench,
} from "lucide-react";
import type { MetaArgs } from "react-router";
import ContactEnquiry from "~/components/contact-enquiry";

export function meta({}: MetaArgs) {
  return [
    { title: "OrhanTech.in | Jamf Pro, Intune & Apple IT Solutions" },
    {
      name: "description",
      content:
        "OrhanTech provides Jamf Pro consulting, Apple Business Manager deployment, Microsoft Intune, Entra ID, macOS support and practical IT training.",
    },
  ];
}

const services = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Jamf Pro Implementation & Management",
    description:
      "Manage Apple devices throughout their lifecycle with centralized configuration, application deployment, security controls and automation.",
    tags: ["MDM", "Security", "Automation"],
    details: [
      "Jamf Pro setup, configuration and environment assessment",
      "Automated Device Enrollment and PreStage Enrollment",
      "Configuration profiles, policies and Smart Groups",
      "Application deployment, patch management and Self Service",
      "macOS compliance monitoring and security configuration",
      "Shell scripts, Extension Attributes and automated workflows",
      "Troubleshooting, documentation and ongoing administration",
    ],
  },
  {
    icon: Laptop,
    number: "02",
    title: "Apple Business Manager & Zero-Touch Deployment",
    description:
      "Simplify corporate Apple device provisioning through centralized device assignment, automated enrollment and standardized deployment workflows.",
    tags: ["ABM", "ADE", "Deployment"],
    details: [
      "Apple Business Manager setup guidance",
      "Reseller assignment and device enrollment workflows",
      "Jamf Pro MDM server integration and token management",
      "PreStage configuration and enrollment customization",
      "Automated provisioning for new employees",
      "Managed Apple Account and identity workflow guidance",
      "Device reassignment and deployment documentation",
    ],
  },
  {
    icon: Cloud,
    number: "03",
    title: "Microsoft Intune & Entra ID",
    description:
      "Support endpoint management and identity workflows with Microsoft Intune, Entra ID, compliance policies and access-control configuration.",
    tags: ["Intune", "Entra ID", "Identity"],
    details: [
      "Intune tenant and device enrollment configuration",
      "Windows configuration and compliance policies",
      "Microsoft Entra ID users, groups and identity workflows",
      "Conditional Access planning and configuration guidance",
      "Application deployment and endpoint security policies",
      "macOS management integration planning",
      "Jamf Pro and Microsoft Intune compliance integration",
    ],
  },
  {
    icon: Code2,
    number: "04",
    title: "macOS Support & Endpoint Automation",
    description:
      "Improve support operations with macOS troubleshooting, shell scripting, application lifecycle management and repeatable IT workflows.",
    tags: ["macOS", "Scripting", "Support"],
    details: [
      "macOS installation, recovery and troubleshooting",
      "Local user, group and administrator access management",
      "Shell scripting and IT automation",
      "Application installation, updates and patch workflows",
      "FileVault and software update configuration guidance",
      "Enrollment failures and device compliance troubleshooting",
      "Technical documentation and operational runbooks",
    ],
  },
];

const courses = [
  {
    title: "Jamf Pro Administration",
    detail:
      "Learn enrollment, policies, configuration profiles, Smart Groups, Self Service, application deployment and compliance workflows.",
    level: "Beginner to Advanced",
  },
  {
    title: "Apple Device Deployment",
    detail:
      "Understand Apple Business Manager, Automated Device Enrollment, PreStage Enrollment, device assignment and zero-touch deployment.",
    level: "Practical deployment labs",
  },
  {
    title: "Intune & Entra ID Labs",
    detail:
      "Explore device enrollment, compliance policies, identity management, endpoint configuration and integration scenarios.",
    level: "Guided practical labs",
  },
];

const deliverySteps = [
  {
    icon: ClipboardCheck,
    title: "Assess & Plan",
    description:
      "Review your current devices, management tools, enrollment processes and security requirements. Define the agreed project scope.",
  },
  {
    icon: Settings,
    title: "Configure & Deploy",
    description:
      "Configure management policies, enrollment workflows, applications and device settings according to your requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Standardize",
    description:
      "Establish consistent device configuration, compliance checks and security practices appropriate for your environment.",
  },
  {
    icon: Code2,
    title: "Automate & Optimize",
    description:
      "Reduce repetitive administration through scripts, policies, Smart Groups and repeatable deployment workflows.",
  },
  {
    icon: Wrench,
    title: "Troubleshoot & Support",
    description:
      "Investigate enrollment issues, application failures, configuration conflicts and endpoint management problems.",
  },
  {
    icon: GraduationCap,
    title: "Document & Enable",
    description:
      "Provide agreed technical documentation, operational guidance and knowledge transfer for your IT team.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-slate-950 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-32 md:pb-32 md:pt-40 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              <span className="size-2 rounded-full bg-blue-400" />
              Apple & Enterprise IT Solutions
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Manage devices.
              <br />
              <span className="text-blue-400">Secure identities.</span>
              <br />
              Build expertise.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Practical IT consulting and hands-on training for modern
              enterprises. Simplify Apple device management, strengthen
              endpoint workflows and build technical skills with OrhanTech.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
              >
                Explore Our Services <ArrowRight className="ml-2 size-5" />
              </a>

              <a
                href="#training"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Training
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
              {[
                "Practical labs",
                "Enterprise workflows",
                "Technical training",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-blue-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-3xl bg-blue-500/20 blur-3xl" />

            {/* Hero image: preserve the full image */}
            <img
              src="/confident-instructor.webp"
              alt="OrhanTech IT instructor"
              loading="eager"
              className="relative mx-auto mb-6 block h-auto max-h-96 w-full rounded-2xl object-contain shadow-xl"
            />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm text-slate-400">ORHANTECH</p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Endpoint Management
                  </h2>
                </div>
                <Monitor className="size-8 text-blue-400" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    label: "Apple Device Management",
                    value: "Jamf Pro",
                  },
                  {
                    label: "Automated Deployment",
                    value: "ABM / ADE",
                  },
                  {
                    label: "Endpoint & Identity",
                    value: "Intune / Entra ID",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-4"
                  >
                    <div>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                    </div>
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-blue-500/10 p-4">
                <p className="text-sm font-semibold text-blue-200">
                  Learn by doing
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Explore device deployment, security configuration and
                  automation through practical scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology areas */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-7 text-sm font-semibold text-slate-500 md:justify-between lg:px-8">
          <span>APPLE DEVICE MANAGEMENT</span>
          <span>JAMF PRO</span>
          <span>MICROSOFT INTUNE</span>
          <span>MICROSOFT ENTRA ID</span>
          <span>macOS SUPPORT</span>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our services
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Enterprise endpoint solutions, built around your needs.
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            From Apple device lifecycle management to Microsoft endpoint
            administration, we help teams plan, deploy, manage and support
            their device environments.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            const serviceImage =
              service.number === "01"
                ? "/confident-instructor.webp"
                : service.number === "02"
                  ? "/confident-woman.webp"
                  : service.number === "03"
                    ? "/happy-student-1.webp"
                    : "/happy-student-2.webp";

            return (
              <article
                key={service.number}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-xl sm:p-8"
              >
                {/* Service image: avoid cropping */}
                <div className="mb-6 flex min-h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                  <img
                    src={serviceImage}
                    alt={service.title}
                    loading="lazy"
                    className="block h-auto max-h-72 w-full rounded-lg object-contain"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-sm text-slate-400">
                    SERVICE {service.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 border-t border-slate-100 pt-6">
                  <h4 className="font-semibold">What we can help with</h4>
                  <ul className="mt-4 space-y-3">
                    {service.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                      >
                        <CheckCircle2 className="mt-1 size-4 shrink-0 text-blue-600" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center font-semibold text-blue-700 no-underline hover:text-blue-900"
                >
                  Discuss this service <ArrowRight className="ml-2 size-4" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* Delivery approach */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Our delivery approach
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From implementation to ongoing IT support.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              A structured approach to understanding your environment,
              delivering the agreed technical scope and helping your team
              operate it confidently.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliverySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-950 p-7 text-white md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h3 className="text-xl font-semibold">
                Have a specific endpoint management requirement?
              </h3>
              <p className="mt-2 max-w-2xl leading-7 text-slate-300">
                Tell us about your devices, current environment and project
                goals so we can discuss the appropriate scope of work.
              </p>
            </div>
            <a
              href="#contact"
              className="mt-5 inline-flex w-fit shrink-0 items-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white no-underline hover:bg-blue-500 md:mt-0"
            >
              Discuss Your Project <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                OrhanTech Academy
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Learn enterprise IT through practical training.
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                Build hands-on skills in Apple and Microsoft endpoint
                management through guided labs and real-world scenarios.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex w-fit items-center rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white no-underline hover:bg-blue-700"
            >
              Ask About Courses <ArrowRight className="ml-2 size-4" />
            </a>
          </div>

          {/* Training images: display full images without cropping */}
          <div className="mb-8 mt-10 grid items-start gap-5 sm:grid-cols-2">
            <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2">
              <img
                src="/happy-student-1.webp"
                alt="Practical IT training"
                className="block h-auto max-h-80 w-full rounded-xl object-contain"
                loading="lazy"
              />
            </div>
            <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2">
              <img
                src="/happy-student-2.webp"
                alt="Student learning"
                className="block h-auto max-h-80 w-full rounded-xl object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {courses.map((course, index) => (
              <article
                key={course.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-300 hover:shadow-lg"
              >
                <span className="text-sm font-semibold text-blue-600">
                  COURSE 0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{course.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{course.detail}</p>
                <p className="mt-5 border-t border-slate-100 pt-4 text-sm font-medium text-slate-500">
                  {course.level}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Looking for training for your team?
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              Contact us to discuss learning goals, practical exercises and
              available training options.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center font-semibold text-blue-700 no-underline hover:text-blue-900"
            >
              Enquire about training <ArrowRight className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:items-center lg:px-8"
      >
        <div className="rounded-3xl bg-slate-950 p-8 text-white sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
            Our approach
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-tight">
            Practical knowledge. Clear guidance. Real-world skills.
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            We focus on the skills IT teams need to deploy, manage, secure and
            troubleshoot enterprise devices.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            About OrhanTech
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Helping teams and professionals manage technology with confidence.
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            OrhanTech provides a focused approach to endpoint management
            guidance, IT consulting and technical education across Apple and
            Microsoft environments.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              "Hands-on, scenario-based learning",
              "Device management and deployment workflows",
              "Security and compliance fundamentals",
              "Practical guidance for IT teams and learners",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-600" />
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blue-700 px-5 py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              Let's connect
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Ready to discuss your IT needs or training goals?
            </h2>
            <p className="mt-4 leading-7 text-blue-100">
              Contact OrhanTech to discuss Jamf Pro, Apple device management,
              Microsoft Intune, macOS support or training opportunities.
            </p>
          </div>

          <a
            href="mailto:mazhar.husain@orhantech.in?subject=OrhanTech%20Enquiry"
            className="inline-flex w-fit shrink-0 items-center rounded-lg bg-white px-6 py-4 font-semibold text-blue-700 no-underline hover:bg-blue-50"
          >
            <Mail className="mr-2 size-5" /> Email Us
          </a>
        </div>

        {/* Existing enquiry form preserved */}
        <div className="mx-auto mt-10 max-w-3xl">
          <ContactEnquiry />
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-5 text-sm text-blue-100">
          For project enquiries, please include your requirements, device
          platform and preferred timeline.
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-8 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center">
          <p className="font-semibold text-white">OrhanTech.in</p>
          <p>Apple & Enterprise IT Solutions and Training</p>
          <a
            className="no-underline hover:text-white"
            href="mailto:mazhar.husain@orhantech.in"
          >
            mazhar.husain@orhantech.in
          </a>
          <p>© {new Date().getFullYear()} OrhanTech. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
