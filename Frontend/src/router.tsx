import { createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth";
import { MobileBottomNav } from "@/components/Navbar";

// Lazy-load page components
import HomePage from "./routes/index";
import DashboardPage from "./routes/dashboard";
import ChatPage from "./routes/chat";
import TimelinePage from "./routes/timeline";
import RegistrationPage from "./routes/registration";
import ResultsPage from "./routes/results";
import FaqPage from "./routes/faq";
import QuizPage from "./routes/quiz";
import ProfilePage from "./routes/profile";
import NotificationsPage from "./routes/notifications";
import AdminPage from "./routes/admin";

// ---------- Not Found ----------
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------- Root Route ----------
const rootRoute = createRootRoute({
  component: function RootComponent() {
    return (
      <AuthProvider>
        <Outlet />
        <MobileBottomNav />
      </AuthProvider>
    );
  },
  notFoundComponent: NotFoundComponent,
});

// ---------- Page Routes ----------
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatPage,
});

const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: TimelinePage,
});

const registrationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/registration",
  component: RegistrationPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: ResultsPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: FaqPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: QuizPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: NotificationsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

// ---------- Route Tree ----------
const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  chatRoute,
  timelineRoute,
  registrationRoute,
  resultsRoute,
  faqRoute,
  quizRoute,
  profileRoute,
  notificationsRoute,
  adminRoute,
]);

// ---------- Router ----------
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

// Type registration for TanStack Router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
