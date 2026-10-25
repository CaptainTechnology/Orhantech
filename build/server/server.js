import { createRequestHandler } from "@netlify/vite-plugin-react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon, XIcon, MenuIcon, ArrowUpRight, Send, CheckCircle2, MessageCircle, Mail, ArrowRight, Monitor, ShieldCheck, Laptop, Cloud, Code2, ClipboardCheck, Settings, Wrench, GraduationCap } from "lucide-react";
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
    title: "Teachers",
    link: "#teachers",
    menu: [
      {
        title: "Mazhar Husain",
        link: "#mazhar-husain"
      },
      {
        title: "Mohd Anees",
        link: "#mohd-anees"
      }
    ]
  },
  {
    title: "Registration Fee",
    link: "/registration-fees",
    menu: [
      {
        title: "Jamf Pro — Registration Fee",
        link: "/registration-fees#jamf-pro"
      },
      {
        title: "Intune & Entra ID — Registration Fee",
        link: "/registration-fees#intune-entra"
      },
      {
        title: "macOS Support — Registration Fee",
        link: "/registration-fees#macos-support"
      }
    ]
  },
  {
    title: "Contact",
    link: "#contact"
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
              return /* @__PURE__ */ jsx(SheetClose, { asChild: true, children: /* @__PURE__ */ jsx(
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
        return /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
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
      name: "Facebook",
      link: "https://facebook.com",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { d: "M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z" }) })
    },
    {
      name: "WhatsApp",
      link: "https://whatsapp.com",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { d: "M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6.1-3.5-8.3ZM12.1 21.6c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.9 1 1-3.8-.3-.4a9.7 9.7 0 0 1-1.5-5.1c0-5.3 4.3-9.6 9.6-9.6 2.6 0 5 1 6.8 2.8a9.6 9.6 0 0 1 2.8 6.8c0 5.4-4.2 9.8-9.5 9.8Zm5.3-7.2c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.3-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" }) })
    },
    {
      name: "X",
      link: "https://x.com",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "size-4", children: /* @__PURE__ */ jsx("path", { d: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.4 6.8L18.9 2Zm-1.1 18h1.7L7.7 3.9H5.9L17.8 20Z" }) })
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
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "uni-padding-t md:pt-[calc(var(--uni-padding-value)*3)]! bg-signature bg-gradient-to-tl!", children: [
    /* @__PURE__ */ jsxs("div", { className: "maximus grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsx("div", { className: "grid xl:justify-center max-sm:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "prose max-w-full text-white!", children: [
          /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-background", children: "Explore a transformative approach to skill development on our online learning platform." })
        ] }),
        /* @__PURE__ */ jsx(SocialIcons, {})
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid xl:justify-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "prose max-w-full prose-headings:text-white", children: /* @__PURE__ */ jsx("h3", { children: "Company" }) }),
        /* @__PURE__ */ jsxs("ul", { className: "text-background space-y-1 md:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "About Us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Services" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Community" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Testimonials" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid xl:justify-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "prose max-w-full prose-headings:text-white", children: /* @__PURE__ */ jsx("h3", { children: "Support" }) }),
        /* @__PURE__ */ jsxs("ul", { className: "text-background space-y-1 md:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Help Center" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Tweet @ us" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Webinars" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Feedback" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid xl:justify-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "prose max-w-full prose-headings:text-white", children: /* @__PURE__ */ jsx("h3", { children: "Links" }) }),
        /* @__PURE__ */ jsxs("ul", { className: "text-background space-y-1 md:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Courses" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Become Instructor" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "Service" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "hover:text-white duration-100 text-sm", to: "#", children: "All in One" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid xl:justify-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 md:space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "prose max-w-full prose-headings:text-white", children: /* @__PURE__ */ jsx("h3", { children: "Contact Us" }) }),
        /* @__PURE__ */ jsxs("ul", { className: "text-background space-y-1 md:space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              className: "hover:text-white duration-100 text-sm",
              href: "tel:+918433602364",
              children: "+918433602364"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              className: "hover:text-white duration-100 text-sm break-all",
              href: "mailto:Mazhar.Husain@orhantech.in",
              children: "Mazhar.Husain@orhantech.in"
            }
          ) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Separator, { className: "maximus bg-gradient-to-r from-transparent via-muted to-transparent mt-6" }),
    /* @__PURE__ */ jsx("div", { className: "text-center text-xs py-4 text-background", children: "Copyright © 2023 Etech. All rights reserved." })
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
const courses = [{
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
          children: courses.map((course, index) => /* @__PURE__ */ jsxs("article", {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const {
        error: error2
      } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (error2) throw error2;
      setMessage("Login successful! Your account is authenticated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
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
const modules = [{
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
}, {
  label: "Registration Fee",
  value: "To be announced"
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
          children: modules.map((module) => /* @__PURE__ */ jsxs("article", {
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jamfPro
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D6Fmo-ja.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js", "/assets/index-CiEKX3IK.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-hbLhFOV4.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js", "/assets/index-CiEKX3IK.js", "/assets/createLucideIcon-Cxd4QwKp.js", "/assets/tslib.es6-CmEaCU22.js"], "css": ["/assets/root-LEPIAXh8.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-fztziUYJ.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js", "/assets/createLucideIcon-Cxd4QwKp.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-D1coDvFy.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-BIe3SyrP.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js", "/assets/supabase-BSDBsoaR.js", "/assets/tslib.es6-CmEaCU22.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/jamf-pro": { "id": "routes/jamf-pro", "parentId": "root", "path": "courses/jamf-pro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/jamf-pro-lO5HwRYF.js", "imports": ["/assets/chunk-NL6KNZEE-CYY4kYrP.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-f489909e.js", "version": "f489909e", "sri": void 0 };
const assetsBuildDirectory = "build/client";
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
  "routes/jamf-pro": {
    id: "routes/jamf-pro",
    parentId: "root",
    path: "courses/jamf-pro",
    index: void 0,
    caseSensitive: void 0,
    module: route4
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
