import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";

export default function Requirements() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            {t("req.title")}
          </h1>
          <p className="text-xl text-gray-300">
            {t("req.subtitle")}
          </p>
        </div>

        {/* Обязательные требования */}
        <section className="mb-12">
          <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h2 className="text-3xl font-bold text-white">
                {t("req.mandatory")}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.mandatory1.title")}</h3>
                  <p className="text-gray-300">{t("req.mandatory1.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.mandatory2.title")}</h3>
                  <p className="text-gray-300">{t("req.mandatory2.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.mandatory3.title")}</h3>
                  <p className="text-gray-300">{t("req.mandatory3.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.mandatory4.title")}</h3>
                  <p className="text-gray-300">{t("req.mandatory4.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.mandatory5.title")}</h3>
                  <p className="text-gray-300">{t("req.mandatory5.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Желательные навыки */}
        <section className="mb-12">
          <div className="bg-blue-900/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">
                {t("req.desired")}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">+</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.desired1.title")}</h3>
                  <p className="text-gray-300">{t("req.desired1.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">+</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.desired2.title")}</h3>
                  <p className="text-gray-300">{t("req.desired2.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">+</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.desired3.title")}</h3>
                  <p className="text-gray-300">{t("req.desired3.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Запрещено */}
        <section className="mb-12">
          <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="w-8 h-8 text-red-400" />
              <h2 className="text-3xl font-bold text-white">
                {t("req.forbidden")}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✕</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.forbidden1.title")}</h3>
                  <p className="text-gray-300">{t("req.forbidden1.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✕</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.forbidden2.title")}</h3>
                  <p className="text-gray-300">{t("req.forbidden2.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✕</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.forbidden3.title")}</h3>
                  <p className="text-gray-300">{t("req.forbidden3.desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✕</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{t("req.forbidden4.title")}</h3>
                  <p className="text-gray-300">{t("req.forbidden4.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Процесс отбора */}
        <section className="mb-12">
          <div className="bg-purple-900/20 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("req.process")}
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{t("req.process1.title")}</h3>
                  <p className="text-gray-300">{t("req.process1.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{t("req.process2.title")}</h3>
                  <p className="text-gray-300">{t("req.process2.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{t("req.process3.title")}</h3>
                  <p className="text-gray-300">{t("req.process3.desc")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2">{t("req.process4.title")}</h3>
                  <p className="text-gray-300">{t("req.process4.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-6">
            {t("req.cta")}
          </p>
          <Link
            to="/apply"
            className="inline-block px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg rounded-xl hover:scale-105 transition-transform"
          >
            {t("nav.apply")}
          </Link>
        </div>
      </div>
    </div>
  );
}
