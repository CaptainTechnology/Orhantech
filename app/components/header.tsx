import { Link } from "react-router";
import { navLinksArr } from "~/lib/shared";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0B1F3A] text-white shadow-md">
      <div className="mx-auto flex min-h-14 max-w-[1440px] items-center justify-between gap-4 px-4 py-2 sm:px-6 md:min-h-16 md:px-8 lg:px-10">
        {/* Brand */}
        <Logo theme="dark" />

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              size="icon"
              variant="outline"
              aria-label="Open navigation menu"
              className="size-9 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col border-slate-200 bg-white text-slate-900">
            <SheetHeader className="border-b border-slate-100 pb-4">
              <SheetTitle>
                <Logo theme="dark" />
              </SheetTitle>
            </SheetHeader>

            <nav className="flex-1 overflow-y-auto px-4 py-5">
              <Accordion type="single" collapsible className="w-full">
                {navLinksArr.map((navLink) => {
                  if (!navLink.menu) {
                    return (
                      <SheetClose asChild key={navLink.title}>
                        {navLink.title === "Contact" ? (
                          <a
                            href="/#contact"
                            className="block border-b border-slate-100 py-4 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
                          >
                            {navLink.title}
                          </a>
                        ) : (
                          <Link
                            to={navLink.link}
                            className="block border-b border-slate-100 py-4 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
                          >
                            {navLink.title}
                          </Link>
                        )}
                      </SheetClose>
                    );
                  }

                  return (
                    <AccordionItem
                      value={navLink.title}
                      key={navLink.title}
                      className="border-b border-slate-100"
                    >
                      <AccordionTrigger className="py-4 text-sm font-semibold text-slate-700 hover:text-blue-700 hover:no-underline">
                        {navLink.title}
                      </AccordionTrigger>

                      <AccordionContent>
                        <ul className="space-y-1 pb-2">
                          {navLink.menu.map((menuItem) => (
                            <li key={menuItem.title}>
                              <SheetClose asChild>
                                <Link
                                  to={menuItem.link}
                                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-800"
                                >
                                  {menuItem.title}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Mobile Authentication Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 rounded-lg border-slate-300 bg-white font-semibold text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                >
                  <a
                    href="/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign In
                  </a>
                </Button>

                <Button
                  asChild
                  className="h-10 rounded-lg bg-blue-700 font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  <a
                    href="/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign Up
                  </a>
                </Button>
              </div>
            </nav>

            <SheetFooter className="border-t border-slate-100 pt-4">
              <div className="mx-auto">
                <SocialIcons />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {navLinksArr.map((navLink) => {
              if (!navLink.menu) {
                return (
                  <NavigationMenuItem key={navLink.title}>
                    {navLink.title === "Contact" ? (
                      <a
                        href="/#contact"
                        className={navigationMenuTriggerStyle({
                          className:
                            "bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                        })}
                      >
                        {navLink.title}
                      </a>
                    ) : (
                      <Link
                        to={navLink.link}
                        className={navigationMenuTriggerStyle({
                          className:
                            "bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
                        })}
                      >
                        {navLink.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={navLink.title}>
                  <NavigationMenuTrigger className="bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                    {navLink.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="min-w-[280px] rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl">
                    <ul className="flex flex-col gap-1">
                      {navLink.menu.map((menuItem) => (
                        <li key={menuItem.title}>
                          <Link
                            to={menuItem.link}
                            className={navigationMenuTriggerStyle({
                              className:
                                "w-full! justify-start rounded-lg bg-white text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800",
                            })}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Authentication Buttons */}
        <div className="hidden shrink-0 items-center gap-2 sm:gap-3 md:flex">
          <Button
            asChild
            variant="outline"
            className="h-9 rounded-lg border-white/30 bg-transparent px-4 text-sm font-semibold text-white shadow-none transition hover:border-white hover:bg-white hover:text-[#0B1F3A] lg:px-5"
          >
            <a
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign In
            </a>
          </Button>

          <Button
            asChild
            className="h-9 rounded-lg border border-blue-500 bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:border-blue-400 hover:bg-blue-500 lg:px-5"
          >
            <a
              href="/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              Sign Up
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Logo({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  return (
    <Link
      to="/"
      aria-label="Orhantech.in home"
      className={`shrink-0 text-xl font-bold tracking-tight no-underline transition sm:text-2xl ${
        theme === "dark"
          ? "text-white hover:text-blue-200"
          : "text-slate-900 hover:text-blue-700"
      }`}
    >
      Orhan<span className="font-extrabold">Tech</span>
      <span className="text-blue-400">.in</span>
    </Link>
  );
}

export function SocialIcons() {
  const socialLinks = [
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/sidd-mazhar-3a702116b/?isSelfProfile=true",
     
icon: (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
),

    },
    {
      name: "Join Arattai Group",
      link: "https://chat.arattai.in/groups/h43545f313436343833383238373132353734313638355f32303031363232323238392d47437c3031303032313133343230393137393031383037343639383430",
     
icon: (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    aria-hidden="true"
  >
    <path d="M12 3a9 9 0 0 0-7.6 13.8L3 21l4.4-1.4A9 9 0 1 0 12 3Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
),
    },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${social.name}`}
          className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}