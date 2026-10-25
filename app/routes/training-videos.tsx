import { useState } from "react";
import { Link } from "react-router";

type VideoPart = {
  title: string;
  url: string;
};

type TrainingDay = {
  day: number;
  title: string;
  description: string;
  videos: VideoPart[];
};

type CourseType = "jamf" | "mac" | "intune";

const jamfVideos: TrainingDay[] = Array.from(
  { length: 16 },
  (_, index) => {
    const day = index + 1;

    const knownLinks: Record<number, VideoPart[]> = {
      1: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1u86-qQyaF8Jn8ewI0pNgfgDGGlSnd0bf/view?usp=drive_link",
        },
      ],
      2: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1yaN1rc8kSr88Cijds67UWwXV8bBDmeoO/view?usp=drive_link",
        },
      ],
      3: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1qjZiR4A_4spSojyV2TDVC_2Dx_1FDr3n/view?usp=drive_link",
        },
        {
          title: "Part 2",
          url: "PASTE_JAMF_DAY_3_PART_2_LINK_HERE",
        },
      ],
      4: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1yNsG32XRFa_ax_DpWHyiCXwYyp6e6aij/view?usp=drive_link",
        },
        {
          title: "Part 2",
          url: "PASTE_JAMF_DAY_4_PART_2_LINK_HERE",
        },
        {
          title: "Part 3",
          url: "PASTE_JAMF_DAY_4_PART_3_LINK_HERE",
        },
      ],
      5: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1tD8d56Dl2lHxtm2Q2h4lMjzoKRy3ZOjP/view?usp=drive_link",
        },
        {
          title: "Part 2",
          url: "PASTE_JAMF_DAY_5_PART_2_LINK_HERE",
        },
      ],
      6: [
        {
          title: "Part 1",
          url: "https://drive.google.com/file/d/1BWsYH6DbhXNqccouTfwHi67AV54u6paw/view?usp=drive_link",
        },
      ],
    };

    return {
      day,
      title: `Jamf Pro Administration Day ${day}`,
      description: `Jamf Pro Administration Day ${day}`,
      videos: knownLinks[day] ?? [
        {
          title: "Part 1",
          url: `PASTE_JAMF_DAY_${day}_LINK_HERE`,
        },
      ],
    };
  }
);

const macSupportVideos: TrainingDay[] = Array.from(
  { length: 12 },
  (_, index) => {
    const day = index + 1;

    return {
      day,
      title: `macOS Support Engineering Day ${day}`,
      description: `macOS Support Engineering Day ${day}`,
      videos: [
        {
          title: "Part 1",
          url: `PASTE_MAC_DAY_${day}_PART_1_LINK_HERE`,
        },
        {
          title: "Part 2",
          url: `PASTE_MAC_DAY_${day}_PART_2_LINK_HERE`,
        },
      ],
    };
  }
);

const intuneVideos: TrainingDay[] = Array.from(
  { length: 16 },
  (_, index) => {
    const day = index + 1;

    return {
      day,
      title: `Microsoft Intune & Entra ID Day ${day}`,
      description: `Microsoft Intune & Entra ID Day ${day}`,
      videos: [
        {
          title: "Part 1",
          url: `PASTE_INTUNE_DAY_${day}_PART_1_LINK_HERE`,
        },
        {
          title: "Part 2",
          url: `PASTE_INTUNE_DAY_${day}_PART_2_LINK_HERE`,
        },
      ],
    };
  }
);

export default function TrainingVideos() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState<CourseType>("jamf");

  const courseDetails = {
    jamf: {
      name: "Jamf Pro Administration",
      subtitle: "16 Training Days",
      videos: jamfVideos,
    },
    mac: {
      name: "macOS Support Engineering",
      subtitle: "12 Training Days",
      videos: macSupportVideos,
    },
    intune: {
      name: "Microsoft Intune & Entra ID",
      subtitle: "16 Training Days",
      videos: intuneVideos,
    },
  };

  const currentCourse = courseDetails[selectedCourse];

  const filteredVideos = currentCourse.videos.filter((video) =>
    video.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/student-dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to Student Dashboard
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 p-6 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              OrhanTech.in Academy
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Training Video Library
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Access your training videos and learn at your own pace.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-cyan-300">16 Days</p>
                <p className="mt-1 text-sm text-slate-300">
                  Jamf Pro Administration
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-cyan-300">12 Days</p>
                <p className="mt-1 text-sm text-slate-300">
                  macOS Support Engineering
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-cyan-300">16 Days</p>
                <p className="mt-1 text-sm text-slate-300">
                  Microsoft Intune & Entra ID
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">
            Select Your Training
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCourse("jamf");
                setSearch("");
              }}
              aria-pressed={selectedCourse === "jamf"}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedCourse === "jamf"
                  ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40"
                  : "border-white/10 bg-slate-900 hover:border-cyan-400/50"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                🍎
              </span>
              <h3 className="mt-3 text-lg font-bold">
                Jamf Pro Administration
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Access all 16 training days.
              </p>
              <p className="mt-4 text-xs font-semibold text-cyan-300">
                16 TRAINING DAYS
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCourse("mac");
                setSearch("");
              }}
              aria-pressed={selectedCourse === "mac"}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedCourse === "mac"
                  ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40"
                  : "border-white/10 bg-slate-900 hover:border-cyan-400/50"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                💻
              </span>
              <h3 className="mt-3 text-lg font-bold">
                macOS Support Engineering
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Access all 12 training days.
              </p>
              <p className="mt-4 text-xs font-semibold text-cyan-300">
                12 DAYS • 2 PARTS PER DAY
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCourse("intune");
                setSearch("");
              }}
              aria-pressed={selectedCourse === "intune"}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedCourse === "intune"
                  ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40"
                  : "border-white/10 bg-slate-900 hover:border-cyan-400/50"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                ☁️
              </span>
              <h3 className="mt-3 text-lg font-bold">
                Microsoft Intune & Entra ID
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Access all 16 training days.
              </p>
              <p className="mt-4 text-xs font-semibold text-cyan-300">
                16 DAYS • 2 PARTS PER DAY
              </p>
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-cyan-300">
                CURRENT TRAINING
              </p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {currentCourse.name}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {currentCourse.subtitle}
              </p>
            </div>

            <div className="w-full sm:max-w-sm">
              <label
                htmlFor="video-search"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Search by day
              </label>
              <input
                id="video-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Day 1, Day 2..."
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredVideos.map((video) => (
              <article
                key={`${selectedCourse}-${video.day}`}
                className="flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg transition hover:border-cyan-400/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-lg bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                    DAY {video.day}
                  </span>

                  <span className="text-xs text-slate-500">
                    {video.videos.length}{" "}
                    {video.videos.length === 1 ? "video" : "parts"}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold leading-7">
                  {video.title}
                </h3>

                <div className="mt-5 space-y-3">
                  {video.videos.map((part) => {
                    const isPlaceholder = part.url.startsWith("PASTE_");

                    return (
                      <a
                        key={`${video.day}-${part.title}`}
                        href={isPlaceholder ? undefined : part.url}
                        target={isPlaceholder ? undefined : "_blank"}
                        rel={isPlaceholder ? undefined : "noreferrer"}
                        aria-disabled={isPlaceholder}
                        onClick={(event) => {
                          if (isPlaceholder) {
                            event.preventDefault();
                          }
                        }}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                          isPlaceholder
                            ? "cursor-not-allowed border-white/5 bg-slate-800/60 text-slate-500"
                            : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-400/20"
                        }`}
                      >
                        <span>
                          {isPlaceholder
                            ? `${part.title} • Link pending`
                            : `Watch ${part.title}`}
                        </span>
                        <span aria-hidden="true">
                          {isPlaceholder ? "🔒" : "↗"}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
              <p className="text-lg font-semibold">
                No training days found
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Try another day number.
              </p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-amber-200">
            Video Access Information
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
            <li>
              Make sure Google Drive sharing permissions allow students to
              view the videos.
            </li>
          </ul>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-sm font-semibold text-slate-300">
            OrhanTech.in Academy
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Learn • Practice • Build Your Career
          </p>
        </footer>
      </div>
    </main>
  );
}