import { Link } from "react-router";
import { Sword, Users, Trophy, Zap, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  const stats = [
    { icon: Users, label: t("home.stats.members"), value: "200+" },
    { icon: Trophy, label: t("home.stats.raids"), value: "100+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mb-6 inline-block animate-pulse">
                <Sword className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {t("home.welcome")}{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                UR
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {t("home.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                to="/apply"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
              >
                {t("home.apply")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/requirements"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-purple-500/50"
              >
                {t("home.requirements")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 text-center hover:bg-white/10 transition-all hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            {t("home.whyUs")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("home.feature1.title")}
              </h3>
              <p className="text-gray-300">
                {t("home.feature1.desc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("home.feature2.title")}
              </h3>
              <p className="text-gray-300">
                {t("home.feature2.desc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("home.feature3.title")}
              </h3>
              <p className="text-gray-300">
                {t("home.feature3.desc")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("home.feature4.title")}
              </h3>
              <p className="text-gray-300">
                {t("home.feature4.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t("home.cta.desc")}
            </p>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg rounded-xl hover:scale-105 transition-transform"
            >
              {t("home.cta.button")}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}