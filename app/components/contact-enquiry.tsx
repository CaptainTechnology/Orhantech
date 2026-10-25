
import { useState } from "react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const BUSINESS_EMAIL = "mazhar.husain@orhantech.in";

// IMPORTANT: Replace this with your WhatsApp number.
// Include country code, digits only. Example format: +918433602364
const WHATSAPP_NUMBER = "+918433602364";

const services = [
  "Jamf Pro Implementation & Support",
  "Apple Business Manager & ADE",
  "Microsoft Intune & Entra ID",
  "macOS Support & Automation",
  "Corporate IT Training",
  "Other IT Requirement",
];

export default function ContactEnquiry() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services[0]);
  const [devices, setDevices] = useState("");
  const [details, setDetails] = useState("");
  const [prepared, setPrepared] = useState(false);

  const message = [
    "Hello OrhanTech,",
    "",
    "I would like to discuss an IT service enquiry.",
    "",
    `Name: ${name}`,
    `Company: ${company || "Not provided"}`,
    `Work email: ${email}`,
    `Required service: ${service}`,
    `Approximate device count: ${devices || "Not provided"}`,
    `Project details: ${details || "I would like to discuss my requirements."}`,
    "",
    "Please contact me to discuss the next steps.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const emailUrl = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
    `OrhanTech Enquiry - ${service}`,
  )}&body=${encodeURIComponent(message)}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
  }

  return (
    <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7">
        <div className="mb-4 grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-700">
          <Send className="size-6" />
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Tell us about your IT requirements
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          Share your project details. Prepare an enquiry for WhatsApp,
          email, or both.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="enquiry-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Your name *
            </label>
            <input
              id="enquiry-name"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setPrepared(false);
              }}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="enquiry-company"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Company name
            </label>
            <input
              id="enquiry-company"
              name="company"
              autoComplete="organization"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
                setPrepared(false);
              }}
              placeholder="Your company"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="enquiry-email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Work email *
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setPrepared(false);
            }}
            placeholder="you@company.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="enquiry-service"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            What service do you need? *
          </label>
          <select
            id="enquiry-service"
            name="service"
            required
            value={service}
            onChange={(event) => {
              setService(event.target.value);
              setPrepared(false);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {services.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="enquiry-devices"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Approximate number of devices
          </label>
          <select
            id="enquiry-devices"
            name="devices"
            value={devices}
            onChange={(event) => {
              setDevices(event.target.value);
              setPrepared(false);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select device count (optional)</option>
            <option value="1–25">1–25 devices</option>
            <option value="26–100">26–100 devices</option>
            <option value="101–500">101–500 devices</option>
            <option value="500+">500+ devices</option>
            <option value="Training only">Training only</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="enquiry-details"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Project details
          </label>
          <textarea
            id="enquiry-details"
            name="details"
            rows={4}
            value={details}
            onChange={(event) => {
              setDetails(event.target.value);
              setPrepared(false);
            }}
            placeholder="Tell us about your current environment, requirements or training goals..."
            className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          Prepare My Enquiry <Send className="ml-2 size-4" />
        </button>

        {prepared && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-blue-700" />
              <div>
                <h4 className="font-semibold text-slate-900">
                  Your enquiry is ready
                </h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Choose either channel below. Your details will be added to
                  the draft. Open both separately if you want to contact us
                  through WhatsApp and email.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#15803d] px-4 py-3 font-semibold text-white no-underline hover:bg-green-800"
              >
                <MessageCircle className="mr-2 size-5" />
                Continue on WhatsApp
              </a>

              <a
                href={emailUrl}
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-800 no-underline hover:bg-slate-100"
              >
                <Mail className="mr-2 size-5" />
                Prepare Email
              </a>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Your enquiry is not sent automatically. Review the draft and
              press Send in WhatsApp or your email app.
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
