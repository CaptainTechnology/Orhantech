
import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),

  route("forgot-password", "routes/forgot-password.tsx"),
  route("reset-password", "routes/reset-password.tsx"),

  route("courses/jamf-pro", "routes/jamf-pro.tsx"),
  route("courses/intune-entra", "routes/Intune.tsx"),
  route("courses/macos-support", "routes/macos-support.tsx"),

  route("about-mazhar", "routes/about-mazhar.tsx"),
  route("registration-fees", "routes/registration-fees.tsx"),

  route("student-dashboard", "routes/student-dashboard.tsx"),
  route(
    "student-dashboard/settings",
    "routes/student-settings.tsx"
  ),
  route("training-videos", "routes/training-videos.tsx"),
  route("training-materials", "routes/training-materials.tsx"),
  route("courses", "routes/courses.tsx"),
] satisfies RouteConfig;
