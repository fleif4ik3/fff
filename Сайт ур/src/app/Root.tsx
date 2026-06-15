import { Outlet } from "react-router";
import Navigation from "./components/Navigation";
import { LanguageProvider } from "./context/LanguageContext";

export default function Root() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <Outlet />
      </div>
    </LanguageProvider>
  );
}