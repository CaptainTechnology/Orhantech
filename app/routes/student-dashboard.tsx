import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const learningResources = [
  {
    title: "Training Videos",
    description: "Watch topic-wise training sessions and demonstrations.",
    icon: "▶",
    to: "/training-videos",
  },
  {
    title: "Training PPTs & PDFs",
    description: "Access training presentations, notes, and study materials.",
    icon: "📄",
    to: "/training-materials",
  },
  {
    title: "Scenario-Based Questions",
    description: "Practice real-world technical scenarios and troubleshooting.",
    icon: "❓",
    to: "/scenario-questions",
  },
  {
    title: "Lab Practicals",
    description: "Practice hands-on exercises and technical configurations.",
    icon: "🧪",
    to: "/lab-practicals",
  },
  {
    title: "Interview Preparation",
    description: "Prepare with technical questions and interview practice.",
    icon: "🎯",
    to: "/interview-preparation",
  },
  {
    title: "My Courses",
    description: "Continue learning with your available training courses.",
    icon: "📚",
    to: "/courses/jamf-pro",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (!active) return;

        if (error || !data.user) {
          setUser(null);
          navigate("/login", { replace: true });
          return;
        }

        setUser(data.user);
      } catch {
        if (!active) return;

        setError("Unable to verify your session. Please sign in again.");
        navigate("/login", { replace: true });
      } finally {
        if (active) setLoading(false);
      }
    }

    void checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
        navigate("/login", { replace: true });
      } else {
        setUser(session.user);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleLogout() {
    if (loggingOut) return;

    setError("");
    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      navigate("/login", { replace: true });
    } catch {
      setError("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-sm font-medium text-slate-600">
          {error || "Verifying your session..."}
        </p>
      </main>
    );
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    "Student";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              OrhanTech.in Academy
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Student Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Welcome, {displayName}
            </p>

            <p className="mt-1 break-all text-sm text-slate-500">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </header>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">
            Your Learning Resources
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Access your training videos, study materials, practical labs,
            and interview preparation.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {learningResources.map((resource) => (
              <article
                key={resource.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                  {resource.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {resource.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {resource.description}
                </p>

                <Link
                  to={resource.to}
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
                >
                  Open Resource
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Account Settings
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Manage your account and change your password.
            </p>

            <Link
              to="/student-dashboard/settings"
              className="mt-4 inline-block font-semibold text-blue-700 hover:underline"
            >
              Manage settings →
            </Link>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Explore More Courses
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Build your skills in endpoint management and macOS support.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Link
                to="/courses/jamf-pro"
                className="font-semibold text-blue-700 hover:underline"
              >
                Jamf Pro
              </Link>

              <Link
                to="/courses/intune-entra"
                className="font-semibold text-blue-700 hover:underline"
              >
                Intune & Entra ID
              </Link>

              <Link
                to="/courses/macos-support"
                className="font-semibold text-blue-700 hover:underline"
              >
                macOS Support
              </Link>
            </div>
          </article>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
          Signed in securely to OrhanTech.in Academy.
        </footer>
      </div>
    </main>
  );
}