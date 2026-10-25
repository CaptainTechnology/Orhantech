import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export default function StudentSettings() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        navigate("/login", { replace: true });
        return;
      }

      setEmail(data.user.email ?? "");
      setCheckingSession(false);
    }

    void checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleChangePassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: userError } = await supabase.auth.getUser();

      if (userError || !data.user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      setPassword("");
      setConfirmPassword("");
      setMessage("Your password has been changed successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-slate-600">Checking your account...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          OrhanTech.in Academy
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Account settings
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your account security and password.
        </p>

        <section className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Signed-in account
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Password changes apply to this account:
          </p>

          <p className="mt-1 break-all font-medium text-slate-900">
            {email}
          </p>
        </section>

        <section className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Change password
          </h2>

          <form onSubmit={handleChangePassword} className="mt-5 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                New password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Enter password again"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="break-words rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        </section>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm">
          <Link
            to="/student-dashboard"
            className="font-semibold text-blue-700 hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}