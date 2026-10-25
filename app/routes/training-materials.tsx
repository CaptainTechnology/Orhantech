import { useState } from "react";
import { Link } from "react-router";

type Material = {
  title: string;
  type: "PPTX" | "PDF";
  url: string;
};

type Course = {
  id: string;
  name: string;
  description: string;
  materials: Material[];
};

const courses: Course[] = [
  {
    id: "jamf",
    name: "Jamf Pro Administration",
    description:
      "Jamf Pro deployment guides, presentations, and practical documentation.",
    materials: [
      {
        title:
          "Setup VPP with Jamf Pro — Purchase Apps in ABM and Deploy via Jamf Pro",
        type: "PPTX",
        url: "https://docs.google.com/presentation/d/1lG2UE2PZd-VLTIGGjAJAZO3weN9lMcQQ/edit?usp=drive_link&ouid=107931186589372194324&rtpof=true&sd=true",
      },
      {
        title: "macOS Onboarding",
        type: "PDF",
        url: "https://drive.google.com/file/d/1zF7zdSiJ8HK3Dr2OlN8LS3gXnRUgc0Fy/view?usp=drive_link",
      },
    ],
  },
  {
    id: "intune",
    name: "Microsoft Entra ID & Intune",
    description:
      "Entra ID, Intune configuration, device management, and integration materials.",
    materials: [
      {
        title: "App Protection Policy (MAM) – iOS BYOD",
        type: "PDF",
        url: "https://drive.google.com/file/d/1QCi0gSAiiCeLF3zZsFlYKg6AqYm5PAY3/view?usp=sharing",
      },
        {
        title: "Windows Autopilot user-driven Microsoft Entra join",
        type: "PDF",
        url: "https://drive.google.com/file/d/1ufJtLAyUIqTUL4n-0t2K0hWNuIoHJPjT/view?usp=sharing",
      },
    ],
  },
  {
    id: "macos",
    name: "macOS Support Engineering",
    description:
      "macOS troubleshooting, user support, administration, and practical guides.",
    materials: [],
  },
];

export default function TrainingMaterials() {
  const [activeCourse, setActiveCourse] = useState("jamf");

  const selectedCourse =
    courses.find((course) => course.id === activeCourse) ?? courses[0];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/student-dashboard"
          className="text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Student Dashboard
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            OrhanTech.in Academy
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Training PPTs & PDFs
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Access course presentations, study materials, and practical
            documentation in one place.
          </p>
        </div>

        {/* Course selector */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {courses.map((course, index) => (
            <button
              key={course.id}
              type="button"
              onClick={() => setActiveCourse(course.id)}
              aria-pressed={activeCourse === course.id}
              className={`rounded-2xl border p-5 text-left transition ${
                activeCourse === course.id
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Course {String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="mt-3 text-lg font-bold">{course.name}</h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {course.description}
              </p>

              <p className="mt-4 text-xs text-slate-500">
                {course.materials.length} materials
              </p>
            </button>
          ))}
        </div>

        {/* Selected course materials */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {selectedCourse.materials.length} materials available
            </span>
          </div>

          {selectedCourse.materials.length > 0 ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {selectedCourse.materials.map((material) => (
                <article
                  key={material.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xs font-bold text-cyan-300">
                      {material.type}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold leading-6">
                        {material.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        {material.type === "PDF"
                          ? "PDF document"
                          : "PowerPoint presentation"}
                      </p>

                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                      >
                        Open {material.type} ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-white/15 p-8 text-center">
              <h3 className="font-semibold">Study materials coming soon</h3>

              <p className="mt-2 text-sm text-slate-400">
                New presentations and PDF documents will appear here when
                published.
              </p>
            </div>
          )}
        </section>

        <p className="mt-10 text-center text-sm text-slate-500">
          OrhanTech.in Academy · Learn, Practice, and Grow
        </p>
      </div>
    </main>
  );
}