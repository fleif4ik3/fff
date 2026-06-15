import { Shield, Target, Users, Trophy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            {t("about.title")} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">UR</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* История */}
        <section className="mb-16 bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6">{t("about.history.title")}</h2>
          <div className="text-gray-300 space-y-4">
            <p>{t("about.history.p1")}</p>
            <p>{t("about.history.p2")}</p>
            <p>{t("about.history.p3")}</p>
          </div>
        </section>

        {/* Ценности */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t("about.values")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-transparent backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t("about.value1.title")}</h3>
              <p className="text-gray-300">{t("about.value1.desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-transparent backdrop-blur-md border border-pink-500/30 rounded-2xl p-8">
              <div className="bg-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t("about.value2.title")}</h3>
              <p className="text-gray-300">{t("about.value2.desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-transparent backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
              <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t("about.value3.title")}</h3>
              <p className="text-gray-300">{t("about.value3.desc")}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/40 to-transparent backdrop-blur-md border border-pink-500/30 rounded-2xl p-8">
              <div className="bg-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t("about.value4.title")}</h3>
              <p className="text-gray-300">{t("about.value4.desc")}</p>
            </div>
          </div>
        </section>

        {/* Достижения */}
        <section className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t("about.achievements")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🏅</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t("about.achievement1.title")}</h4>
                <p>{t("about.achievement1.desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">⭐</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t("about.achievement2.title")}</h4>
                <p>{t("about.achievement2.desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">🎖️</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t("about.achievement3.title")}</h4>
                <p>{t("about.achievement3.desc")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-2xl">🔥</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t("about.achievement4.title")}</h4>
                <p>{t("about.achievement4.desc")}</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
