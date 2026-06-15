import { useState, useEffect } from "react";
import { User, Gamepad2, Clock, Trophy, Edit2, Save, Crown, Shield, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type RankType = "leader" | "coleader" | "coowner" | "moderator" | "admin" | "member";

interface ProfileData {
  robloxUsername: string;
  discordUsername: string;
  kills: string;
  mainCharacter: string;
  playtime: string;
  bio: string;
  status: "member" | "applicant";
  memberSince: string;
  rank: RankType;
}

export default function Profile() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [formData, setFormData] = useState<ProfileData>({
    robloxUsername: "",
    discordUsername: "",
    kills: "",
    mainCharacter: "",
    playtime: "",
    bio: "",
    status: "applicant",
    memberSince: new Date().toLocaleDateString(),
    rank: "member",
  });

  // Пароль для лидера и со-лидера (в реальном приложении должен быть на сервере)
  const ADMIN_PASSWORD = "URClan2024";

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setFormData(parsedProfile);
    }
  }, []);

  const handleAdminUnlock = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminUnlocked(true);
      setAdminPassword("");
    } else {
      alert("Неверный пароль!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData = {
      ...formData,
      memberSince: profile?.memberSince || new Date().toLocaleDateString(),
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setProfile(profileData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRankIcon = (rank: RankType) => {
    switch (rank) {
      case "leader":
        return <Crown className="w-5 h-5" />;
      case "coleader":
        return <Star className="w-5 h-5" />;
      case "coowner":
        return <Crown className="w-5 h-5" />;
      case "moderator":
        return <Shield className="w-5 h-5" />;
      case "admin":
        return <Shield className="w-5 h-5" />;
      case "member":
        return <User className="w-5 h-5" />;
    }
  };

  const getRankColor = (rank: RankType) => {
    switch (rank) {
      case "leader":
        return "from-yellow-500 to-orange-500";
      case "coleader":
        return "from-purple-500 to-pink-500";
      case "coowner":
        return "from-orange-500 to-red-500";
      case "moderator":
        return "from-blue-500 to-cyan-500";
      case "admin":
        return "from-green-500 to-emerald-500";
      case "member":
        return "from-gray-500 to-gray-600";
    }
  };

  if (!profile && !isEditing) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("profile.create.title")}
            </h1>
            <p className="text-xl text-gray-300">
              {t("profile.create.subtitle")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-white mb-2">
                {t("profile.roblox")} *
              </label>
              <input
                type="text"
                name="robloxUsername"
                value={formData.robloxUsername}
                onChange={handleChange}
                placeholder={t("profile.roblox.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.discord")} *
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder={t("profile.discord.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.kills")} *
              </label>
              <input
                type="text"
                name="kills"
                value={formData.kills}
                onChange={handleChange}
                placeholder={t("profile.kills.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.mainChar")} *
              </label>
              <input
                type="text"
                name="mainCharacter"
                value={formData.mainCharacter}
                onChange={handleChange}
                placeholder={t("profile.mainChar.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.playtime")} *
              </label>
              <input
                type="text"
                name="playtime"
                value={formData.playtime}
                onChange={handleChange}
                placeholder={t("profile.playtime.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Admin Section for Rank Selection */}
            <div className="border-t border-purple-500/30 pt-6">
              <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                {t("profile.admin.title")}
              </h3>
              
              {!isAdminUnlocked ? (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    {t("profile.admin.locked")}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder={t("profile.admin.password.placeholder")}
                      className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleAdminUnlock}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Crown className="w-4 h-4" />
                      {t("profile.admin.unlock")}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-white mb-2">
                    {t("profile.rank")} *
                  </label>
                  <select
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="member">{t("profile.rank.member")}</option>
                    <option value="admin">{t("profile.rank.admin")}</option>
                    <option value="moderator">{t("profile.rank.moderator")}</option>
                    <option value="coleader">{t("profile.rank.coleader")}</option>
                    <option value="coowner">{t("profile.rank.coowner")}</option>
                    <option value="leader">{t("profile.rank.leader")}</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">{t("profile.bio")}</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder={t("profile.bio.placeholder")}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {t("profile.save")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              {t("profile.edit")}
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 space-y-6"
          >
            <div>
              <label className="block text-white mb-2">
                {t("profile.roblox")} *
              </label>
              <input
                type="text"
                name="robloxUsername"
                value={formData.robloxUsername}
                onChange={handleChange}
                placeholder={t("profile.roblox.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.discord")} *
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder={t("profile.discord.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.kills")} *
              </label>
              <input
                type="text"
                name="kills"
                value={formData.kills}
                onChange={handleChange}
                placeholder={t("profile.kills.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.mainChar")} *
              </label>
              <input
                type="text"
                name="mainCharacter"
                value={formData.mainCharacter}
                onChange={handleChange}
                placeholder={t("profile.mainChar.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                {t("profile.playtime")} *
              </label>
              <input
                type="text"
                name="playtime"
                value={formData.playtime}
                onChange={handleChange}
                placeholder={t("profile.playtime.placeholder")}
                required
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Admin Section for Rank Selection */}
            <div className="border-t border-purple-500/30 pt-6">
              <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                {t("profile.admin.title")}
              </h3>
              
              {!isAdminUnlocked ? (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    {t("profile.admin.locked")}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder={t("profile.admin.password.placeholder")}
                      className="flex-1 px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleAdminUnlock}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <Crown className="w-4 h-4" />
                      {t("profile.admin.unlock")}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-white mb-2">
                    {t("profile.rank")} *
                  </label>
                  <select
                    name="rank"
                    value={formData.rank}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="member">{t("profile.rank.member")}</option>
                    <option value="admin">{t("profile.rank.admin")}</option>
                    <option value="moderator">{t("profile.rank.moderator")}</option>
                    <option value="coleader">{t("profile.rank.coleader")}</option>
                    <option value="coowner">{t("profile.rank.coowner")}</option>
                    <option value="leader">{t("profile.rank.leader")}</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">{t("profile.bio")}</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder={t("profile.bio.placeholder")}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(profile!);
                }}
                className="flex-1 py-4 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {t("profile.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {profile.robloxUsername}
                </h1>
                <div className={`px-4 py-1 bg-gradient-to-r ${getRankColor(profile.rank)} rounded-full flex items-center gap-2 text-white text-sm font-bold`}>
                  {getRankIcon(profile.rank)}
                  {t(`profile.rank.${profile.rank}`)}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 text-gray-300">
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <User className="w-4 h-4" />
                  {profile.discordUsername}
                </span>
                <span className="flex items-center gap-2 justify-center md:justify-start">
                  <Trophy className="w-4 h-4" />
                  {t("profile.status")}: {profile.status === "member" 
                    ? t("profile.status.member") 
                    : t("profile.status.applicant")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-white/10 border border-purple-500/30 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              {t("profile.edit")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Section */}
          <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              {t("profile.stats.title")}
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">
                  {t("profile.kills")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {profile.kills}
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">
                  {t("profile.mainChar")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {profile.mainCharacter}
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-1">
                  {t("profile.playtime")}
                </div>
                <div className="text-2xl font-bold text-white">
                  {profile.playtime}
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-pink-400" />
              {t("profile.info.title")}
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">
                  {t("profile.member.since")}
                </div>
                <div className="text-lg text-white">{profile.memberSince}</div>
              </div>
              {profile.bio && (
                <div>
                  <div className="text-gray-400 text-sm mb-2">
                    {t("profile.bio")}
                  </div>
                  <div className="text-white bg-white/5 rounded-lg p-4">
                    {profile.bio}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}