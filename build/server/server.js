import { createRequestHandler } from "@netlify/vite-plugin-react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon, XIcon, MenuIcon, ArrowUpRight, Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, ArrowRight, Monitor, ShieldCheck, Laptop, Cloud, Code2, ClipboardCheck, Settings, Wrench, GraduationCap, BookOpen } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { createClient } from "@supabase/supabase-js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const navLinksArr = [
  {
    title: "Courses",
    link: "#courses",
    menu: [
      {
        title: "Jamf Pro Administration & Engineering",
        link: "/courses/jamf-pro"
      },
      {
        title: "Microsoft Intune & Entra ID",
        link: "/courses/intune-entra"
      },
      {
        title: "macOS Support Engineering",
        link: "/courses/macos-support"
      }
    ]
  },
  {
    title: "Meet Your Mentors",
    link: "#teachers",
    menu: [
      {
        title: "Mazhar Husain",
        link: "/about-mazhar"
      }
    ]
  },
  {
    title: "Registration Fee",
    link: "/registration-fees",
    menu: [
      {
        title: "Fee Details",
        link: "/registration-fees"
      }
    ]
  },
  {
    title: "Contact",
    link: "/#contact"
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(
        buttonVariants({
          variant,
          size,
          className: className + " cursor-pointer"
        })
      ),
      ...props
    }
  );
}
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0B1F3A] text-white shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-14 max-w-[1440px] items-center justify-between gap-4 px-4 py-2 sm:px-6 md:min-h-16 md:px-8 lg:px-10", children: [
    /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
    /* @__PURE__ */ jsxs(Sheet, { children: [
      /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, className: "md:hidden", children: /* @__PURE__ */ jsx(
        Button,
        {
          size: "icon",
          variant: "outline",
          "aria-label": "Open navigation menu",
          className: "size-9 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white",
          children: /* @__PURE__ */ jsx(MenuIcon, { className: "size-5" })
        }
      ) }),
      /* @__PURE__ */ jsxs(SheetContent, { className: "flex flex-col border-slate-200 bg-white text-slate-900", children: [
        /* @__PURE__ */ jsx(SheetHeader, { className: "border-b border-slate-100 pb-4", children: /* @__PURE__ */ jsx(SheetTitle, { children: /* @__PURE__ */ jsx(Logo, { theme: "dark" }) }) }),
        /* @__PURE__ */ jsxs("nav", { className: "flex-1 overflow-y-auto px-4 py-5", children: [
          /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: navLinksArr.map((navLink) => {
            if (!navLink.menu) {
              return /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: navLink.title === "Contact" ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/#contact",
                  className: "block border-b border-slate-100 py-4 text-sm font-semibold text-slate-700 transition hover:text-blue-700",
                  children: navLink.title
                }
              ) : /* @__PURE__ */ jsx(
                Link,
                {
                  to: navLink.link,
                  className: "block border-b border-slate-100 py-4 text-sm font-semibold text-slate-700 transition hover:text-blue-700",
                  children: navLink.title
                }
              ) }, navLink.title);
            }
            return /* @__PURE__ */ jsxs(
              AccordionItem,
              {
                value: navLink.title,
                className: "border-b border-slate-100",
                children: [
                  /* @__PURE__ */ jsx(AccordionTrigger, { className: "py-4 text-sm font-semibold text-slate-700 hover:text-blue-700 hover:no-underline", children: navLink.title }),
                  /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-1 pb-2", children: navLink.menu.map((menuItem) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: menuItem.link,
                      className: "block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-800",
                      children: menuItem.title
                    }
                  ) }) }, menuItem.title)) }) })
                ]
              },
              navLink.title
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "h-10 rounded-lg border-slate-300 bg-white font-semibold text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/login",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Sign In"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                className: "h-10 rounded-lg bg-blue-700 font-semibold text-white shadow-sm hover:bg-blue-800",
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "/signup",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Sign Up"
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(SheetFooter, { className: "border-t border-slate-100 pt-4", children: /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsx(SocialIcons, {}) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(NavigationMenu, { viewport: false, className: "hidden md:flex", children: /* @__PURE__ */ jsx(NavigationMenuList, { className: "gap-1", children: navLinksArr.map((navLink) => {
      if (!navLink.menu) {
        return /* @__PURE__ */ jsx(NavigationMenuItem, { children: navLink.title === "Contact" ? /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#contact",
            className: navigationMenuTriggerStyle({
              className: "bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
            }),
            children: navLink.title
          }
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            to: navLink.link,
            className: navigationMenuTriggerStyle({
              className: "bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
            }),
            children: navLink.title
          }
        ) }, navLink.title);
      }
      return /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
        /* @__PURE__ */ jsx(NavigationMenuTrigger, { className: "bg-transparent px-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white", children: navLink.title }),
        /* @__PURE__ */ jsx(NavigationMenuContent, { className: "min-w-[280px] rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-xl", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-1", children: navLink.menu.map((menuItem) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: menuItem.link,
            className: navigationMenuTriggerStyle({
              className: "w-full! justify-start rounded-lg bg-white text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-800"
            }),
            children: menuItem.title
          }
        ) }, menuItem.title)) }) })
      ] }, navLink.title);
    }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "hidden shrink-0 items-center gap-2 sm:gap-3 md:flex", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "outline",
          className: "h-9 rounded-lg border-white/30 bg-transparent px-4 text-sm font-semibold text-white shadow-none transition hover:border-white hover:bg-white hover:text-[#0B1F3A] lg:px-5",
          children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/login",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Sign In"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          className: "h-9 rounded-lg border border-blue-500 bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:border-blue-400 hover:bg-blue-500 lg:px-5",
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/signup",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5",
              children: [
                "Sign Up",
                /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-4" })
              ]
            }
          )
        }
      )
    ] })
  ] }) });
}
function Logo({
  theme = "light"
}) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/",
      "aria-label": "Orhantech.in home",
      className: `shrink-0 text-xl font-bold tracking-tight no-underline transition sm:text-2xl ${theme === "dark" ? "text-white hover:text-blue-200" : "text-slate-900 hover:text-blue-700"}`,
      children: [
        "Orhan",
        /* @__PURE__ */ jsx("span", { className: "font-extrabold", children: "Tech" }),
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: ".in" })
      ]
    }
  );
}
function SocialIcons() {
  const socialLinks = [
    {
      name: "Linkedin",
      link: "https://www.linkedin.com/in/sidd-mazhar-3a702116b/?isSelfProfile=true",
      icon: /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          className: "size-4",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" })
        }
      )
    },
    {
      name: "Join Arattai Group",
      link: "https://chat.arattai.in/groups/h43545f313436343833383238373132353734313638355f32303031363232323238392d47437c3031303032313133343230393137393031383037343639383430",
      icon: /* @__PURE__ */ jsxs(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          className: "size-4",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("path", { d: "M12 3a9 9 0 0 0-7.6 13.8L3 21l4.4-1.4A9 9 0 1 0 12 3Z" }),
            /* @__PURE__ */ jsx("path", { d: "M8 10h8M8 13h5" })
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-3", children: socialLinks.map((social) => /* @__PURE__ */ jsx(
    "a",
    {
      href: social.link,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `Visit ${social.name}`,
      className: "inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
      children: social.icon
    },
    social.name
  )) });
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const companyLinks = [
  { label: "About Us", to: "/about-mazhar" },
  { label: "Our Courses", to: "/courses" },
  { label: "Registration Fees", to: "/registration-fees" }
];
const learningLinks = [
  { label: "Jamf Pro Training", to: "/courses/jamf-pro" },
  { label: "Microsoft Intune & Entra ID", to: "/courses/intune-entra" },
  { label: "macOS Support", to: "/courses/macos-support" },
  { label: "Student Login", to: "/login" }
];
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "relative overflow-hidden bg-slate-950 text-slate-300", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute -top-32 left-1/3 size-80 rounded-full bg-blue-600/10 blur-3xl"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "sm:col-span-2 lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "max-w-sm", children: [
          /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-7 text-slate-400", children: "Build practical IT skills with industry-focused training in Jamf Pro, Apple device management, Microsoft Intune, Entra ID, and macOS support." }),
          /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(SocialIcons, {}) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold tracking-wide text-white", children: "Company" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: companyLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              className: "text-sm text-slate-400 transition-colors hover:text-white",
              children: item.label
            }
          ) }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold tracking-wide text-white", children: "Training Programs" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: learningLinks.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: item.to,
              className: "group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white",
              children: [
                item.label,
                /* @__PURE__ */ jsx(
                  ArrowUpRight,
                  {
                    size: 13,
                    "aria-hidden": "true",
                    className: "opacity-0 transition-opacity group-hover:opacity-100"
                  }
                )
              ]
            }
          ) }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold tracking-wide text-white", children: "Get in Touch" }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-6 text-slate-400", children: "Have questions about our training programs? Contact us for course details and enrollment information." }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-5 space-y-4", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+918433602364",
                className: "flex items-start gap-3 text-sm transition-colors hover:text-white",
                children: [
                  /* @__PURE__ */ jsx(
                    Phone,
                    {
                      size: 17,
                      "aria-hidden": "true",
                      className: "mt-0.5 shrink-0 text-blue-400"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: "+91 84336 02364" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:mazhar.husain@orhantech.in",
                className: "flex items-start gap-3 text-sm transition-colors hover:text-white",
                children: [
                  /* @__PURE__ */ jsx(
                    Mail,
                    {
                      size: 17,
                      "aria-hidden": "true",
                      className: "mt-0.5 shrink-0 text-blue-400"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "break-all", children: "mazhar.husain@orhantech.in" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-slate-400", children: [
              /* @__PURE__ */ jsx(
                MapPin,
                {
                  size: 17,
                  "aria-hidden": "true",
                  className: "mt-0.5 shrink-0 text-blue-400"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "India · Online Training" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "my-8 bg-white/10" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs leading-5 text-slate-500", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " OrhanTech.in. All rights reserved."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Practical learning. Real-world skills." })
      ] })
    ] })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Header, {}), children, /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const BUSINESS_EMAIL = "mazhar.husain@orhantech.in";
const WHATSAPP_NUMBER = "+918433602364";
const services$1 = [
  "Jamf Pro Implementation & Support",
  "Apple Business Manager & ADE",
  "Microsoft Intune & Entra ID",
  "macOS Support & Automation",
  "Corporate IT Training",
  "Other IT Requirement"
];
function ContactEnquiry() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services$1[0]);
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
    "Please contact me to discuss the next steps."
  ].join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
    `OrhanTech Enquiry - ${service}`
  )}&body=${encodeURIComponent(message)}`;
  function handleSubmit(event) {
    event.preventDefault();
    setPrepared(true);
  }
  return /* @__PURE__ */ jsxs("section", { className: "w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-700", children: /* @__PURE__ */ jsx(Send, { className: "size-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold tracking-tight text-slate-900", children: "Tell us about your IT requirements" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 leading-7 text-slate-600", children: "Share your project details. Prepare an enquiry for WhatsApp, email, or both." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "enquiry-name",
              className: "mb-2 block text-sm font-medium text-slate-700",
              children: "Your name *"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "enquiry-name",
              name: "name",
              autoComplete: "name",
              required: true,
              value: name,
              onChange: (event) => {
                setName(event.target.value);
                setPrepared(false);
              },
              placeholder: "Enter your name",
              className: "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "enquiry-company",
              className: "mb-2 block text-sm font-medium text-slate-700",
              children: "Company name"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "enquiry-company",
              name: "company",
              autoComplete: "organization",
              value: company,
              onChange: (event) => {
                setCompany(event.target.value);
                setPrepared(false);
              },
              placeholder: "Your company",
              className: "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "enquiry-email",
            className: "mb-2 block text-sm font-medium text-slate-700",
            children: "Work email *"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "enquiry-email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            value: email,
            onChange: (event) => {
              setEmail(event.target.value);
              setPrepared(false);
            },
            placeholder: "you@company.com",
            className: "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "enquiry-service",
            className: "mb-2 block text-sm font-medium text-slate-700",
            children: "What service do you need? *"
          }
        ),
        /* @__PURE__ */ jsx(
          "select",
          {
            id: "enquiry-service",
            name: "service",
            required: true,
            value: service,
            onChange: (event) => {
              setService(event.target.value);
              setPrepared(false);
            },
            className: "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            children: services$1.map((item) => /* @__PURE__ */ jsx("option", { value: item, children: item }, item))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "enquiry-devices",
            className: "mb-2 block text-sm font-medium text-slate-700",
            children: "Approximate number of devices"
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "enquiry-devices",
            name: "devices",
            value: devices,
            onChange: (event) => {
              setDevices(event.target.value);
              setPrepared(false);
            },
            className: "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select device count (optional)" }),
              /* @__PURE__ */ jsx("option", { value: "1–25", children: "1–25 devices" }),
              /* @__PURE__ */ jsx("option", { value: "26–100", children: "26–100 devices" }),
              /* @__PURE__ */ jsx("option", { value: "101–500", children: "101–500 devices" }),
              /* @__PURE__ */ jsx("option", { value: "500+", children: "500+ devices" }),
              /* @__PURE__ */ jsx("option", { value: "Training only", children: "Training only" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "enquiry-details",
            className: "mb-2 block text-sm font-medium text-slate-700",
            children: "Project details"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "enquiry-details",
            name: "details",
            rows: 4,
            value: details,
            onChange: (event) => {
              setDetails(event.target.value);
              setPrepared(false);
            },
            placeholder: "Tell us about your current environment, requirements or training goals...",
            className: "w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "submit",
          className: "inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-4 font-semibold text-white transition hover:bg-blue-800",
          children: [
            "Prepare My Enquiry ",
            /* @__PURE__ */ jsx(Send, { className: "ml-2 size-4" })
          ]
        }
      ),
      prepared && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-blue-200 bg-blue-50 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 size-5 shrink-0 text-blue-700" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-slate-900", children: "Your enquiry is ready" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-6 text-slate-600", children: "Choose either channel below. Your details will be added to the draft. Open both separately if you want to contact us through WhatsApp and email." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: whatsappUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center rounded-lg bg-[#15803d] px-4 py-3 font-semibold text-white no-underline hover:bg-green-800",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "mr-2 size-5" }),
                "Continue on WhatsApp"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: emailUrl,
              className: "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-800 no-underline hover:bg-slate-100",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "mr-2 size-5" }),
                "Prepare Email"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs leading-5 text-slate-500", children: "Your enquiry is not sent automatically. Review the draft and press Send in WhatsApp or your email app." })
      ] })
    ] })
  ] });
}
function meta({}) {
  return [{
    title: "OrhanTech.in | Jamf Pro, Intune & Apple IT Solutions"
  }, {
    name: "description",
    content: "OrhanTech provides Jamf Pro consulting, Apple Business Manager deployment, Microsoft Intune, Entra ID, macOS support and practical IT training."
  }];
}
const services = [{
  icon: ShieldCheck,
  number: "01",
  title: "Jamf Pro Implementation & Management",
  description: "Manage Apple devices throughout their lifecycle with centralized configuration, application deployment, security controls and automation.",
  tags: ["MDM", "Security", "Automation"],
  details: ["Jamf Pro setup, configuration and environment assessment", "Automated Device Enrollment and PreStage Enrollment", "Configuration profiles, policies and Smart Groups", "Application deployment, patch management and Self Service", "macOS compliance monitoring and security configuration", "Shell scripts, Extension Attributes and automated workflows", "Troubleshooting, documentation and ongoing administration"]
}, {
  icon: Laptop,
  number: "02",
  title: "Apple Business Manager & Zero-Touch Deployment",
  description: "Simplify corporate Apple device provisioning through centralized device assignment, automated enrollment and standardized deployment workflows.",
  tags: ["ABM", "ADE", "Deployment"],
  details: ["Apple Business Manager setup guidance", "Reseller assignment and device enrollment workflows", "Jamf Pro MDM server integration and token management", "PreStage configuration and enrollment customization", "Automated provisioning for new employees", "Managed Apple Account and identity workflow guidance", "Device reassignment and deployment documentation"]
}, {
  icon: Cloud,
  number: "03",
  title: "Microsoft Intune & Entra ID",
  description: "Support endpoint management and identity workflows with Microsoft Intune, Entra ID, compliance policies and access-control configuration.",
  tags: ["Intune", "Entra ID", "Identity"],
  details: ["Intune tenant and device enrollment configuration", "Windows configuration and compliance policies", "Microsoft Entra ID users, groups and identity workflows", "Conditional Access planning and configuration guidance", "Application deployment and endpoint security policies", "macOS management integration planning", "Jamf Pro and Microsoft Intune compliance integration"]
}, {
  icon: Code2,
  number: "04",
  title: "macOS Support & Endpoint Automation",
  description: "Improve support operations with macOS troubleshooting, shell scripting, application lifecycle management and repeatable IT workflows.",
  tags: ["macOS", "Scripting", "Support"],
  details: ["macOS installation, recovery and troubleshooting", "Local user, group and administrator access management", "Shell scripting and IT automation", "Application installation, updates and patch workflows", "FileVault and software update configuration guidance", "Enrollment failures and device compliance troubleshooting", "Technical documentation and operational runbooks"]
}];
const courses$4 = [{
  title: "Jamf Pro Administration",
  detail: "Learn enrollment, policies, configuration profiles, Smart Groups, Self Service, application deployment and compliance workflows.",
  level: "Beginner to Advanced"
}, {
  title: "Apple Device Deployment",
  detail: "Understand Apple Business Manager, Automated Device Enrollment, PreStage Enrollment, device assignment and zero-touch deployment.",
  level: "Practical deployment labs"
}, {
  title: "Intune & Entra ID Labs",
  detail: "Explore device enrollment, compliance policies, identity management, endpoint configuration and integration scenarios.",
  level: "Guided practical labs"
}];
const deliverySteps = [{
  icon: ClipboardCheck,
  title: "Assess & Plan",
  description: "Review your current devices, management tools, enrollment processes and security requirements. Define the agreed project scope."
}, {
  icon: Settings,
  title: "Configure & Deploy",
  description: "Configure management policies, enrollment workflows, applications and device settings according to your requirements."
}, {
  icon: ShieldCheck,
  title: "Secure & Standardize",
  description: "Establish consistent device configuration, compliance checks and security practices appropriate for your environment."
}, {
  icon: Code2,
  title: "Automate & Optimize",
  description: "Reduce repetitive administration through scripts, policies, Smart Groups and repeatable deployment workflows."
}, {
  icon: Wrench,
  title: "Troubleshoot & Support",
  description: "Investigate enrollment issues, application failures, configuration conflicts and endpoint management problems."
}, {
  icon: GraduationCap,
  title: "Document & Enable",
  description: "Provide agreed technical documentation, operational guidance and knowledge transfer for your IT team."
}];
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-white text-slate-900",
    children: [/* @__PURE__ */ jsxs("section", {
      id: "home",
      className: "relative overflow-hidden bg-slate-950 text-white",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-32 md:pb-32 md:pt-40 lg:grid-cols-2 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200",
            children: [/* @__PURE__ */ jsx("span", {
              className: "size-2 rounded-full bg-blue-400"
            }), "Apple & Enterprise IT Solutions"]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
            children: ["Manage devices.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
              className: "text-blue-400",
              children: "Secure identities."
            }), /* @__PURE__ */ jsx("br", {}), "Build expertise."]
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-7 max-w-xl text-base leading-8 text-slate-300 md:text-lg",
            children: "Practical IT consulting and hands-on training for modern enterprises. Simplify Apple device management, strengthen endpoint workflows and build technical skills with OrhanTech."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-9 flex flex-col gap-4 sm:flex-row",
            children: [/* @__PURE__ */ jsxs("a", {
              href: "#services",
              className: "inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500",
              children: ["Explore Our Services ", /* @__PURE__ */ jsx(ArrowRight, {
                className: "ml-2 size-5"
              })]
            }), /* @__PURE__ */ jsx("a", {
              href: "#training",
              className: "inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-4 font-semibold text-white transition hover:bg-white/10",
              children: "Explore Training"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300",
            children: ["Practical labs", "Enterprise workflows", "Technical training"].map((item) => /* @__PURE__ */ jsxs("span", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */ jsx(CheckCircle2, {
                className: "size-4 text-blue-400"
              }), item]
            }, item))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative mx-auto w-full max-w-lg",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute -inset-5 rounded-3xl bg-blue-500/20 blur-3xl"
          }), /* @__PURE__ */ jsx("img", {
            src: "/confident-instructor.webp",
            alt: "OrhanTech IT instructor",
            loading: "eager",
            className: "relative mx-auto mb-6 block h-auto max-h-96 w-full rounded-2xl object-contain shadow-xl"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between border-b border-white/10 pb-5",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-slate-400",
                  children: "ORHANTECH"
                }), /* @__PURE__ */ jsx("h2", {
                  className: "mt-1 text-xl font-semibold",
                  children: "Endpoint Management"
                })]
              }), /* @__PURE__ */ jsx(Monitor, {
                className: "size-8 text-blue-400"
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-6 space-y-4",
              children: [{
                label: "Apple Device Management",
                value: "Jamf Pro"
              }, {
                label: "Automated Deployment",
                value: "ABM / ADE"
              }, {
                label: "Endpoint & Identity",
                value: "Intune / Entra ID"
              }].map((item) => /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-slate-400",
                    children: item.label
                  }), /* @__PURE__ */ jsx("p", {
                    className: "mt-1 font-semibold",
                    children: item.value
                  })]
                }), /* @__PURE__ */ jsx(CheckCircle2, {
                  className: "size-5 shrink-0 text-emerald-400"
                })]
              }, item.label))
            }), /* @__PURE__ */ jsxs("div", {
              className: "mt-6 rounded-xl bg-blue-500/10 p-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm font-semibold text-blue-200",
                children: "Learn by doing"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm leading-6 text-slate-300",
                children: "Explore device deployment, security configuration and automation through practical scenarios."
              })]
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "border-b border-slate-200 bg-slate-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-7 text-sm font-semibold text-slate-500 md:justify-between lg:px-8",
        children: [/* @__PURE__ */ jsx("span", {
          children: "APPLE DEVICE MANAGEMENT"
        }), /* @__PURE__ */ jsx("span", {
          children: "JAMF PRO"
        }), /* @__PURE__ */ jsx("span", {
          children: "MICROSOFT INTUNE"
        }), /* @__PURE__ */ jsx("span", {
          children: "MICROSOFT ENTRA ID"
        }), /* @__PURE__ */ jsx("span", {
          children: "macOS SUPPORT"
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      id: "services",
      className: "mx-auto max-w-7xl px-5 py-24 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "max-w-3xl",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-600",
          children: "Our services"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl",
          children: "Enterprise endpoint solutions, built around your needs."
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-5 leading-7 text-slate-600",
          children: "From Apple device lifecycle management to Microsoft endpoint administration, we help teams plan, deploy, manage and support their device environments."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-12 grid gap-6 sm:grid-cols-2",
        children: services.map((service) => {
          const Icon = service.icon;
          const serviceImage = service.number === "01" ? "/confident-instructor.webp" : service.number === "02" ? "/confident-woman.webp" : service.number === "03" ? "/happy-student-1.webp" : "/happy-student-2.webp";
          return /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-xl sm:p-8",
            children: [/* @__PURE__ */ jsx("div", {
              className: "mb-6 flex min-h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2",
              children: /* @__PURE__ */ jsx("img", {
                src: serviceImage,
                alt: service.title,
                loading: "lazy",
                className: "block h-auto max-h-72 w-full rounded-lg object-contain"
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between gap-4",
              children: [/* @__PURE__ */ jsx("span", {
                className: "grid size-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600",
                children: /* @__PURE__ */ jsx(Icon, {
                  className: "size-6"
                })
              }), /* @__PURE__ */ jsxs("span", {
                className: "text-sm text-slate-400",
                children: ["SERVICE ", service.number]
              })]
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-6 text-xl font-semibold sm:text-2xl",
              children: service.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-3 leading-7 text-slate-600",
              children: service.description
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-5 flex flex-wrap gap-2",
              children: service.tags.map((tag) => /* @__PURE__ */ jsx("span", {
                className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600",
                children: tag
              }, tag))
            }), /* @__PURE__ */ jsxs("div", {
              className: "mt-7 border-t border-slate-100 pt-6",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-semibold",
                children: "What we can help with"
              }), /* @__PURE__ */ jsx("ul", {
                className: "mt-4 space-y-3",
                children: service.details.map((detail) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start gap-3 text-sm leading-6 text-slate-600",
                  children: [/* @__PURE__ */ jsx(CheckCircle2, {
                    className: "mt-1 size-4 shrink-0 text-blue-600"
                  }), /* @__PURE__ */ jsx("span", {
                    children: detail
                  })]
                }, detail))
              })]
            }), /* @__PURE__ */ jsxs("a", {
              href: "#contact",
              className: "mt-7 inline-flex items-center font-semibold text-blue-700 no-underline hover:text-blue-900",
              children: ["Discuss this service ", /* @__PURE__ */ jsx(ArrowRight, {
                className: "ml-2 size-4"
              })]
            })]
          }, service.number);
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-slate-200 bg-slate-50 py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-3xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-600",
            children: "Our delivery approach"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl",
            children: "From implementation to ongoing IT support."
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 leading-7 text-slate-600",
            children: "A structured approach to understanding your environment, delivering the agreed technical scope and helping your team operate it confidently."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          children: deliverySteps.map((step, index) => {
            const Icon = step.icon;
            return /* @__PURE__ */ jsxs("article", {
              className: "rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600",
                  children: /* @__PURE__ */ jsx(Icon, {
                    className: "size-5"
                  })
                }), /* @__PURE__ */ jsxs("span", {
                  className: "text-sm font-semibold text-slate-400",
                  children: ["0", index + 1]
                })]
              }), /* @__PURE__ */ jsx("h3", {
                className: "mt-5 text-xl font-semibold",
                children: step.title
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-3 text-sm leading-7 text-slate-600",
                children: step.description
              })]
            }, step.title);
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-10 rounded-2xl bg-slate-950 p-7 text-white md:flex md:items-center md:justify-between md:gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold",
              children: "Have a specific endpoint management requirement?"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 max-w-2xl leading-7 text-slate-300",
              children: "Tell us about your devices, current environment and project goals so we can discuss the appropriate scope of work."
            })]
          }), /* @__PURE__ */ jsxs("a", {
            href: "#contact",
            className: "mt-5 inline-flex w-fit shrink-0 items-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white no-underline hover:bg-blue-500 md:mt-0",
            children: ["Discuss Your Project ", /* @__PURE__ */ jsx(ArrowRight, {
              className: "ml-2 size-4"
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "training",
      className: "bg-white py-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col justify-between gap-5 md:flex-row md:items-end",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "max-w-3xl",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-600",
              children: "OrhanTech Academy"
            }), /* @__PURE__ */ jsx("h2", {
              className: "mt-4 text-3xl font-semibold tracking-tight sm:text-4xl",
              children: "Learn enterprise IT through practical training."
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-5 leading-7 text-slate-600",
              children: "Build hands-on skills in Apple and Microsoft endpoint management through guided labs and real-world scenarios."
            })]
          }), /* @__PURE__ */ jsxs("a", {
            href: "#contact",
            className: "inline-flex w-fit items-center rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white no-underline hover:bg-blue-700",
            children: ["Ask About Courses ", /* @__PURE__ */ jsx(ArrowRight, {
              className: "ml-2 size-4"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mb-8 mt-10 grid items-start gap-5 sm:grid-cols-2",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2",
            children: /* @__PURE__ */ jsx("img", {
              src: "/happy-student-1.webp",
              alt: "Practical IT training",
              className: "block h-auto max-h-80 w-full rounded-xl object-contain",
              loading: "lazy"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "flex min-h-48 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-2",
            children: /* @__PURE__ */ jsx("img", {
              src: "/happy-student-2.webp",
              alt: "Student learning",
              className: "block h-auto max-h-80 w-full rounded-xl object-contain",
              loading: "lazy"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-10 grid gap-5 md:grid-cols-3",
          children: courses$4.map((course, index) => /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-300 hover:shadow-lg",
            children: [/* @__PURE__ */ jsxs("span", {
              className: "text-sm font-semibold text-blue-600",
              children: ["COURSE 0", index + 1]
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-4 text-xl font-semibold",
              children: course.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-3 leading-7 text-slate-600",
              children: course.detail
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-5 border-t border-slate-100 pt-4 text-sm font-medium text-slate-500",
              children: course.level
            })]
          }, course.title))
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 rounded-2xl bg-blue-50 p-6",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold text-slate-900",
            children: "Looking for training for your team?"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 leading-7 text-slate-600",
            children: "Contact us to discuss learning goals, practical exercises and available training options."
          }), /* @__PURE__ */ jsxs("a", {
            href: "#contact",
            className: "mt-4 inline-flex items-center font-semibold text-blue-700 no-underline hover:text-blue-900",
            children: ["Enquire about training ", /* @__PURE__ */ jsx(ArrowRight, {
              className: "ml-2 size-4"
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      id: "about",
      className: "mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:items-center lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "rounded-3xl bg-slate-950 p-8 text-white sm:p-12",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-400",
          children: "Our approach"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-5 text-3xl font-semibold leading-tight",
          children: "Practical knowledge. Clear guidance. Real-world skills."
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-5 leading-7 text-slate-300",
          children: "We focus on the skills IT teams need to deploy, manage, secure and troubleshoot enterprise devices."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-600",
          children: "About OrhanTech"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-4 text-3xl font-semibold tracking-tight",
          children: "Helping teams and professionals manage technology with confidence."
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-5 leading-7 text-slate-600",
          children: "OrhanTech provides a focused approach to endpoint management guidance, IT consulting and technical education across Apple and Microsoft environments."
        }), /* @__PURE__ */ jsx("ul", {
          className: "mt-7 space-y-4",
          children: ["Hands-on, scenario-based learning", "Device management and deployment workflows", "Security and compliance fundamentals", "Practical guidance for IT teams and learners"].map((item) => /* @__PURE__ */ jsxs("li", {
            className: "flex items-start gap-3",
            children: [/* @__PURE__ */ jsx(CheckCircle2, {
              className: "mt-0.5 size-5 shrink-0 text-blue-600"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-slate-700",
              children: item
            })]
          }, item))
        })]
      })]
    }), /* @__PURE__ */ jsxs("section", {
      id: "contact",
      className: "bg-blue-700 px-5 py-20 text-white",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-2xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-100",
            children: "Let's connect"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-4 text-3xl font-semibold sm:text-4xl",
            children: "Ready to discuss your IT needs or training goals?"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-7 text-blue-100",
            children: "Contact OrhanTech to discuss Jamf Pro, Apple device management, Microsoft Intune, macOS support or training opportunities."
          })]
        }), /* @__PURE__ */ jsxs("a", {
          href: "mailto:mazhar.husain@orhantech.in?subject=OrhanTech%20Enquiry",
          className: "inline-flex w-fit shrink-0 items-center rounded-lg bg-white px-6 py-4 font-semibold text-blue-700 no-underline hover:bg-blue-50",
          children: [/* @__PURE__ */ jsx(Mail, {
            className: "mr-2 size-5"
          }), " Email Us"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto mt-10 max-w-3xl",
        children: /* @__PURE__ */ jsx(ContactEnquiry, {})
      }), /* @__PURE__ */ jsx("div", {
        className: "mx-auto mt-10 max-w-7xl border-t border-white/20 pt-5 text-sm text-blue-100",
        children: "For project enquiries, please include your requirements, device platform and preferred timeline."
      })]
    }), /* @__PURE__ */ jsx("footer", {
      className: "bg-slate-950 px-5 py-8 text-slate-400",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm sm:flex-row sm:items-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "font-semibold text-white",
          children: "OrhanTech.in"
        }), /* @__PURE__ */ jsx("p", {
          children: "Apple & Enterprise IT Solutions and Training"
        }), /* @__PURE__ */ jsx("a", {
          className: "no-underline hover:text-white",
          href: "mailto:mazhar.husain@orhantech.in",
          children: "mazhar.husain@orhantech.in"
        }), /* @__PURE__ */ jsxs("p", {
          children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), " OrhanTech. All rights reserved."]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = "https://puldsrwzuonpgakjzwjj.supabase.co";
const supabasePublishableKey = "sb_publishable_Q3ptrvecD5AkjFD72Ff5uQ_qUwL6ruj";
const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
const signup = UNSAFE_withComponentProps(function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function handleSignup(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const {
        data,
        error: error2
      } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim()
          }
        }
      });
      if (error2) throw error2;
      if (data.user && !data.session) {
        setMessage("Account created! Please check your email and confirm your account before logging in.");
      } else if (data.user) {
        setMessage("Registration successful! Your account has been created.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-50 px-4 py-16 sm:py-20 overflow-y-auto",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
        children: "OrhanTech.in Academy"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-4 text-2xl sm:text-3xl font-bold leading-tight break-words text-slate-900",
        children: "Create your student account"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2 text-sm text-slate-600",
        children: "Register to access your training courses and learning materials."
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSignup,
        className: "mt-8 space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "name",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Full name"
          }), /* @__PURE__ */ jsx("input", {
            id: "name",
            type: "text",
            autoComplete: "name",
            required: true,
            value: name,
            onChange: (event) => setName(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "Enter your full name"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "email",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Email address"
          }), /* @__PURE__ */ jsx("input", {
            id: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            value: email,
            onChange: (event) => setEmail(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "you@example.com"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "password",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Password"
          }), /* @__PURE__ */ jsx("input", {
            id: "password",
            type: "password",
            autoComplete: "new-password",
            minLength: 8,
            required: true,
            value: password,
            onChange: (event) => setPassword(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "At least 8 characters"
          })]
        }), error && /* @__PURE__ */ jsx("p", {
          role: "alert",
          className: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
          children: error
        }), message && /* @__PURE__ */ jsx("p", {
          role: "status",
          className: "rounded-lg bg-green-50 p-3 text-sm text-green-700",
          children: message
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: loading,
          className: "w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60",
          children: loading ? "Creating account..." : "Create student account"
        })]
      }), /* @__PURE__ */ jsxs("p", {
        className: "mt-6 text-center text-sm text-slate-600",
        children: ["Already registered?", " ", /* @__PURE__ */ jsx(Link, {
          to: "/login",
          className: "font-semibold text-blue-700 hover:underline",
          children: "Sign in"
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-4 text-center text-sm text-slate-500",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "hover:text-blue-700 hover:underline",
          children: "Back to homepage"
        })
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const login = UNSAFE_withComponentProps(function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        navigate("/student-dashboard", {
          replace: true
        });
      }
    });
    supabase.auth.getSession().then(({
      data,
      error: error2
    }) => {
      if (!active) return;
      if (error2) {
        setError("Unable to check your session. Please try again.");
        return;
      }
      if (data.session) {
        navigate("/student-dashboard", {
          replace: true
        });
      }
    }).finally(() => {
      if (active) setCheckingSession(false);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);
  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const {
        data,
        error: error2
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (error2) throw error2;
      if (!data.session) {
        throw new Error("Login session was not created. Please try again.");
      }
      navigate("/student-dashboard", {
        replace: true
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }
  if (checkingSession) {
    return /* @__PURE__ */ jsx("main", {
      className: "flex min-h-screen items-center justify-center bg-slate-50",
      children: /* @__PURE__ */ jsx("p", {
        className: "text-sm font-medium text-slate-600",
        children: "Checking your session..."
      })
    });
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen overflow-y-auto bg-slate-50 px-4 py-16 sm:py-20",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
        children: "OrhanTech.in Academy"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-3 text-3xl font-bold text-slate-900",
        children: "Student login"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2 text-sm text-slate-600",
        children: "Sign in to continue learning."
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleLogin,
        className: "mt-8 space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "email",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Email address"
          }), /* @__PURE__ */ jsx("input", {
            id: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            value: email,
            onChange: (event) => setEmail(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "you@example.com"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "password",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Password"
          }), /* @__PURE__ */ jsx("input", {
            id: "password",
            type: "password",
            autoComplete: "current-password",
            required: true,
            value: password,
            onChange: (event) => setPassword(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "Enter your password"
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-2 flex justify-end",
            children: /* @__PURE__ */ jsx(Link, {
              to: "/forgot-password",
              className: "text-sm font-semibold text-blue-700 transition hover:text-blue-900 hover:underline",
              children: "Forgot password?"
            })
          })]
        }), error && /* @__PURE__ */ jsx("p", {
          role: "alert",
          className: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
          children: error
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: loading,
          className: "w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60",
          children: loading ? "Signing in..." : "Sign in"
        })]
      }), /* @__PURE__ */ jsxs("p", {
        className: "mt-6 text-center text-sm text-slate-600",
        children: ["New student?", " ", /* @__PURE__ */ jsx(Link, {
          to: "/signup",
          className: "font-semibold text-blue-700 hover:underline",
          children: "Create an account"
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-4 text-center text-sm text-slate-500",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "hover:text-blue-700 hover:underline",
          children: "Back to homepage"
        })
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const forgotPassword = UNSAFE_withComponentProps(function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    setLoading(true);
    setMessage("");
    setError("");
    if (!normalizedEmail) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const {
        error: resetError
      } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo
      });
      if (resetError) {
        throw resetError;
      }
      setMessage("If an account exists for this email, a password reset link will be sent. Please check your inbox and spam folder.");
    } catch (err) {
      console.error("Password reset request failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Password reset failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("main", {
    className: "flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
        children: "OrhanTech.in Academy"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-3 text-3xl font-bold text-slate-900",
        children: "Forgot password?"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2 text-sm text-slate-600",
        children: "Enter the email address you used to create your student account."
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit,
        className: "mt-8 space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "email",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Registered email address"
          }), /* @__PURE__ */ jsx("input", {
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            required: true,
            value: email,
            onChange: (event) => setEmail(event.target.value),
            placeholder: "you@example.com",
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          })]
        }), error && /* @__PURE__ */ jsx("p", {
          role: "alert",
          className: "break-words rounded-lg bg-red-50 p-3 text-sm text-red-700",
          children: error
        }), message && /* @__PURE__ */ jsx("p", {
          role: "status",
          className: "rounded-lg bg-green-50 p-3 text-sm text-green-800",
          children: message
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: loading,
          className: "w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60",
          children: loading ? "Sending link..." : "Send reset link"
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-6 text-center text-sm",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/login",
          className: "font-semibold text-blue-700 hover:underline",
          children: "Back to sign in"
        })
      })]
    })
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: forgotPassword
}, Symbol.toStringTag, { value: "Module" }));
const resetPassword = UNSAFE_withComponentProps(function ResetPassword() {
  useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    let active = true;
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" && session) {
        setReady(true);
      }
    });
    supabase.auth.getSession().then(({
      data
    }) => {
      if (!active) return;
      if (data.session) setReady(true);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const {
        error: error2
      } = await supabase.auth.updateUser({
        password
      });
      if (error2) throw error2;
      setSuccess(true);
      await supabase.auth.signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reset your password. Request a new reset link.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("main", {
    className: "flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16",
    children: /* @__PURE__ */ jsxs("div", {
      className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
        children: "OrhanTech.in Academy"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-3 text-3xl font-bold text-slate-900",
        children: "Reset password"
      }), success ? /* @__PURE__ */ jsxs("div", {
        className: "mt-6 space-y-4",
        children: [/* @__PURE__ */ jsx("p", {
          className: "rounded-lg bg-green-50 p-3 text-sm text-green-800",
          children: "Your password has been updated. Please sign in with your new password."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/login",
          className: "inline-block font-semibold text-blue-700 hover:underline",
          children: "Go to sign in"
        })]
      }) : !ready ? /* @__PURE__ */ jsxs("div", {
        className: "mt-6 space-y-4",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm text-slate-600",
          children: "Open this page using the latest password reset link sent to your email. If the link has expired, request a new one."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/forgot-password",
          className: "font-semibold text-blue-700 hover:underline",
          children: "Request a new reset link"
        })]
      }) : /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit,
        className: "mt-8 space-y-5",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "password",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "New password"
          }), /* @__PURE__ */ jsx("input", {
            id: "password",
            type: "password",
            autoComplete: "new-password",
            minLength: 8,
            required: true,
            value: password,
            onChange: (event) => setPassword(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "At least 8 characters"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "confirmPassword",
            className: "mb-1 block text-sm font-medium text-slate-700",
            children: "Confirm new password"
          }), /* @__PURE__ */ jsx("input", {
            id: "confirmPassword",
            type: "password",
            autoComplete: "new-password",
            minLength: 8,
            required: true,
            value: confirmPassword,
            onChange: (event) => setConfirmPassword(event.target.value),
            className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100",
            placeholder: "Enter password again"
          })]
        }), error && /* @__PURE__ */ jsx("p", {
          role: "alert",
          className: "rounded-lg bg-red-50 p-3 text-sm text-red-700",
          children: error
        }), /* @__PURE__ */ jsx("button", {
          type: "submit",
          disabled: loading,
          className: "w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60",
          children: loading ? "Updating password..." : "Update password"
        })]
      })]
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: resetPassword
}, Symbol.toStringTag, { value: "Module" }));
const modules$2 = [{
  number: "01",
  title: "Jamf Pro Fundamentals & Architecture",
  topics: ["Jamf Pro architecture and administration", "Policies and configuration profiles", "Smart Groups and Extension Attributes", "Inventory collection and scope management"]
}, {
  number: "02",
  title: "macOS Enrollment Methods",
  topics: ["Apple Business Manager (ABM) integration", "Automated Device Enrollment (ADE)", "PreStage Enrollment configuration", "Device Enrollment and User-Initiated Enrollment", "Enrollment customization and troubleshooting"]
}, {
  number: "03",
  title: "Jamf Blueprint & CIS Benchmark",
  topics: ["Blueprint creation and configuration", "Compliance conditions and security baselines", "CIS Benchmark controls and implementation", "Compliance monitoring and remediation"]
}, {
  number: "04",
  title: "Jamf Connect & Microsoft Entra ID",
  topics: ["Jamf Connect architecture and setup", "Entra ID identity provider integration", "Authentication and login configuration", "Identity integration troubleshooting"]
}, {
  number: "05",
  title: "Jamf Pro & Jamf Account Integration",
  topics: ["Jamf Account and SSO concepts", "OIDC and identity provider configuration", "Jamf Pro authentication integration", "Integration testing and troubleshooting"]
}, {
  number: "06",
  title: "Microsoft Entra ID & Conditional Access",
  topics: ["Conditional Access policy setup", "Device compliance and access requirements", "Identity-based access restrictions", "Policy validation and troubleshooting"]
}, {
  number: "07",
  title: "Department-Wise Application Deployment",
  topics: ["IT, HR, Developer, Manager and Executive groups", "Policy scoping and exclusions", "Department-specific application deployment", "Self Service configuration and testing"]
}, {
  number: "08",
  title: "Third-Party Application Automation",
  topics: ["Installomator deployment workflows", "Automated application installation and updates", "Patch management and version control", "Deployment scripts, logging and error handling"]
}, {
  number: "09",
  title: "macOS Security & Compliance",
  topics: ["FileVault configuration and recovery", "Security configuration and restrictions", "Compliance reporting and monitoring", "Security remediation workflows"]
}, {
  number: "10",
  title: "Troubleshooting & Enterprise Project",
  topics: ["Enrollment and policy troubleshooting", "Log collection and debugging", "Identity and application deployment issues", "Practical enterprise implementation project"]
}];
const learningOutcomes = ["Configure Apple device enrollment workflows", "Implement security and compliance controls", "Understand Blueprint and CIS Benchmark concepts", "Integrate Jamf Connect with Entra ID", "Understand Jamf Pro and Jamf Account SSO", "Configure and test Conditional Access", "Deploy apps using department-based scoping", "Automate third-party application deployment"];
const courseDetails = [{
  label: "Duration",
  value: "2 months"
}, {
  label: "Training",
  value: "Instructor-led practical learning"
}, {
  label: "Level",
  value: "Administration to enterprise engineering"
}, {
  label: "Labs",
  value: "Hands-on practice"
}];
const jamfPro = UNSAFE_withComponentProps(function JamfProCourse() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-[#F3F6FB] pt-16 text-slate-900",
    children: [/* @__PURE__ */ jsx("section", {
      className: "relative overflow-hidden bg-[#071426] bg-cover bg-center px-5 py-16 text-white sm:py-24 lg:py-28",
      style: {
        backgroundImage: "linear-gradient(90deg, rgba(4,18,40,0.97) 0%, rgba(4,18,40,0.88) 42%, rgba(4,18,40,0.30) 100%), url('/jamf-hero.webp')"
      },
      children: /* @__PURE__ */ jsxs("div", {
        className: "relative z-10 mx-auto max-w-6xl",
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "text-sm font-medium text-blue-300 transition hover:text-white",
          children: "← Back to Home"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 max-w-2xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold uppercase tracking-[0.2em] text-blue-300",
            children: "OrhanTech.in Academy"
          }), /* @__PURE__ */ jsx("h1", {
            className: "mt-4 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl",
            children: "Jamf Pro Administration & Enterprise Engineering"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg",
            children: "Learn enterprise Apple device management, enrollment, security compliance, identity integration, Conditional Access and application deployment through practical implementation scenarios."
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-7 flex flex-wrap gap-3",
            children: ["2-Month Training Plan", "Practical Labs", "Enterprise Scenarios"].map((item) => /* @__PURE__ */ jsx("span", {
              className: "rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm",
              children: item
            }, item))
          }), /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500",
            children: "Register as a Student →"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "px-5 py-12 sm:py-16 lg:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px]",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold uppercase tracking-widest text-blue-700",
            children: "Professional Training"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-2 text-2xl font-bold sm:text-3xl",
            children: "About This Course"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 max-w-3xl leading-8 text-slate-600",
            children: "This advanced course focuses on real-world Jamf Pro administration and enterprise implementation. Students explore enrollment workflows, Blueprint compliance, CIS Benchmark controls, identity integrations, Conditional Access, macOS security and automated application deployment."
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-10 text-xl font-bold sm:text-2xl",
            children: "What You Will Learn"
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-5 grid gap-3 sm:grid-cols-2",
            children: learningOutcomes.map((item) => /* @__PURE__ */ jsxs("li", {
              className: "flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md",
              children: [/* @__PURE__ */ jsx("span", {
                className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700",
                children: "✓"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm leading-6 text-slate-700",
                children: item
              })]
            }, item))
          })]
        }), /* @__PURE__ */ jsxs("aside", {
          className: "h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold uppercase tracking-widest text-blue-700",
            children: "Course Details"
          }), /* @__PURE__ */ jsx("h3", {
            className: "mt-2 text-xl font-bold",
            children: "Course Information"
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-6 divide-y divide-slate-100",
            children: courseDetails.map(({
              label,
              value
            }) => /* @__PURE__ */ jsxs("div", {
              className: "py-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: label
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 font-semibold text-slate-800",
                children: value
              })]
            }, label))
          }), /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "mt-5 flex w-full items-center justify-center rounded-lg bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800",
            children: "Create Student Account →"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 text-center text-xs leading-5 text-slate-500",
            children: "Lab access and learning resources can be provided after registration review."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-slate-200 bg-gradient-to-b from-white to-[#EDF4FF] px-5 py-12 sm:py-16 lg:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-6xl",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-widest text-blue-700",
          children: "Complete Curriculum"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-2 text-2xl font-bold sm:text-3xl",
          children: "Course Syllabus"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-3 max-w-2xl leading-7 text-slate-600",
          children: "Explore ten practical modules covering Jamf Pro administration, enrollment, integrations, compliance, security and automation."
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          children: modules$2.map((module) => /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-6",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex size-11 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700",
              children: module.number
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-4 text-base font-bold leading-6 text-slate-900",
              children: module.title
            }), /* @__PURE__ */ jsx("ul", {
              className: "mt-4 space-y-2.5",
              children: module.topics.map((topic) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-start gap-2 text-sm leading-6 text-slate-600",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "mt-1 text-blue-600",
                  children: "•"
                }), /* @__PURE__ */ jsx("span", {
                  children: topic
                })]
              }, topic))
            })]
          }, module.number))
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "relative overflow-hidden bg-[#071426] px-5 py-14 text-white sm:py-20",
      children: [/* @__PURE__ */ jsx("div", {
        className: "absolute inset-0 bg-cover bg-center opacity-25",
        style: {
          backgroundImage: "url('/jamf-hero.webp')"
        },
        "aria-hidden": "true"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative mx-auto max-w-4xl text-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-widest text-blue-300",
          children: "Build Your Enterprise Skills"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-3 text-2xl font-bold sm:text-4xl",
          children: "Ready to Start Learning?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-slate-300",
          children: "Create your student account to begin the registration process. Lab access and learning resources can be provided after registration review."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/signup",
          className: "mt-7 inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500",
          children: "Register Now →"
        })]
      })]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jamfPro
}, Symbol.toStringTag, { value: "Module" }));
const modules$1 = [{
  number: "01",
  title: "Microsoft Entra ID Fundamentals",
  topics: ["Tenant and directory fundamentals", "Users, groups and administrative roles", "MFA, SSO and authentication methods", "Enterprise applications and identity troubleshooting"]
}, {
  number: "02",
  title: "Conditional Access & Identity Security",
  topics: ["Conditional Access policies and assignments", "MFA enforcement and sign-in controls", "Device-based access and compliance signals", "Sign-in logs and policy troubleshooting"]
}, {
  number: "03",
  title: "Microsoft Intune Fundamentals",
  topics: ["Intune admin center and tenant setup", "Device enrollment and ownership", "Device groups and assignment filters", "Configuration profiles and policy deployment"]
}, {
  number: "04",
  title: "macOS Management — Basic to Advanced",
  topics: ["macOS enrollment and device management", "Configuration profiles and restrictions", "FileVault, security settings and compliance", "Application deployment, updates and scripting", "Logs and troubleshooting"]
}, {
  number: "05",
  title: "iOS & iPadOS Management",
  topics: ["Apple Business Manager fundamentals", "Automated Device Enrollment", "Apple Push Notification service (APNs)", "Managed applications and app protection", "Compliance and restrictions"]
}, {
  number: "06",
  title: "Windows Support — L1",
  topics: ["Windows enrollment and device registration", "Configuration profiles and compliance policies", "Application deployment and updates", "Basic endpoint and access troubleshooting"]
}, {
  number: "07",
  title: "Windows Support — L2",
  topics: ["Policy and application deployment failures", "Windows event logs and diagnostic collection", "Enrollment and compliance troubleshooting", "Windows Autopilot fundamentals", "Root-cause analysis and escalation"]
}, {
  number: "08",
  title: "Enterprise Lab & Final Project",
  topics: ["Configure users, groups and Conditional Access", "Enroll and manage supported devices", "Deploy applications and security policies", "Troubleshoot real-world support scenarios", "Final practical assessment"]
}];
const platforms = [{
  code: "macOS",
  title: "Apple Mac",
  description: "Device management, profiles, security and application deployment."
}, {
  code: "iOS",
  title: "iPhone & iPad",
  description: "Enrollment, managed applications, restrictions and compliance."
}, {
  code: "L1",
  title: "Windows L1",
  description: "Enrollment, apps, configuration and everyday IT support."
}, {
  code: "L2",
  title: "Windows L2",
  description: "Logs, policy failures, diagnostics and advanced troubleshooting."
}];
const Intune = UNSAFE_withComponentProps(function IntuneCourse() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-white text-slate-900",
    children: [/* @__PURE__ */ jsx("section", {
      className: "overflow-hidden bg-[#081426] text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "inline-flex items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200 sm:text-sm",
            children: "OrhanTech Academy · Practical Training"
          }), /* @__PURE__ */ jsxs("h1", {
            className: "mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
            children: ["Microsoft Intune", /* @__PURE__ */ jsx("span", {
              className: "block text-blue-300",
              children: "& Entra ID"
            })]
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-4 max-w-xl text-xl font-semibold leading-snug text-slate-200 sm:text-2xl",
            children: "From Fundamentals to Enterprise Support"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 max-w-xl text-base leading-8 text-slate-300",
            children: "Build practical endpoint management and identity security skills across macOS, iOS, iPadOS and Windows, from initial setup to enterprise troubleshooting."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8 flex flex-wrap gap-3",
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/signup",
              className: "rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400",
              children: "Enrol Now →"
            }), /* @__PURE__ */ jsx("a", {
              href: "#course-syllabus",
              className: "rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
              children: "View Curriculum"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "12 Weeks"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Learning plan"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "4 Platforms"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Apple & Windows"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "Hands-on"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Practical labs"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative mx-auto w-full max-w-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute -inset-3 rounded-3xl bg-blue-500/20 blur-2xl"
          }), /* @__PURE__ */ jsx("div", {
            className: "relative overflow-hidden rounded-2xl border border-white/15 bg-white p-2 shadow-2xl sm:p-3",
            children: /* @__PURE__ */ jsx("img", {
              src: "/intune.webp",
              alt: "Microsoft Intune and Entra ID training",
              className: "block h-auto max-h-[560px] w-full rounded-xl object-contain",
              loading: "eager"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-4 flex flex-wrap gap-2",
            children: ["Entra ID", "Microsoft Intune", "Endpoint Security"].map((item) => /* @__PURE__ */ jsx("span", {
              className: "rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 sm:text-sm",
              children: item
            }, item))
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid gap-10 lg:grid-cols-2 lg:items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
            children: "Course Overview"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
            children: "Learn the skills modern IT teams use"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 leading-8 text-slate-600",
            children: "Understand how Microsoft Entra ID and Intune work together to manage identities, secure access and maintain device compliance. Progress from foundational administration to practical troubleshooting for enterprise environments."
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-8 text-slate-600",
            children: "Designed for IT support engineers, endpoint administrators, macOS support professionals and learners preparing for enterprise IT roles."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-bold",
            children: "What you will learn"
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-5 space-y-4",
            children: ["Manage users, groups and identities in Entra ID", "Configure MFA and Conditional Access", "Enroll and manage Apple and Windows devices", "Deploy applications, profiles and security policies", "Investigate compliance and deployment failures", "Troubleshoot common L1 and L2 support incidents"].map((item) => /* @__PURE__ */ jsxs("li", {
              className: "flex items-start gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700",
                children: "✓"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm leading-6 text-slate-700 sm:text-base",
                children: item
              })]
            }, item))
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-slate-100 bg-slate-50 py-16 sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-6 sm:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-2xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
            children: "Platforms Covered"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold sm:text-4xl",
            children: "One course. Multiple environments."
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-7 text-slate-600",
            children: "Learn the workflows used to manage devices and support users across modern workplace platforms."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
          children: platforms.map((platform) => /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700",
              children: platform.code
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-5 text-lg font-bold",
              children: platform.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm leading-6 text-slate-600",
              children: platform.description
            })]
          }, platform.code))
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      id: "course-syllabus",
      className: "mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-8 lg:py-20",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
          children: "Curriculum"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-3 text-3xl font-bold sm:text-4xl",
          children: "Your learning roadmap"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-slate-600",
          children: "Eight structured modules covering identity, Apple device management, Windows endpoint support and troubleshooting."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 space-y-3",
        children: modules$1.map((module) => /* @__PURE__ */ jsxs("details", {
          className: "group overflow-hidden rounded-xl border border-slate-200 bg-white transition open:border-blue-200 open:shadow-sm",
          children: [/* @__PURE__ */ jsxs("summary", {
            className: "flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6",
            children: [/* @__PURE__ */ jsx("span", {
              className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-open:bg-blue-600 group-open:text-white",
              children: module.number
            }), /* @__PURE__ */ jsx("span", {
              className: "flex-1 text-sm font-bold sm:text-base",
              children: module.title
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xl text-slate-400 transition group-open:rotate-45",
              children: "+"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "border-t border-slate-100 px-5 pb-6 pt-5 sm:pl-[5.75rem]",
            children: /* @__PURE__ */ jsx("ul", {
              className: "grid gap-3 sm:grid-cols-2",
              children: module.topics.map((topic) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-start gap-3 text-sm leading-6 text-slate-600",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-blue-600",
                  children: "✓"
                }), /* @__PURE__ */ jsx("span", {
                  children: topic
                })]
              }, topic))
            })
          })]
        }, module.number))
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "bg-[#081426] py-16 text-white sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm",
            children: "Who Should Join?"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 max-w-xl text-3xl font-bold sm:text-4xl",
            children: "Take the next step in your IT career"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 max-w-xl leading-8 text-slate-300",
            children: "Suitable for service desk professionals, IT support engineers, macOS administrators, Windows support engineers and aspiring endpoint management specialists."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-8",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-bold",
            children: "Course Details"
          }), /* @__PURE__ */ jsx("dl", {
            className: "mt-6 space-y-4",
            children: [["Duration", "12 weeks"], ["Training format", "Live / practical labs"], ["Skill level", "Beginner to advanced"], ["Platforms", "macOS, iOS, Windows"]].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0",
              children: [/* @__PURE__ */ jsx("dt", {
                className: "text-sm text-slate-400",
                children: label
              }), /* @__PURE__ */ jsx("dd", {
                className: "text-right text-sm font-semibold text-white",
                children: value
              })]
            }, label))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 text-xs leading-6 text-slate-400",
            children: "Practical lab access depends on trial eligibility, licensing and supported devices. Some enterprise features require additional licenses."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "px-6 py-16 sm:px-8 sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-6xl rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12 sm:py-16",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-100",
          children: "OrhanTech Academy"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mx-auto mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl",
          children: "Ready to learn Intune & Entra ID?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-blue-100",
          children: "Develop practical identity and endpoint management skills for modern enterprise environments."
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 flex flex-wrap justify-center gap-3",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50",
            children: "Create Your Account →"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/login",
            className: "rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
            children: "Sign In"
          })]
        })]
      })
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Intune
}, Symbol.toStringTag, { value: "Module" }));
const modules = [{
  number: "01",
  title: "macOS Fundamentals & Architecture",
  topics: ["macOS versions, architecture and system components", "Finder, Dock, Menu Bar and System Settings", "APFS, volumes, containers and storage", "Hardware details and system information", "Essential macOS support terminology"]
}, {
  number: "02",
  title: "Users, Groups & Permissions",
  topics: ["Standard, administrator and guest accounts", "Local users, groups and account management", "File ownership and permissions", "chmod, chown and sudo fundamentals", "Troubleshoot login and access issues"]
}, {
  number: "03",
  title: "macOS Installation & Recovery",
  topics: ["Erase All Content and Settings", "macOS Recovery and startup options", "Disk Utility, APFS volumes and First Aid", "Reinstall macOS and activation basics", "Create a bootable macOS installer"]
}, {
  number: "04",
  title: "Startup, Login & User Environment",
  topics: ["Startup failures and recovery options", "Safe Mode and diagnostic startup", "Login items and background applications", "Troubleshoot login loops and frozen sessions", "Collect evidence before escalation"]
}, {
  number: "05",
  title: "Application & Performance Troubleshooting",
  topics: ["Activity Monitor: CPU, memory and energy", "Application crashes and force quit", "Disk space and performance investigations", "Install, update and uninstall applications", "Interpret crash reports and diagnostic data"]
}, {
  number: "06",
  title: "Network, VPN & Peripheral Support",
  topics: ["Wi-Fi and network troubleshooting", "DNS, IP addresses, routes and connectivity", "VPN connectivity and certificate basics", "Printers, displays, audio and peripherals", "Useful network diagnostic commands"]
}, {
  number: "07",
  title: "Terminal & macOS Diagnostics",
  topics: ["Terminal navigation and filesystem commands", "Processes, services and launchctl basics", "System logs and log show", "Disk, network and hardware diagnostics", "Collect diagnostic evidence for support tickets"]
}, {
  number: "08",
  title: "Bash Scripting for Support Engineers",
  topics: ["Variables, arguments and exit codes", "Conditions, loops and functions", "File checks and command output", "Logging and safe error handling", "Build a reusable Mac health-check script"]
}, {
  number: "09",
  title: "macOS Security & Privacy",
  topics: ["FileVault status and recovery-key concepts", "Gatekeeper and application security", "Privacy permissions and TCC", "Keychain and certificate troubleshooting", "Firewall basics and secure support practices"]
}, {
  number: "10",
  title: "Software, Updates & Data Protection",
  topics: ["Application installation troubleshooting", "macOS update failures and compatibility", "Storage cleanup and disk-space investigation", "Backup, restore and migration fundamentals", "User data protection and recovery planning"]
}, {
  number: "11",
  title: "Advanced L2 Troubleshooting",
  topics: ["Investigate complex multi-symptom incidents", "Correlate logs and identify probable root causes", "Resolve recurring performance and login issues", "Capture diagnostics and document findings", "Escalation, incident communication and RCA"]
}, {
  number: "12",
  title: "Capstone Project & Job Readiness",
  topics: ["Complete an end-to-end support ticket", "Diagnose and resolve assigned Mac issues", "Write a clear technical resolution report", "Demonstrate safe troubleshooting practices", "Final practical assessment and interview scenarios"]
}];
const outcomes = ["Support users with everyday macOS issues", "Diagnose startup, login and application failures", "Troubleshoot networking and connected devices", "Use Terminal and logs to investigate problems", "Create basic Bash scripts for repetitive support tasks", "Document incidents and escalate with useful evidence"];
const labs = [{
  week: "01",
  title: "Mac inventory & health report",
  description: "Collect macOS version, hardware details, storage information and basic system status."
}, {
  week: "02",
  title: "User access troubleshooting",
  description: "Investigate a test account, administrator access and file-permission problems."
}, {
  week: "03",
  title: "Recovery & reinstall workflow",
  description: "Practice Recovery and Disk Utility procedures using a test Mac and approved test data."
}, {
  week: "04",
  title: "Startup & login incident",
  description: "Work through a simulated startup, login-item or user-session failure."
}, {
  week: "05",
  title: "Slow Mac investigation",
  description: "Use Activity Monitor and diagnostics to investigate CPU, memory and storage pressure."
}, {
  week: "06",
  title: "Network & peripheral diagnosis",
  description: "Investigate a simulated DNS, connectivity, printer or peripheral issue."
}, {
  week: "07",
  title: "Diagnostic evidence collection",
  description: "Use Terminal and system logs to prepare evidence for a support ticket."
}, {
  week: "08",
  title: "Build a support script",
  description: "Create a Bash health-check script with readable output, logging and error handling."
}, {
  week: "09",
  title: "Security & privacy investigation",
  description: "Investigate application permissions, Gatekeeper behavior and FileVault status."
}, {
  week: "10",
  title: "Application update recovery",
  description: "Troubleshoot an application installation or update failure while protecting user data."
}, {
  week: "11",
  title: "L2 incident & root-cause analysis",
  description: "Correlate symptoms and logs, document findings and recommend a safe resolution."
}, {
  week: "12",
  title: "Final practical support assessment",
  description: "Handle a simulated ticket from initial triage through resolution and closure notes."
}];
const macosSupport = UNSAFE_withComponentProps(function MacOSSupportCourse() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-white text-slate-900",
    children: [/* @__PURE__ */ jsx("section", {
      className: "overflow-hidden bg-[#081426] text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-24",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "inline-flex items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200 sm:text-sm",
            children: "OrhanTech Academy · Practical Training"
          }), /* @__PURE__ */ jsxs("h1", {
            className: "mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
            children: ["macOS Support", /* @__PURE__ */ jsx("span", {
              className: "block text-blue-300",
              children: "Engineering"
            })]
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-4 max-w-xl text-xl font-semibold leading-snug text-slate-200 sm:text-2xl",
            children: "From Desktop Support to Advanced L2 Troubleshooting"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 max-w-xl text-base leading-8 text-slate-300",
            children: "Build practical Mac support skills through guided labs covering macOS recovery, users and permissions, applications, networking, Terminal, scripting, security and real-world incident handling."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8 flex flex-wrap gap-3",
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/signup",
              className: "rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400",
              children: "Enrol Now →"
            }), /* @__PURE__ */ jsx("a", {
              href: "#course-syllabus",
              className: "rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
              children: "View Curriculum"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "12 Weeks"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Structured plan"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "12 Labs"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Practical focus"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-xl font-bold sm:text-2xl",
                children: "L1 + L2"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-slate-400 sm:text-sm",
                children: "Support skills"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative mx-auto w-full max-w-2xl",
          children: [/* @__PURE__ */ jsx("div", {
            className: "absolute -inset-3 rounded-3xl bg-blue-500/20 blur-2xl"
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-6 shadow-2xl sm:p-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center gap-2 border-b border-white/10 pb-5",
              children: [/* @__PURE__ */ jsx("span", {
                className: "h-3 w-3 rounded-full bg-red-400"
              }), /* @__PURE__ */ jsx("span", {
                className: "h-3 w-3 rounded-full bg-amber-300"
              }), /* @__PURE__ */ jsx("span", {
                className: "h-3 w-3 rounded-full bg-green-400"
              }), /* @__PURE__ */ jsx("span", {
                className: "ml-2 text-xs text-slate-400",
                children: "macOS Support Lab"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "py-9 sm:py-12",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-3xl text-blue-200",
                children: ""
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-7 text-xs font-bold uppercase tracking-[0.2em] text-blue-300",
                children: "Learn · Diagnose · Resolve"
              }), /* @__PURE__ */ jsxs("h3", {
                className: "mt-3 text-3xl font-bold leading-tight sm:text-4xl",
                children: ["Master everyday", /* @__PURE__ */ jsx("span", {
                  className: "block text-blue-300",
                  children: "Mac troubleshooting."
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base",
                children: "Hands-on practice with the tools and workflows used by professional desktop support teams."
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-2 gap-3",
              children: ["System Recovery", "Terminal & Logs", "Network Support", "Bash Scripting"].map((item) => /* @__PURE__ */ jsxs("div", {
                className: "rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm font-medium text-slate-200",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "mr-2 text-blue-300",
                  children: "✓"
                }), item]
              }, item))
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 text-center text-xs leading-5 text-slate-400",
            children: "Practical training using supported macOS devices and test scenarios."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid gap-10 lg:grid-cols-2 lg:items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
            children: "Course Overview"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
            children: "Learn to troubleshoot Macs with confidence"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 leading-8 text-slate-600",
            children: "This 12-week program takes learners from macOS fundamentals to structured L1 and L2 troubleshooting. Learn to investigate common issues, use built-in diagnostic tools, understand logs, automate routine checks and communicate technical findings."
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-8 text-slate-600",
            children: "The course focuses on macOS support rather than MDM administration. No prior enterprise Mac administration experience is required, although basic computer knowledge helps."
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-bold",
            children: "Course outcomes"
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-5 space-y-4",
            children: outcomes.map((item) => /* @__PURE__ */ jsxs("li", {
              className: "flex items-start gap-3",
              children: [/* @__PURE__ */ jsx("span", {
                className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700",
                children: "✓"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm leading-6 text-slate-700 sm:text-base",
                children: item
              })]
            }, item))
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-slate-100 bg-slate-50 py-16 sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-6 sm:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-2xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
            children: "Core Skill Areas"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold sm:text-4xl",
            children: "The skills behind effective Mac support"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-7 text-slate-600",
            children: "Build a repeatable approach to investigation, resolution, documentation and escalation."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          children: [{
            number: "01",
            title: "System Administration",
            description: "Users, groups, permissions, storage and macOS recovery."
          }, {
            number: "02",
            title: "Troubleshooting",
            description: "Startup, applications, performance, connectivity and devices."
          }, {
            number: "03",
            title: "Command Line",
            description: "Terminal commands, system logs and diagnostic collection."
          }, {
            number: "04",
            title: "Automation",
            description: "Basic Bash scripting and repeatable support health checks."
          }, {
            number: "05",
            title: "Security Basics",
            description: "FileVault, Gatekeeper, privacy permissions and Keychain."
          }, {
            number: "06",
            title: "IT Service Support",
            description: "Ticket ownership, root-cause analysis and clear escalation."
          }].map((item) => /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700",
              children: item.number
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-5 text-lg font-bold",
              children: item.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm leading-6 text-slate-600",
              children: item.description
            })]
          }, item.number))
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      id: "course-syllabus",
      className: "mx-auto max-w-5xl scroll-mt-24 px-6 py-16 sm:px-8 lg:py-20",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
          children: "12-Week Curriculum"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-3 text-3xl font-bold sm:text-4xl",
          children: "Your learning roadmap"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-slate-600",
          children: "Twelve structured modules progressing from foundational support through diagnostics, scripting and advanced L2 incident handling."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 space-y-3",
        children: modules.map((module) => /* @__PURE__ */ jsxs("details", {
          className: "group overflow-hidden rounded-xl border border-slate-200 bg-white transition open:border-blue-200 open:shadow-sm",
          children: [/* @__PURE__ */ jsxs("summary", {
            className: "flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6",
            children: [/* @__PURE__ */ jsx("span", {
              className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-open:bg-blue-600 group-open:text-white",
              children: module.number
            }), /* @__PURE__ */ jsxs("span", {
              className: "flex-1 text-sm font-bold sm:text-base",
              children: ["Week ", Number(module.number), ": ", module.title]
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xl text-slate-400 transition group-open:rotate-45",
              children: "+"
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "border-t border-slate-100 px-5 pb-6 pt-5 sm:pl-[5.75rem]",
            children: /* @__PURE__ */ jsx("ul", {
              className: "grid gap-3 sm:grid-cols-2",
              children: module.topics.map((topic) => /* @__PURE__ */ jsxs("li", {
                className: "flex items-start gap-3 text-sm leading-6 text-slate-600",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-blue-600",
                  children: "✓"
                }), /* @__PURE__ */ jsx("span", {
                  children: topic
                })]
              }, topic))
            })
          })]
        }, module.number))
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-slate-100 bg-slate-50 py-16 sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-6 sm:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-2xl",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-sm",
            children: "Hands-on Practice"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-3xl font-bold sm:text-4xl",
            children: "Practice real support scenarios"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 leading-7 text-slate-600",
            children: "Every week includes a practical task that reinforces the troubleshooting methods covered in the module."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
          children: labs.map((lab) => /* @__PURE__ */ jsxs("article", {
            className: "rounded-2xl border border-slate-200 bg-white p-5 sm:p-6",
            children: [/* @__PURE__ */ jsxs("p", {
              className: "text-xs font-bold uppercase tracking-wider text-blue-600",
              children: ["Week ", lab.week]
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-lg font-bold",
              children: lab.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm leading-6 text-slate-600",
              children: lab.description
            })]
          }, lab.week))
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950",
          children: [/* @__PURE__ */ jsx("strong", {
            children: "Lab safety:"
          }), " Recovery, reinstall and encryption exercises must use an authorized test device or safely prepared test environment. Verify backups and obtain approval before any destructive operation. Do not experiment on production devices."]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "bg-[#081426] py-16 text-white sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:items-center",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm",
            children: "Career Preparation"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 max-w-xl text-3xl font-bold sm:text-4xl",
            children: "Build a foundation for Mac support roles"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 max-w-xl leading-8 text-slate-300",
            children: "Practice ticket triage, diagnosis, resolution notes and escalation. Learn to explain what you investigated, what you found and why your recommended fix is appropriate."
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-7 flex flex-wrap gap-2",
            children: ["macOS Support Engineer", "Apple Desktop Support", "IT Support L1", "IT Support L2"].map((role) => /* @__PURE__ */ jsx("span", {
              className: "rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 sm:text-sm",
              children: role
            }, role))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "rounded-2xl border border-white/10 bg-white/[0.06] p-6 sm:p-8",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-xl font-bold",
            children: "Course Details"
          }), /* @__PURE__ */ jsx("dl", {
            className: "mt-6 space-y-4",
            children: [["Duration", "12 weeks"], ["Level", "L1 + L2"], ["Format", "Practical learning"], ["Focus", "macOS support only"], ["MDM labs", "Not included"], ["Registration fee", "To be announced"]].map(([label, value]) => /* @__PURE__ */ jsxs("div", {
              className: "flex justify-between gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0",
              children: [/* @__PURE__ */ jsx("dt", {
                className: "text-sm text-slate-400",
                children: label
              }), /* @__PURE__ */ jsx("dd", {
                className: "text-right text-sm font-semibold text-white",
                children: value
              })]
            }, label))
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 text-xs leading-6 text-slate-400",
            children: "A compatible Mac and supported test environment are recommended. Some labs may vary by macOS version and hardware."
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "px-6 py-16 sm:px-8 sm:py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-6xl rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12 sm:py-16",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-100",
          children: "OrhanTech Academy"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mx-auto mt-4 max-w-3xl text-3xl font-bold text-white sm:text-4xl",
          children: "Ready to start your macOS support journey?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-blue-100",
          children: "Develop practical troubleshooting, diagnostic and technical support skills through a structured 12-week learning program."
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 flex flex-wrap justify-center gap-3",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50",
            children: "Create Your Account →"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/login",
            className: "rounded-lg border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10",
            children: "Sign In"
          })]
        })]
      })
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: macosSupport
}, Symbol.toStringTag, { value: "Module" }));
const certifications = ["Apple Certified Engineer", "Jamf 100", "Jamf 170", "Jamf 140", "Jamf 200", "Jamf Engineer", "Jamf Security — Basic & Advanced"];
const expertise = [{
  number: "01",
  title: "Apple Device Management",
  description: "Jamf Pro administration, device enrollment, application deployment, configuration profiles, compliance, and troubleshooting."
}, {
  number: "02",
  title: "Identity & Access",
  description: "Microsoft Entra ID, JumpCloud, authentication, identity integrations, and access management."
}, {
  number: "03",
  title: "Microsoft Intune",
  description: "Endpoint configuration, application deployment, compliance policies, and device administration."
}, {
  number: "04",
  title: "Endpoint Security",
  description: "BeyondTrust, privilege management, security controls, and enterprise endpoint protection."
}, {
  number: "05",
  title: "macOS Support",
  description: "macOS diagnostics, recovery, user permissions, system troubleshooting, and technical support."
}, {
  number: "06",
  title: "Technical Training",
  description: "Practical labs, guided demonstrations, real-world troubleshooting, and career-focused learning."
}];
const companies = [{
  name: "Wipro",
  initials: "W",
  description: "Enterprise technology and IT services experience."
}, {
  name: "HCLTech",
  initials: "HCL",
  description: "Technology services and enterprise IT experience."
}, {
  name: "IBM",
  initials: "IBM",
  description: "Experience in a global technology environment."
}, {
  name: "Team Computers",
  initials: "TC",
  description: "IT services and technology solutions experience."
}];
const aboutMazhar = UNSAFE_withComponentProps(function AboutMazhar() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen overflow-hidden bg-[#07111f] text-white",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative border-b border-white/10",
      children: [/* @__PURE__ */ jsx("div", {
        className: "pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[120px]"
      }), /* @__PURE__ */ jsx("div", {
        className: "pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-28",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsxs("div", {
            className: "inline-flex items-center gap-3 rounded-full border border-blue-300/20 bg-blue-400/[0.08] px-4 py-2",
            children: [/* @__PURE__ */ jsx("span", {
              className: "h-2 w-2 rounded-full bg-cyan-400"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-xs font-semibold uppercase tracking-[0.18em] text-blue-200",
              children: "Instructor & Technology Professional"
            })]
          }), /* @__PURE__ */ jsxs("h1", {
            className: "mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl",
            children: ["Mazhar", /* @__PURE__ */ jsx("span", {
              className: "mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent",
              children: "Husain"
            })]
          }), /* @__PURE__ */ jsxs("h2", {
            className: "mt-7 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl",
            children: ["Apple Certified Engineer", /* @__PURE__ */ jsx("span", {
              className: "mx-2 text-slate-600",
              children: "|"
            }), "Jamf Pro & Endpoint Management"]
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg",
            children: "An IT professional and technical trainer focused on Apple device management, endpoint security, identity platforms, and macOS support. Bringing enterprise technology experience into practical, structured learning for aspiring IT professionals."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-9 flex flex-wrap gap-4",
            children: [/* @__PURE__ */ jsxs(Link, {
              to: "/courses/jamf-pro",
              className: "inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-400",
              children: ["Explore Training", /* @__PURE__ */ jsx("span", {
                className: "ml-2",
                "aria-hidden": "true",
                children: "↗"
              })]
            }), /* @__PURE__ */ jsx(Link, {
              to: "/signup",
              className: "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-200 transition hover:border-blue-300/40 hover:bg-white/[0.07]",
              children: "Register Now"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "border-l-2 border-cyan-400 pl-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-3xl font-bold",
                children: "12+"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-400",
                children: "Years of Experience"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "border-l-2 border-blue-400 pl-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-3xl font-bold",
                children: "700+"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-400",
                children: "Students Trained"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "col-span-2 border-l-2 border-indigo-400 pl-4 sm:col-span-1",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-3xl font-bold",
                children: "4"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-400",
                children: "Organizations"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mx-auto w-full max-w-[440px]",
          children: [/* @__PURE__ */ jsx("div", {
            className: "relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-3 shadow-2xl shadow-black/30",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#101f32]",
              children: [/* @__PURE__ */ jsx("img", {
                src: "/mazhar-husain.webp",
                alt: "Mazhar Husain, Apple Certified Engineer and technical trainer",
                className: "absolute inset-0 h-full w-full object-cover",
                onError: (event) => {
                  event.currentTarget.style.display = "none";
                  const fallback = event.currentTarget.nextElementSibling;
                  if (fallback) fallback.style.display = "flex";
                }
              }), /* @__PURE__ */ jsxs("div", {
                className: "absolute inset-0 hidden flex-col items-center justify-center bg-gradient-to-br from-[#152e49] to-[#07111f] p-8 text-center",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-4xl font-bold text-cyan-200",
                  children: "MH"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-6 text-xl font-semibold",
                  children: "Mazhar Husain"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-2 text-sm text-slate-400",
                  children: "Professional portrait"
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07111f]/90 to-transparent"
              }), /* @__PURE__ */ jsxs("div", {
                className: "absolute bottom-5 left-5 right-5",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-lg font-semibold",
                  children: "Apple & Endpoint Management"
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-1 text-sm text-slate-300",
                  children: "Enterprise IT · Technical Training"
                })]
              })]
            })
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 text-center text-xs tracking-wide text-slate-500",
            children: "ORHANTECH · PROFESSIONAL TRAINING"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
            children: "Professional Profile"
          }), /* @__PURE__ */ jsxs("h2", {
            className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
            children: ["Experience. Expertise.", /* @__PURE__ */ jsx("span", {
              className: "block text-slate-400",
              children: "Practical Learning."
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-7 space-y-5 text-base leading-8 text-slate-300",
            children: [/* @__PURE__ */ jsx("p", {
              children: "Mazhar Husain is an IT professional and technical trainer with 12+ years of experience across enterprise IT and endpoint management technologies. His core technical focus includes Apple device management, Jamf Pro, identity and access management, endpoint security, and macOS support."
            }), /* @__PURE__ */ jsx("p", {
              children: "His technology experience spans Jamf Pro, JumpCloud, Microsoft Entra ID, Microsoft Intune, and BeyondTrust. These areas bring together device administration, deployment workflows, identity integrations, security practices, and technical troubleshooting."
            }), /* @__PURE__ */ jsx("p", {
              children: "As a trainer, Mazhar emphasizes clear explanations, guided demonstrations, practical exercises, and structured lab learning. His objective is to help learners understand not just how a tool works, but also how its capabilities apply to everyday enterprise IT responsibilities."
            })]
          })]
        }), /* @__PURE__ */ jsxs("aside", {
          className: "h-fit rounded-2xl border border-white/10 bg-white/[0.035] p-7 sm:p-8",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.2em] text-cyan-300",
            children: "Professional Snapshot"
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-7 divide-y divide-white/10",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "py-5 first:pt-0",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: "Primary focus"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-2 font-semibold",
                children: "Apple & Endpoint Management"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "py-5",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: "Platforms"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-2 font-semibold",
                children: "Jamf Pro, JumpCloud, Entra ID, Intune"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "py-5",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: "Security"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-2 font-semibold",
                children: "BeyondTrust & Endpoint Security"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "pt-5",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-slate-500",
                children: "Training style"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-2 font-semibold",
                children: "Hands-on, practical, structured"
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-white/10 bg-white/[0.025]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
          children: "Career Journey"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
          children: "Professional Experience"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-5 max-w-3xl leading-8 text-slate-400",
          children: "Professional experience across technology and IT services organizations, contributing to a foundation in enterprise IT, endpoint management, and technical support."
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
          children: companies.map((company) => /* @__PURE__ */ jsxs("article", {
            className: "group rounded-2xl border border-white/10 bg-[#0a1727] p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-300/40",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex h-12 w-12 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/10 text-sm font-bold tracking-wide text-blue-200",
              children: company.initials
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-6 text-xl font-bold",
              children: company.name
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-3 text-sm leading-7 text-slate-400",
              children: company.description
            })]
          }, company.name))
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
        children: "Technical Capabilities"
      }), /* @__PURE__ */ jsx("h2", {
        className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
        children: "Areas of Expertise"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-5 max-w-3xl leading-8 text-slate-400",
        children: "A practical focus on endpoint administration, identity technologies, security concepts, and the support skills needed in enterprise IT."
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: expertise.map((item) => /* @__PURE__ */ jsxs("article", {
          className: "rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.045]",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-bold tracking-widest text-cyan-300",
            children: item.number
          }), /* @__PURE__ */ jsx("h3", {
            className: "mt-5 text-lg font-semibold",
            children: item.title
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-3 text-sm leading-7 text-slate-400",
            children: item.description
          })]
        }, item.number))
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "border-y border-white/10 bg-white/[0.025]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
            children: "Professional Development"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
            children: "Certifications & Credentials"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-5 leading-8 text-slate-400",
            children: "Apple and Jamf-focused professional development across device management, administration, engineering, and security."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid content-start gap-3 sm:grid-cols-2",
          children: certifications.map((certification) => /* @__PURE__ */ jsxs("div", {
            className: "flex items-start gap-3 rounded-xl border border-white/10 bg-[#0a1727] p-4",
            children: [/* @__PURE__ */ jsx("span", {
              className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-xs text-cyan-300",
              children: "✓"
            }), /* @__PURE__ */ jsx("span", {
              className: "text-sm leading-6 text-slate-200",
              children: certification
            })]
          }, certification))
        })]
      })
    }), /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-5xl px-6 py-20 sm:px-10 lg:py-24",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
          children: "Meet Your Instructor"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
          children: "A Personal Introduction"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-5 max-w-2xl leading-8 text-slate-400",
          children: "A short introduction to the instructor and the practical learning approach behind OrhanTech training."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30",
        children: /* @__PURE__ */ jsxs("video", {
          className: "aspect-video w-full object-contain",
          controls: true,
          playsInline: true,
          preload: "metadata",
          poster: "/mazhar-husain.webp",
          children: [/* @__PURE__ */ jsx("source", {
            src: "/mazhar-intro.mp4",
            type: "video/mp4"
          }), "Your browser does not support HTML video."]
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:pb-24",
      children: /* @__PURE__ */ jsxs("div", {
        className: "rounded-3xl border border-blue-300/20 bg-gradient-to-br from-[#102b47] via-[#0b1c30] to-[#091321] p-8 sm:p-12 lg:p-14",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
          children: "Learning Philosophy"
        }), /* @__PURE__ */ jsxs("h2", {
          className: "mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl",
          children: ["Learn the concepts.", /* @__PURE__ */ jsx("span", {
            className: "block text-blue-200",
            children: "Practise the skills. Build confidence."
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-5 max-w-3xl leading-8 text-slate-300",
          children: "Strong technical foundations come from more than theory. Guided practice, configuration exercises, and troubleshooting scenarios help learners connect technical concepts with real workplace situations."
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 flex flex-wrap gap-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/courses/macos-support",
            className: "rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400",
            children: "Explore macOS Support"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/courses/intune-entra",
            className: "rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/[0.06]",
            children: "Explore Intune & Entra"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-t border-white/10 bg-[#050c15]",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-5xl px-6 py-16 text-center sm:py-20",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-xs font-bold uppercase tracking-[0.24em] text-cyan-300",
          children: "Start Learning"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
          children: "Build Your Next IT Skill"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-5 max-w-2xl leading-8 text-slate-400",
          children: "Explore OrhanTech training programs designed to help you develop practical knowledge in endpoint management and macOS support."
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-8 flex flex-wrap justify-center gap-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/courses/jamf-pro",
            className: "rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400",
            children: "Explore Courses"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/signup",
            className: "rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-white/[0.06]",
            children: "Register for Training"
          })]
        })]
      })
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: aboutMazhar
}, Symbol.toStringTag, { value: "Module" }));
const courses$3 = [{
  id: "jamf-pro",
  name: "Jamf Pro Administration & Engineering",
  duration: "2 Months",
  fee: "₹8,000",
  description: "Learn Apple device management, Jamf Pro administration, deployment, security and automation through practical labs.",
  features: ["Jamf Pro administration", "Apple Business Manager and ADE", "Device deployment and automation", "Practical labs and troubleshooting"],
  href: "/courses/jamf-pro"
}, {
  id: "intune-entra",
  name: "Microsoft Intune & Entra ID",
  duration: "Duration to be confirmed",
  fee: "₹8,000",
  description: "Learn identity management, endpoint enrollment, device compliance and security for enterprise environments.",
  features: ["Microsoft Entra ID fundamentals", "Microsoft Intune enrollment", "Configuration and compliance policies", "Mac and Windows lab practice"],
  href: "/courses/intune-entra"
}, {
  id: "macos-support",
  name: "macOS Support Engineering",
  duration: "12 Weeks",
  fee: "₹6,000",
  description: "Build practical macOS support skills in troubleshooting, system administration and endpoint security.",
  features: ["macOS installation and recovery", "Users, groups and permissions", "Terminal and troubleshooting", "macOS security and support"],
  href: "/courses/macos-support"
}];
const registrationFees = UNSAFE_withComponentProps(function RegistrationFees() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-slate-950 text-white",
    children: [/* @__PURE__ */ jsx("section", {
      className: "border-b border-white/10 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-7xl px-6 py-20 text-center sm:py-24",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-bold uppercase tracking-[0.25em] text-blue-400",
          children: "ORHANTECH.IN ACADEMY"
        }), /* @__PURE__ */ jsxs("h1", {
          className: "mt-4 text-4xl font-black tracking-tight sm:text-6xl",
          children: ["Course Registration", /* @__PURE__ */ jsx("span", {
            className: "mt-2 block text-blue-400",
            children: "& Fees"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg",
          children: "Choose your course, explore the training details and register to begin your learning journey."
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-6 py-16 sm:py-20",
      children: /* @__PURE__ */ jsx("div", {
        className: "grid gap-7 lg:grid-cols-3",
        children: courses$3.map((course) => /* @__PURE__ */ jsxs("article", {
          className: "flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl transition hover:-translate-y-1 hover:border-blue-400/50",
          children: [/* @__PURE__ */ jsx("span", {
            className: "w-fit rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300",
            children: "Professional Training"
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-5 text-2xl font-bold leading-snug",
            children: course.name
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 min-h-20 text-sm leading-7 text-slate-300",
            children: course.description
          }), /* @__PURE__ */ jsxs("div", {
            className: "my-7 rounded-2xl border border-white/10 bg-slate-900/80 p-5",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-xs font-semibold uppercase tracking-widest text-slate-400",
              children: "Course Fee"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-4xl font-black text-white",
              children: course.fee
            }), /* @__PURE__ */ jsxs("p", {
              className: "mt-3 text-sm text-slate-400",
              children: ["Duration: ", course.duration]
            })]
          }), /* @__PURE__ */ jsx("h3", {
            className: "text-sm font-bold text-white",
            children: "What you will learn"
          }), /* @__PURE__ */ jsx("ul", {
            className: "mt-4 flex-1 space-y-3",
            children: course.features.map((feature) => /* @__PURE__ */ jsxs("li", {
              className: "flex gap-3 text-sm leading-6 text-slate-300",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-bold text-blue-400",
                children: "✓"
              }), /* @__PURE__ */ jsx("span", {
                children: feature
              })]
            }, feature))
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-8 space-y-3",
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/signup",
              className: "block rounded-xl bg-blue-600 px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-blue-500",
              children: "Register Now"
            }), /* @__PURE__ */ jsx(Link, {
              to: course.href,
              className: "block rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-300",
              children: "View Course Details"
            })]
          })]
        }, course.id))
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "border-t border-white/10 bg-slate-900/60",
      children: /* @__PURE__ */ jsxs("div", {
        className: "mx-auto max-w-4xl px-6 py-16 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold",
          children: "Ready to start learning?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-4 max-w-2xl leading-7 text-slate-300",
          children: "Create your student account to begin the registration process and explore your selected course."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/signup",
          className: "mt-7 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white transition hover:bg-blue-500",
          children: "Create Student Account"
        })]
      })
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: registrationFees
}, Symbol.toStringTag, { value: "Module" }));
const learningResources = [{
  title: "Training Videos",
  description: "Watch topic-wise training sessions and demonstrations.",
  icon: "▶",
  to: "/training-videos"
}, {
  title: "Training PPTs & PDFs",
  description: "Access training presentations, notes, and study materials.",
  icon: "📄",
  to: "/training-materials"
}, {
  title: "Scenario-Based Questions",
  description: "Practice real-world technical scenarios and troubleshooting.",
  icon: "❓",
  to: "/scenario-questions"
}, {
  title: "Lab Practicals",
  description: "Practice hands-on exercises and technical configurations.",
  icon: "🧪",
  to: "/lab-practicals"
}, {
  title: "Interview Preparation",
  description: "Prepare with technical questions and interview practice.",
  icon: "🎯",
  to: "/interview-preparation"
}, {
  title: "My Courses",
  description: "Continue learning with your available training courses.",
  icon: "📚",
  to: "/courses/jamf-pro"
}];
const studentDashboard = UNSAFE_withComponentProps(function StudentDashboard() {
  var _a, _b;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  useEffect(() => {
    let active = true;
    async function checkUser() {
      try {
        const {
          data,
          error: error2
        } = await supabase.auth.getUser();
        if (!active) return;
        if (error2 || !data.user) {
          setUser(null);
          navigate("/login", {
            replace: true
          });
          return;
        }
        setUser(data.user);
      } catch {
        if (!active) return;
        setError("Unable to verify your session. Please sign in again.");
        navigate("/login", {
          replace: true
        });
      } finally {
        if (active) setLoading(false);
      }
    }
    void checkUser();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
        navigate("/login", {
          replace: true
        });
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
      const {
        error: error2
      } = await supabase.auth.signOut();
      if (error2) throw error2;
      navigate("/login", {
        replace: true
      });
    } catch {
      setError("Unable to sign out. Please try again.");
      setLoggingOut(false);
    }
  }
  if (loading || !user) {
    return /* @__PURE__ */ jsx("main", {
      className: "flex min-h-screen items-center justify-center bg-slate-50 px-4",
      children: /* @__PURE__ */ jsx("p", {
        className: "text-sm font-medium text-slate-600",
        children: error || "Verifying your session..."
      })
    });
  }
  const displayName = ((_a = user.user_metadata) == null ? void 0 : _a.full_name) || ((_b = user.user_metadata) == null ? void 0 : _b.name) || user.email || "Student";
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-50 px-4 py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-6xl",
      children: [/* @__PURE__ */ jsxs("header", {
        className: "flex flex-wrap items-center justify-between gap-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
            children: "OrhanTech.in Academy"
          }), /* @__PURE__ */ jsx("h1", {
            className: "mt-2 text-3xl font-bold text-slate-900",
            children: "Student Dashboard"
          }), /* @__PURE__ */ jsxs("p", {
            className: "mt-2 text-slate-600",
            children: ["Welcome, ", displayName]
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-1 break-all text-sm text-slate-500",
            children: user.email
          })]
        }), /* @__PURE__ */ jsx("button", {
          type: "button",
          onClick: handleLogout,
          disabled: loggingOut,
          className: "rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60",
          children: loggingOut ? "Signing out..." : "Sign out"
        })]
      }), error && /* @__PURE__ */ jsx("p", {
        role: "alert",
        className: "mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700",
        children: error
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-10",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-bold text-slate-900",
          children: "Your Learning Resources"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-sm text-slate-600",
          children: "Access your training videos, study materials, practical labs, and interview preparation."
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          children: learningResources.map((resource) => /* @__PURE__ */ jsxs("article", {
            className: "flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl",
              children: resource.icon
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-4 text-lg font-semibold text-slate-900",
              children: resource.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 flex-1 text-sm leading-6 text-slate-600",
              children: resource.description
            }), /* @__PURE__ */ jsxs(Link, {
              to: resource.to,
              className: "mt-5 inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-800",
              children: ["Open Resource", /* @__PURE__ */ jsx("span", {
                className: "ml-2",
                "aria-hidden": "true",
                children: "→"
              })]
            })]
          }, resource.title))
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8 grid gap-5 sm:grid-cols-2",
        children: [/* @__PURE__ */ jsxs("article", {
          className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-lg font-semibold text-slate-900",
            children: "Account Settings"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm text-slate-600",
            children: "Manage your account and change your password."
          }), /* @__PURE__ */ jsx(Link, {
            to: "/student-dashboard/settings",
            className: "mt-4 inline-block font-semibold text-blue-700 hover:underline",
            children: "Manage settings →"
          })]
        }), /* @__PURE__ */ jsxs("article", {
          className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-lg font-semibold text-slate-900",
            children: "Explore More Courses"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm text-slate-600",
            children: "Build your skills in endpoint management and macOS support."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-4 flex flex-wrap gap-x-5 gap-y-2",
            children: [/* @__PURE__ */ jsx(Link, {
              to: "/courses/jamf-pro",
              className: "font-semibold text-blue-700 hover:underline",
              children: "Jamf Pro"
            }), /* @__PURE__ */ jsx(Link, {
              to: "/courses/intune-entra",
              className: "font-semibold text-blue-700 hover:underline",
              children: "Intune & Entra ID"
            }), /* @__PURE__ */ jsx(Link, {
              to: "/courses/macos-support",
              className: "font-semibold text-blue-700 hover:underline",
              children: "macOS Support"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsx("footer", {
        className: "mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500",
        children: "Signed in securely to OrhanTech.in Academy."
      })]
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: studentDashboard
}, Symbol.toStringTag, { value: "Module" }));
const studentSettings = UNSAFE_withComponentProps(function StudentSettings() {
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
      const {
        data,
        error: error2
      } = await supabase.auth.getUser();
      if (!active) return;
      if (error2 || !data.user) {
        navigate("/login", {
          replace: true
        });
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
  async function handleChangePassword(event) {
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
      const {
        data,
        error: userError
      } = await supabase.auth.getUser();
      if (userError || !data.user) {
        throw new Error("Your session has expired. Please sign in again.");
      }
      const {
        error: updateError
      } = await supabase.auth.updateUser({
        password
      });
      if (updateError) throw updateError;
      setPassword("");
      setConfirmPassword("");
      setMessage("Your password has been changed successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  if (checkingSession) {
    return /* @__PURE__ */ jsx("main", {
      className: "flex min-h-screen items-center justify-center bg-slate-50 px-4",
      children: /* @__PURE__ */ jsx("p", {
        className: "text-slate-600",
        children: "Checking your account..."
      })
    });
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-50 px-4 py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-sm font-semibold uppercase tracking-wider text-blue-700",
        children: "OrhanTech.in Academy"
      }), /* @__PURE__ */ jsx("h1", {
        className: "mt-3 text-3xl font-bold text-slate-900",
        children: "Account settings"
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-2 text-slate-600",
        children: "Manage your account security and password."
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8 border-t border-slate-200 pt-6",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold text-slate-900",
          children: "Signed-in account"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-sm text-slate-600",
          children: "Password changes apply to this account:"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-1 break-all font-medium text-slate-900",
          children: email
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8 border-t border-slate-200 pt-6",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold text-slate-900",
          children: "Change password"
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleChangePassword,
          className: "mt-5 space-y-5",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "password",
              className: "mb-1 block text-sm font-medium text-slate-700",
              children: "New password"
            }), /* @__PURE__ */ jsx("input", {
              id: "password",
              type: "password",
              autoComplete: "new-password",
              minLength: 8,
              required: true,
              value: password,
              onChange: (event) => setPassword(event.target.value),
              placeholder: "At least 8 characters",
              className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "confirmPassword",
              className: "mb-1 block text-sm font-medium text-slate-700",
              children: "Confirm new password"
            }), /* @__PURE__ */ jsx("input", {
              id: "confirmPassword",
              type: "password",
              autoComplete: "new-password",
              minLength: 8,
              required: true,
              value: confirmPassword,
              onChange: (event) => setConfirmPassword(event.target.value),
              placeholder: "Enter password again",
              className: "w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            })]
          }), error && /* @__PURE__ */ jsx("p", {
            role: "alert",
            className: "break-words rounded-lg bg-red-50 p-3 text-sm text-red-700",
            children: error
          }), message && /* @__PURE__ */ jsx("p", {
            role: "status",
            className: "rounded-lg bg-green-50 p-3 text-sm text-green-800",
            children: message
          }), /* @__PURE__ */ jsx("button", {
            type: "submit",
            disabled: loading,
            className: "w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60",
            children: loading ? "Updating password..." : "Update password"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-8 flex flex-wrap gap-4 border-t border-slate-200 pt-6 text-sm",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/student-dashboard",
          className: "font-semibold text-blue-700 hover:underline",
          children: "Back to dashboard"
        })
      })]
    })
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: studentSettings
}, Symbol.toStringTag, { value: "Module" }));
const jamfVideos = Array.from({
  length: 16
}, (_, index) => {
  const day = index + 1;
  const knownLinks = {
    1: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1u86-qQyaF8Jn8ewI0pNgfgDGGlSnd0bf/view?usp=drive_link"
    }],
    2: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1yaN1rc8kSr88Cijds67UWwXV8bBDmeoO/view?usp=drive_link"
    }],
    3: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1qjZiR4A_4spSojyV2TDVC_2Dx_1FDr3n/view?usp=drive_link"
    }, {
      title: "Part 2",
      url: "PASTE_JAMF_DAY_3_PART_2_LINK_HERE"
    }],
    4: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1yNsG32XRFa_ax_DpWHyiCXwYyp6e6aij/view?usp=drive_link"
    }, {
      title: "Part 2",
      url: "PASTE_JAMF_DAY_4_PART_2_LINK_HERE"
    }, {
      title: "Part 3",
      url: "PASTE_JAMF_DAY_4_PART_3_LINK_HERE"
    }],
    5: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1tD8d56Dl2lHxtm2Q2h4lMjzoKRy3ZOjP/view?usp=drive_link"
    }, {
      title: "Part 2",
      url: "PASTE_JAMF_DAY_5_PART_2_LINK_HERE"
    }],
    6: [{
      title: "Part 1",
      url: "https://drive.google.com/file/d/1BWsYH6DbhXNqccouTfwHi67AV54u6paw/view?usp=drive_link"
    }]
  };
  return {
    day,
    title: `Jamf Pro Administration Day ${day}`,
    description: `Jamf Pro Administration Day ${day}`,
    videos: knownLinks[day] ?? [{
      title: "Part 1",
      url: `PASTE_JAMF_DAY_${day}_LINK_HERE`
    }]
  };
});
const macSupportVideos = Array.from({
  length: 12
}, (_, index) => {
  const day = index + 1;
  return {
    day,
    title: `macOS Support Engineering Day ${day}`,
    description: `macOS Support Engineering Day ${day}`,
    videos: [{
      title: "Part 1",
      url: `PASTE_MAC_DAY_${day}_PART_1_LINK_HERE`
    }, {
      title: "Part 2",
      url: `PASTE_MAC_DAY_${day}_PART_2_LINK_HERE`
    }]
  };
});
const intuneVideos = Array.from({
  length: 16
}, (_, index) => {
  const day = index + 1;
  return {
    day,
    title: `Microsoft Intune & Entra ID Day ${day}`,
    description: `Microsoft Intune & Entra ID Day ${day}`,
    videos: [{
      title: "Part 1",
      url: `PASTE_INTUNE_DAY_${day}_PART_1_LINK_HERE`
    }, {
      title: "Part 2",
      url: `PASTE_INTUNE_DAY_${day}_PART_2_LINK_HERE`
    }]
  };
});
const trainingVideos = UNSAFE_withComponentProps(function TrainingVideos() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("jamf");
  const courseDetails2 = {
    jamf: {
      name: "Jamf Pro Administration",
      subtitle: "16 Training Days",
      videos: jamfVideos
    },
    mac: {
      name: "macOS Support Engineering",
      subtitle: "12 Training Days",
      videos: macSupportVideos
    },
    intune: {
      name: "Microsoft Intune & Entra ID",
      subtitle: "16 Training Days",
      videos: intuneVideos
    }
  };
  const currentCourse = courseDetails2[selectedCourse];
  const filteredVideos = currentCourse.videos.filter((video) => video.title.toLowerCase().includes(search.trim().toLowerCase()));
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsxs(Link, {
        to: "/student-dashboard",
        className: "mb-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-white",
        children: [/* @__PURE__ */ jsx("span", {
          "aria-hidden": "true",
          children: "←"
        }), "Back to Student Dashboard"]
      }), /* @__PURE__ */ jsxs("section", {
        className: "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 p-6 shadow-2xl sm:p-10",
        children: [/* @__PURE__ */ jsx("div", {
          className: "pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
        }), /* @__PURE__ */ jsxs("div", {
          className: "relative",
          children: [/* @__PURE__ */ jsx("p", {
            className: "mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300",
            children: "OrhanTech.in Academy"
          }), /* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-extrabold tracking-tight sm:text-5xl",
            children: "Training Video Library"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base",
            children: "Access your training videos and learn at your own pace."
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-7 grid gap-3 sm:grid-cols-3",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "rounded-2xl border border-white/10 bg-white/5 p-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-cyan-300",
                children: "16 Days"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-300",
                children: "Jamf Pro Administration"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "rounded-2xl border border-white/10 bg-white/5 p-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-cyan-300",
                children: "12 Days"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-300",
                children: "macOS Support Engineering"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "rounded-2xl border border-white/10 bg-white/5 p-4",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-2xl font-bold text-cyan-300",
                children: "16 Days"
              }), /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-slate-300",
                children: "Microsoft Intune & Entra ID"
              })]
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "mb-4 text-xl font-bold sm:text-2xl",
          children: "Select Your Training"
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid gap-4 md:grid-cols-3",
          children: [/* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => {
              setSelectedCourse("jamf");
              setSearch("");
            },
            "aria-pressed": selectedCourse === "jamf",
            className: `rounded-2xl border p-5 text-left transition ${selectedCourse === "jamf" ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40" : "border-white/10 bg-slate-900 hover:border-cyan-400/50"}`,
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-2xl",
              "aria-hidden": "true",
              children: "🍎"
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-lg font-bold",
              children: "Jamf Pro Administration"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm text-slate-400",
              children: "Access all 16 training days."
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-xs font-semibold text-cyan-300",
              children: "16 TRAINING DAYS"
            })]
          }), /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => {
              setSelectedCourse("mac");
              setSearch("");
            },
            "aria-pressed": selectedCourse === "mac",
            className: `rounded-2xl border p-5 text-left transition ${selectedCourse === "mac" ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40" : "border-white/10 bg-slate-900 hover:border-cyan-400/50"}`,
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-2xl",
              "aria-hidden": "true",
              children: "💻"
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-lg font-bold",
              children: "macOS Support Engineering"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm text-slate-400",
              children: "Access all 12 training days."
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-xs font-semibold text-cyan-300",
              children: "12 DAYS • 2 PARTS PER DAY"
            })]
          }), /* @__PURE__ */ jsxs("button", {
            type: "button",
            onClick: () => {
              setSelectedCourse("intune");
              setSearch("");
            },
            "aria-pressed": selectedCourse === "intune",
            className: `rounded-2xl border p-5 text-left transition ${selectedCourse === "intune" ? "border-cyan-400 bg-cyan-400/10 ring-1 ring-cyan-400/40" : "border-white/10 bg-slate-900 hover:border-cyan-400/50"}`,
            children: [/* @__PURE__ */ jsx("span", {
              className: "text-2xl",
              "aria-hidden": "true",
              children: "☁️"
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-lg font-bold",
              children: "Microsoft Intune & Entra ID"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm text-slate-400",
              children: "Access all 16 training days."
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-xs font-semibold text-cyan-300",
              children: "16 DAYS • 2 PARTS PER DAY"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-sm font-medium text-cyan-300",
              children: "CURRENT TRAINING"
            }), /* @__PURE__ */ jsx("h2", {
              className: "mt-1 text-2xl font-bold sm:text-3xl",
              children: currentCourse.name
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-2 text-sm text-slate-400",
              children: currentCourse.subtitle
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "w-full sm:max-w-sm",
            children: [/* @__PURE__ */ jsx("label", {
              htmlFor: "video-search",
              className: "mb-2 block text-sm font-medium text-slate-300",
              children: "Search by day"
            }), /* @__PURE__ */ jsx("input", {
              id: "video-search",
              type: "search",
              value: search,
              onChange: (event) => setSearch(event.target.value),
              placeholder: "Search Day 1, Day 2...",
              className: "w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3",
          children: filteredVideos.map((video) => /* @__PURE__ */ jsxs("article", {
            className: "flex flex-col rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-lg transition hover:border-cyan-400/40",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between gap-3",
              children: [/* @__PURE__ */ jsxs("span", {
                className: "rounded-lg bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300",
                children: ["DAY ", video.day]
              }), /* @__PURE__ */ jsxs("span", {
                className: "text-xs text-slate-500",
                children: [video.videos.length, " ", video.videos.length === 1 ? "video" : "parts"]
              })]
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-4 text-lg font-bold leading-7",
              children: video.title
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-5 space-y-3",
              children: video.videos.map((part) => {
                const isPlaceholder = part.url.startsWith("PASTE_");
                return /* @__PURE__ */ jsxs("a", {
                  href: isPlaceholder ? void 0 : part.url,
                  target: isPlaceholder ? void 0 : "_blank",
                  rel: isPlaceholder ? void 0 : "noreferrer",
                  "aria-disabled": isPlaceholder,
                  onClick: (event) => {
                    if (isPlaceholder) {
                      event.preventDefault();
                    }
                  },
                  className: `flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${isPlaceholder ? "cursor-not-allowed border-white/5 bg-slate-800/60 text-slate-500" : "border-cyan-400/20 bg-cyan-400/10 text-cyan-200 hover:border-cyan-400 hover:bg-cyan-400/20"}`,
                  children: [/* @__PURE__ */ jsx("span", {
                    children: isPlaceholder ? `${part.title} • Link pending` : `Watch ${part.title}`
                  }), /* @__PURE__ */ jsx("span", {
                    "aria-hidden": "true",
                    children: isPlaceholder ? "🔒" : "↗"
                  })]
                }, `${video.day}-${part.title}`);
              })
            })]
          }, `${selectedCourse}-${video.day}`))
        }), filteredVideos.length === 0 && /* @__PURE__ */ jsxs("div", {
          className: "mt-6 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center",
          children: [/* @__PURE__ */ jsx("p", {
            className: "text-lg font-semibold",
            children: "No training days found"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm text-slate-400",
            children: "Try another day number."
          }), /* @__PURE__ */ jsx("button", {
            type: "button",
            onClick: () => setSearch(""),
            className: "mt-5 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300",
            children: "Clear Search"
          })]
        })]
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 sm:p-6",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-lg font-bold text-amber-200",
          children: "Video Access Information"
        }), /* @__PURE__ */ jsx("ul", {
          className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300",
          children: /* @__PURE__ */ jsx("li", {
            children: "Make sure Google Drive sharing permissions allow students to view the videos."
          })
        })]
      }), /* @__PURE__ */ jsxs("footer", {
        className: "mt-10 border-t border-white/10 pt-6 text-center",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-semibold text-slate-300",
          children: "OrhanTech.in Academy"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-xs text-slate-500",
          children: "Learn • Practice • Build Your Career"
        })]
      })]
    })
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: trainingVideos
}, Symbol.toStringTag, { value: "Module" }));
const courses$2 = [{
  id: "jamf",
  name: "Jamf Pro Administration",
  description: "Jamf Pro deployment guides, presentations, and practical documentation.",
  materials: [{
    title: "Setup VPP with Jamf Pro — Purchase Apps in ABM and Deploy via Jamf Pro",
    type: "PPTX",
    url: "https://docs.google.com/presentation/d/1lG2UE2PZd-VLTIGGjAJAZO3weN9lMcQQ/edit?usp=drive_link&ouid=107931186589372194324&rtpof=true&sd=true"
  }, {
    title: "macOS Onboarding",
    type: "PDF",
    url: "https://drive.google.com/file/d/1zF7zdSiJ8HK3Dr2OlN8LS3gXnRUgc0Fy/view?usp=drive_link"
  }]
}, {
  id: "intune",
  name: "Microsoft Entra ID & Intune",
  description: "Entra ID, Intune configuration, device management, and integration materials.",
  materials: [{
    title: "App Protection Policy (MAM) – iOS BYOD",
    type: "PDF",
    url: "https://drive.google.com/file/d/1QCi0gSAiiCeLF3zZsFlYKg6AqYm5PAY3/view?usp=sharing"
  }, {
    title: "Windows Autopilot user-driven Microsoft Entra join",
    type: "PDF",
    url: "https://drive.google.com/file/d/1ufJtLAyUIqTUL4n-0t2K0hWNuIoHJPjT/view?usp=sharing"
  }]
}, {
  id: "macos",
  name: "macOS Support Engineering",
  description: "macOS troubleshooting, user support, administration, and practical guides.",
  materials: []
}];
const trainingMaterials = UNSAFE_withComponentProps(function TrainingMaterials() {
  const [activeCourse, setActiveCourse] = useState("jamf");
  const selectedCourse = courses$2.find((course) => course.id === activeCourse) ?? courses$2[0];
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "mx-auto max-w-7xl",
      children: [/* @__PURE__ */ jsx(Link, {
        to: "/student-dashboard",
        className: "text-sm text-cyan-400 transition hover:text-cyan-300",
        children: "← Back to Student Dashboard"
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-8",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400",
          children: "OrhanTech.in Academy"
        }), /* @__PURE__ */ jsx("h1", {
          className: "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
          children: "Training PPTs & PDFs"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-3 max-w-2xl text-slate-400",
          children: "Access course presentations, study materials, and practical documentation in one place."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "mt-8 grid gap-4 md:grid-cols-3",
        children: courses$2.map((course, index) => /* @__PURE__ */ jsxs("button", {
          type: "button",
          onClick: () => setActiveCourse(course.id),
          "aria-pressed": activeCourse === course.id,
          className: `rounded-2xl border p-5 text-left transition ${activeCourse === course.id ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"}`,
          children: [/* @__PURE__ */ jsxs("span", {
            className: "text-xs font-semibold uppercase tracking-wider text-cyan-400",
            children: ["Course ", String(index + 1).padStart(2, "0")]
          }), /* @__PURE__ */ jsx("h2", {
            className: "mt-3 text-lg font-bold",
            children: course.name
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm leading-6 text-slate-400",
            children: course.description
          }), /* @__PURE__ */ jsxs("p", {
            className: "mt-4 text-xs text-slate-500",
            children: [course.materials.length, " materials"]
          })]
        }, course.id))
      }), /* @__PURE__ */ jsxs("section", {
        className: "mt-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-3",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold",
            children: selectedCourse.name
          }), /* @__PURE__ */ jsxs("span", {
            className: "rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300",
            children: [selectedCourse.materials.length, " materials available"]
          })]
        }), selectedCourse.materials.length > 0 ? /* @__PURE__ */ jsx("div", {
          className: "mt-5 grid gap-4 md:grid-cols-2",
          children: selectedCourse.materials.map((material) => /* @__PURE__ */ jsx("article", {
            className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-4",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-xs font-bold text-cyan-300",
                children: material.type
              }), /* @__PURE__ */ jsxs("div", {
                className: "min-w-0 flex-1",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-semibold leading-6",
                  children: material.title
                }), /* @__PURE__ */ jsx("p", {
                  className: "mt-2 text-sm text-slate-400",
                  children: material.type === "PDF" ? "PDF document" : "PowerPoint presentation"
                }), /* @__PURE__ */ jsxs("a", {
                  href: material.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300",
                  children: ["Open ", material.type, " ↗"]
                })]
              })]
            })
          }, material.title))
        }) : /* @__PURE__ */ jsxs("div", {
          className: "mt-5 rounded-2xl border border-dashed border-white/15 p-8 text-center",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "font-semibold",
            children: "Study materials coming soon"
          }), /* @__PURE__ */ jsx("p", {
            className: "mt-2 text-sm text-slate-400",
            children: "New presentations and PDF documents will appear here when published."
          })]
        })]
      }), /* @__PURE__ */ jsx("p", {
        className: "mt-10 text-center text-sm text-slate-500",
        children: "OrhanTech.in Academy · Learn, Practice, and Grow"
      })]
    })
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: trainingMaterials
}, Symbol.toStringTag, { value: "Module" }));
const courses = [{
  title: "Jamf Pro Administration",
  description: "Learn Apple device management, enrollment, configuration profiles, policies, application deployment, and automation.",
  icon: Laptop,
  category: "Apple Device Management",
  href: "/courses/jamf-pro",
  topics: ["Jamf Pro fundamentals", "Device enrollment and management", "Policies and configuration profiles", "Application deployment and automation"]
}, {
  title: "Microsoft Intune & Entra ID",
  description: "Explore identity management, endpoint configuration, device compliance, and Microsoft device management integration.",
  icon: ShieldCheck,
  category: "Identity & Endpoint Management",
  href: "/courses/intune-entra",
  topics: ["Microsoft Entra ID fundamentals", "Device enrollment", "Configuration and compliance policies", "Endpoint management concepts"]
}, {
  title: "macOS Support Engineering",
  description: "Build practical macOS support skills, troubleshoot common issues, and learn Mac administration fundamentals.",
  icon: Settings,
  category: "Apple Technical Support",
  href: "/courses/macos-support",
  topics: ["macOS installation and recovery", "Users and groups", "Troubleshooting and diagnostics", "Mac administration fundamentals"]
}];
const courses$1 = UNSAFE_withComponentProps(function CoursesPage() {
  return /* @__PURE__ */ jsxs("main", {
    className: "min-h-screen bg-slate-950 text-white",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "relative overflow-hidden border-b border-white/10",
      children: [/* @__PURE__ */ jsx("div", {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-indigo-500/10"
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-24",
        children: [/* @__PURE__ */ jsxs("span", {
          className: "inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300",
          children: [/* @__PURE__ */ jsx(BookOpen, {
            size: 16
          }), "OrhanTech.in Training Programs"]
        }), /* @__PURE__ */ jsxs("h1", {
          className: "mx-auto mt-6 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl",
          children: ["Build Your Skills.", /* @__PURE__ */ jsx("span", {
            className: "mt-2 block text-blue-400",
            children: "Advance Your IT Career."
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg",
          children: "Explore practical training programs in Apple device management, Microsoft endpoint management, and macOS support. Choose a course to explore its syllabus."
        })]
      })]
    }), /* @__PURE__ */ jsxs("section", {
      className: "mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-10",
        children: [/* @__PURE__ */ jsx("p", {
          className: "text-sm font-semibold uppercase tracking-[0.2em] text-blue-400",
          children: "Explore Programs"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-3 text-2xl font-bold sm:text-3xl",
          children: "Our Training Courses"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base",
          children: "Select a training program to view its syllabus and course details."
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
        children: courses.map((course) => {
          const Icon = course.icon;
          return /* @__PURE__ */ jsxs("article", {
            className: "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.05] sm:p-7",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex size-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400",
              children: /* @__PURE__ */ jsx(Icon, {
                size: 24
              })
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-6 text-xs font-semibold uppercase tracking-wider text-blue-300",
              children: course.category
            }), /* @__PURE__ */ jsx("h3", {
              className: "mt-3 text-xl font-bold leading-snug text-white",
              children: course.title
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-sm leading-7 text-slate-400",
              children: course.description
            }), /* @__PURE__ */ jsxs("div", {
              className: "mt-6",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "text-sm font-semibold text-slate-200",
                children: "What you will explore"
              }), /* @__PURE__ */ jsx("ul", {
                className: "mt-4 space-y-3",
                children: course.topics.map((topic) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start gap-3 text-sm leading-6 text-slate-400",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "mt-2 size-1.5 shrink-0 rounded-full bg-blue-400"
                  }), /* @__PURE__ */ jsx("span", {
                    children: topic
                  })]
                }, topic))
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "mt-auto pt-8",
              children: /* @__PURE__ */ jsxs(Link, {
                to: course.href,
                className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500",
                children: ["View Syllabus", /* @__PURE__ */ jsx(ArrowRight, {
                  size: 16,
                  className: "transition-transform group-hover:translate-x-1"
                })]
              })
            })]
          }, course.href);
        })
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10",
      children: /* @__PURE__ */ jsxs("div", {
        className: "rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/15 to-indigo-500/10 p-7 text-center sm:p-10",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold",
          children: "Ready to Start Learning?"
        }), /* @__PURE__ */ jsx("p", {
          className: "mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base",
          children: "Explore our training programs and review the course details to find the right learning path for you."
        }), /* @__PURE__ */ jsxs(Link, {
          to: "/registration-fees",
          className: "mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/20",
          children: ["View Registration Fees", /* @__PURE__ */ jsx(ArrowRight, {
            size: 16
          })]
        })]
      })
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: courses$1
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D0ByPpAY.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/index-CvMDjR7o.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BbadFtv2.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/index-CvMDjR7o.js", "/assets/createLucideIcon-yOcm5fGU.js", "/assets/tslib.es6-CmEaCU22.js", "/assets/mail-CaIFyQat.js"], "css": ["/assets/root-Bg8K16Y-.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-sGeU5jKh.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/createLucideIcon-yOcm5fGU.js", "/assets/mail-CaIFyQat.js", "/assets/shield-check-CemPh2kA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-Dn_VmICB.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DyfSO5pL.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/forgot-password": { "id": "routes/forgot-password", "parentId": "root", "path": "forgot-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/forgot-password-CFtq6HqB.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/reset-password": { "id": "routes/reset-password", "parentId": "root", "path": "reset-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/reset-password-BNh7h7OZ.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/jamf-pro": { "id": "routes/jamf-pro", "parentId": "root", "path": "courses/jamf-pro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/jamf-pro-icismpwM.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/Intune": { "id": "routes/Intune", "parentId": "root", "path": "courses/intune-entra", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Intune-C-dcnCj7.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/macos-support": { "id": "routes/macos-support", "parentId": "root", "path": "courses/macos-support", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/macos-support-DaxgXSxg.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about-mazhar": { "id": "routes/about-mazhar", "parentId": "root", "path": "about-mazhar", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-mazhar-L-GCHvrq.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/registration-fees": { "id": "routes/registration-fees", "parentId": "root", "path": "registration-fees", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/registration-fees-DBpa87Qy.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/student-dashboard": { "id": "routes/student-dashboard", "parentId": "root", "path": "student-dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/student-dashboard-Cq7lRyKx.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/student-settings": { "id": "routes/student-settings", "parentId": "root", "path": "student-dashboard/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/student-settings-DBJRHVmZ.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/training-videos": { "id": "routes/training-videos", "parentId": "root", "path": "training-videos", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/training-videos-BcPns_Yv.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/training-materials": { "id": "routes/training-materials", "parentId": "root", "path": "training-materials", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/training-materials-CqdwUaaa.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/courses": { "id": "routes/courses", "parentId": "root", "path": "courses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/courses-DCx0DC4F.js", "imports": ["/assets/chunk-NL6KNZEE-Ud7HUdt1.js", "/assets/createLucideIcon-yOcm5fGU.js", "/assets/shield-check-CemPh2kA.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-d257b8bb.js", "version": "d257b8bb", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/forgot-password": {
    id: "routes/forgot-password",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/reset-password": {
    id: "routes/reset-password",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/jamf-pro": {
    id: "routes/jamf-pro",
    parentId: "root",
    path: "courses/jamf-pro",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/Intune": {
    id: "routes/Intune",
    parentId: "root",
    path: "courses/intune-entra",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/macos-support": {
    id: "routes/macos-support",
    parentId: "root",
    path: "courses/macos-support",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/about-mazhar": {
    id: "routes/about-mazhar",
    parentId: "root",
    path: "about-mazhar",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/registration-fees": {
    id: "routes/registration-fees",
    parentId: "root",
    path: "registration-fees",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/student-dashboard": {
    id: "routes/student-dashboard",
    parentId: "root",
    path: "student-dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/student-settings": {
    id: "routes/student-settings",
    parentId: "root",
    path: "student-dashboard/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/training-videos": {
    id: "routes/training-videos",
    parentId: "root",
    path: "training-videos",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/training-materials": {
    id: "routes/training-materials",
    parentId: "root",
    path: "training-materials",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/courses": {
    id: "routes/courses",
    parentId: "root",
    path: "courses",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  }
};
const build = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
}, Symbol.toStringTag, { value: "Module" }));
const _virtual_netlifyServer = createRequestHandler({
  build,
  getLoadContext: async (_req, ctx) => ctx
});
export {
  _virtual_netlifyServer as default
};
