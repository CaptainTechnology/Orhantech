import { Link } from "react-router";

const certifications = [
  "Apple Certified Engineer",
  "Jamf 100",
  "Jamf 170",
  "Jamf 140",
  "Jamf 200",
  "Jamf Engineer",
  "Jamf Security — Basic & Advanced",
];

const expertise = [
  {
    number: "01",
    title: "Apple Device Management",
    description:
      "Jamf Pro administration, device enrollment, application deployment, configuration profiles, compliance, and troubleshooting.",
  },
  {
    number: "02",
    title: "Identity & Access",
    description:
      "Microsoft Entra ID, JumpCloud, authentication, identity integrations, and access management.",
  },
  {
    number: "03",
    title: "Microsoft Intune",
    description:
      "Endpoint configuration, application deployment, compliance policies, and device administration.",
  },
  {
    number: "04",
    title: "Endpoint Security",
    description:
      "BeyondTrust, privilege management, security controls, and enterprise endpoint protection.",
  },
  {
    number: "05",
    title: "macOS Support",
    description:
      "macOS diagnostics, recovery, user permissions, system troubleshooting, and technical support.",
  },
  {
    number: "06",
    title: "Technical Training",
    description:
      "Practical labs, guided demonstrations, real-world troubleshooting, and career-focused learning.",
  },
];

const companies = [
  {
    name: "Wipro",
    initials: "W",
    description: "Enterprise technology and IT services experience.",
  },
  {
    name: "HCLTech",
    initials: "HCL",
    description: "Technology services and enterprise IT experience.",
  },
  {
    name: "IBM",
    initials: "IBM",
    description: "Experience in a global technology environment.",
  },
  {
    name: "Team Computers",
    initials: "TC",
    description: "IT services and technology solutions experience.",
  },
];

export default function AboutMazhar() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-300/20 bg-blue-400/[0.08] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                Instructor & Technology Professional
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Mazhar
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Husain
              </span>
            </h1>

            <h2 className="mt-7 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl">
              Apple Certified Engineer
              <span className="mx-2 text-slate-600">|</span>
              Jamf Pro & Endpoint Management
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              An IT professional and technical trainer focused on Apple device
              management, endpoint security, identity platforms, and macOS
              support. Bringing enterprise technology experience into practical,
              structured learning for aspiring IT professionals.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/courses/jamf-pro"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400"
              >
                Explore Training
                <span className="ml-2" aria-hidden="true">↗</span>
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-200 transition hover:border-blue-300/40 hover:bg-white/[0.07]"
              >
                Register Now
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="border-l-2 border-cyan-400 pl-4">
                <p className="text-3xl font-bold">12+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Years of Experience
                </p>
              </div>

              <div className="border-l-2 border-blue-400 pl-4">
                <p className="text-3xl font-bold">700+</p>
                <p className="mt-1 text-sm text-slate-400">
                  Students Trained
                </p>
              </div>

              <div className="col-span-2 border-l-2 border-indigo-400 pl-4 sm:col-span-1">
                <p className="text-3xl font-bold">4</p>
                <p className="mt-1 text-sm text-slate-400">
                  Organizations
                </p>
              </div>
            </div>
          </div>

          {/* Professional portrait */}
          <div className="mx-auto w-full max-w-[440px]">
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-3 shadow-2xl shadow-black/30">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#101f32]">
                <img
                  src="/mazhar-husain.webp"
                  alt="Mazhar Husain, Apple Certified Engineer and technical trainer"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    const fallback =
                      event.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />

                <div className="absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-[#152e49] to-[#07111f] p-8 text-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-4xl font-bold text-cyan-200">
                    MH
                  </div>
                  <p className="mt-6 text-xl font-semibold">Mazhar Husain</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Professional portrait
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07111f]/90 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-lg font-semibold">
                    Apple & Endpoint Management
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Enterprise IT · Technical Training
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs tracking-wide text-slate-500">
              ORHANTECH · PROFESSIONAL TRAINING
            </p>
          </div>
        </div>
      </section>

      {/* Professional summary */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Professional Profile
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Experience. Expertise.
              <span className="block text-slate-400">Practical Learning.</span>
            </h2>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-300">
              <p>
                Mazhar Husain is an IT professional and technical trainer with
                12+ years of experience across enterprise IT and endpoint
                management technologies. His core technical focus includes
                Apple device management, Jamf Pro, identity and access
                management, endpoint security, and macOS support.
              </p>

              <p>
                His technology experience spans Jamf Pro, JumpCloud, Microsoft
                Entra ID, Microsoft Intune, and BeyondTrust. These areas bring
                together device administration, deployment workflows,
                identity integrations, security practices, and technical
                troubleshooting.
              </p>

              <p>
                As a trainer, Mazhar emphasizes clear explanations, guided
                demonstrations, practical exercises, and structured lab
                learning. His objective is to help learners understand not
                just how a tool works, but also how its capabilities apply to
                everyday enterprise IT responsibilities.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.035] p-7 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Professional Snapshot
            </p>

            <div className="mt-7 divide-y divide-white/10">
              <div className="py-5 first:pt-0">
                <p className="text-sm text-slate-500">Primary focus</p>
                <p className="mt-2 font-semibold">
                  Apple & Endpoint Management
                </p>
              </div>

              <div className="py-5">
                <p className="text-sm text-slate-500">Platforms</p>
                <p className="mt-2 font-semibold">
                  Jamf Pro, JumpCloud, Entra ID, Intune
                </p>
              </div>

              <div className="py-5">
                <p className="text-sm text-slate-500">Security</p>
                <p className="mt-2 font-semibold">
                  BeyondTrust & Endpoint Security
                </p>
              </div>

              <div className="pt-5">
                <p className="text-sm text-slate-500">Training style</p>
                <p className="mt-2 font-semibold">
                  Hands-on, practical, structured
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Career experience */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Career Journey
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Professional Experience
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-400">
            Professional experience across technology and IT services
            organizations, contributing to a foundation in enterprise IT,
            endpoint management, and technical support.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => (
              <article
                key={company.name}
                className="group rounded-2xl border border-white/10 bg-[#0a1727] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-300/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-sm font-bold tracking-wide text-blue-200">
                  {company.initials}
                </div>

                <h3 className="mt-6 text-xl font-bold">{company.name}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {company.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
          Technical Capabilities
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Areas of Expertise
        </h2>

        <p className="mt-5 max-w-3xl leading-8 text-slate-400">
          A practical focus on endpoint administration, identity technologies,
          security concepts, and the support skills needed in enterprise IT.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.045]"
            >
              <p className="text-sm font-bold tracking-widest text-cyan-300">
                {item.number}
              </p>

              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Professional Development
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Certifications & Credentials
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              Apple and Jamf-focused professional development across device
              management, administration, engineering, and security.
            </p>
          </div>

          <div className="grid content-start gap-3 sm:grid-cols-2">
            {certifications.map((certification) => (
              <div
                key={certification}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0a1727] p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs text-cyan-300">
                  ✓
                </span>
                <span className="text-sm leading-6 text-slate-200">
                  {certification}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video introduction */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:py-24">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Meet Your Instructor
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            A Personal Introduction
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            A short introduction to the instructor and the practical learning
            approach behind OrhanTech training.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30">
          <video
            className="aspect-video w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster="/mazhar-husain.webp"
          >
            <source src="/mazhar-intro.mp4" type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
      </section>

      {/* Learning philosophy */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:pb-24">
        <div className="rounded-3xl border border-blue-300/20 bg-gradient-to-br from-[#102b47] via-[#0b1c30] to-[#091321] p-8 sm:p-12 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Learning Philosophy
          </p>

          <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            Learn the concepts.
            <span className="block text-blue-200">
              Practise the skills. Build confidence.
            </span>
          </h2>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            Strong technical foundations come from more than theory. Guided
            practice, configuration exercises, and troubleshooting scenarios
            help learners connect technical concepts with real workplace
            situations.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/courses/macos-support"
              className="rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400"
            >
              Explore macOS Support
            </Link>

            <Link
              to="/courses/intune-entra"
              className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/[0.06]"
            >
              Explore Intune & Entra
            </Link>
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="border-t border-white/10 bg-[#050c15]">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
            Start Learning
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build Your Next IT Skill
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Explore OrhanTech training programs designed to help you develop
            practical knowledge in endpoint management and macOS support.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/courses/jamf-pro"
              className="rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400"
            >
              Explore Courses
            </Link>

            <Link
              to="/signup"
              className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-white/[0.06]"
            >
              Register for Training
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}