import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import SocialMediaBar from "./components/SocialMediaBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import TrackOrder from "./pages/TrackOrder";
import Contact from "./pages/Contact";
import DeveloperPanel from "./pages/DeveloperPanel";
import ProductReviews from "./pages/ProductReviews";
import RecentlyViewed from "./pages/RecentlyViewed";
import Wishlist from "./pages/Wishlist";
import DeltaStarsAI from "./pages/DeltaStarsAI";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VIPCustomers from "./pages/VIPCustomers";
import Showroom from "./pages/Showroom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/products"} component={Products} />
      <Route path={"/track"} component={TrackOrder} />
      <Route path={"/contact"} component={Contact} />
      <Route path="/developer" component={DeveloperPanel} />
      <Route path="/reviews" component={ProductReviews} />
      <Route path="/recently-viewed" component={RecentlyViewed} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/ai" component={DeltaStarsAI} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/vip-customers" component={VIPCustomers} />
      <Route path="/showroom" component={Showroom} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsConditions} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <SocialMediaBar />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
