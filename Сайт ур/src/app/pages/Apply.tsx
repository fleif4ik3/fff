import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a1939573`;

export default function Apply() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    robloxUsername: "",
    discordUsername: "",
    age: "",
    kills: "",
    experience: "",
    playtime: "",
    mainCharacter: "",
    whyJoin: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${SERVER_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Server error");
      }
      setSubmitted(true);
    } catch (e: any) {
      console.error("Submit error:", e);
      setError(e.message || "Ошибка при отправке заявки");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-3xl p-12">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("apply.success.title")}
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {t("apply.success.desc")}
            </p>
            <p className="text-gray-400">{t("apply.success.note")}</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  robloxUsername: "",
                  discordUsername: "",
                  age: "",
                  kills: "",
                  experience: "",
                  playtime: "",
                  mainCharacter: "",
                  whyJoin: "",
                });
              }}
              className="mt-8 px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
            >
              {t("apply.success.again")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">{t("apply.title")}</h1>
          <p className="text-xl text-gray-300">{t("apply.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 md:p-10">
            <div className="mb-6">
              <label htmlFor="robloxUsername" className="block text-white font-bold mb-2">
                {t("apply.roblox")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="robloxUsername"
                name="robloxUsername"
                value={formData.robloxUsername}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.roblox.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="discordUsername" className="block text-white font-bold mb-2">
                {t("apply.discord")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="discordUsername"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.discord.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="age" className="block text-white font-bold mb-2">
                {t("apply.age")} <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="13"
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.age.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="kills" className="block text-white font-bold mb-2">
                {t("apply.kills")} <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                id="kills"
                name="kills"
                value={formData.kills}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.kills.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="experience" className="block text-white font-bold mb-2">
                {t("apply.experience")} <span className="text-red-400">*</span>
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="" className="bg-slate-800">{t("apply.experience.select")}</option>
                <option value="newbie" className="bg-slate-800">{t("apply.experience.newbie")}</option>
                <option value="beginner" className="bg-slate-800">{t("apply.experience.beginner")}</option>
                <option value="intermediate" className="bg-slate-800">{t("apply.experience.intermediate")}</option>
                <option value="advanced" className="bg-slate-800">{t("apply.experience.advanced")}</option>
                <option value="expert" className="bg-slate-800">{t("apply.experience.expert")}</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="playtime" className="block text-white font-bold mb-2">
                {t("apply.playtime")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="playtime"
                name="playtime"
                value={formData.playtime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.playtime.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="mainCharacter" className="block text-white font-bold mb-2">
                {t("apply.mainChar")} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="mainCharacter"
                name="mainCharacter"
                value={formData.mainCharacter}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t("apply.mainChar.placeholder")}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="whyJoin" className="block text-white font-bold mb-2">
                {t("apply.whyJoin")} <span className="text-red-400">*</span>
              </label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                placeholder={t("apply.whyJoin.placeholder")}
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
              {loading ? "Отправка..." : t("apply.submit")}
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-900/20 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            {t("apply.info")}
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>{t("apply.info1")}</li>
            <li>{t("apply.info2")}</li>
            <li>{t("apply.info3")}</li>
            <li>{t("apply.info4")}</li>
            <li>{t("apply.info5")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
