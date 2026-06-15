import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-a1939573`;

interface Application {
  id: string;
  robloxUsername: string;
  discordUsername: string;
  age: string;
  kills: string;
  experience: string;
  playtime: string;
  mainCharacter: string;
  whyJoin: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

export default function Applications() {
  const { t } = useLanguage();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = () => {
    const currentUser = localStorage.getItem("userProfile");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      if (user.rank === "leader" || user.rank === "coowner") {
        setHasAccess(true);
        loadApplications();
        return;
      }
    }
    setIsLoading(false);
  };

  const loadApplications = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const res = await fetch(`${SERVER_URL}/applications`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Server error");
      }
      const apps = await res.json();
      setApplications(apps);
    } catch (e: any) {
      console.error("Load applications error:", e);
      setFetchError(e.message || "Ошибка загрузки заявок");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (appId: string) => {
    try {
      await fetch(`${SERVER_URL}/applications/${appId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: "accepted" as const } : app))
      );
      setSelectedApp(null);
    } catch (e) {
      console.error("Accept error:", e);
    }
  };

  const handleReject = async (appId: string) => {
    try {
      await fetch(`${SERVER_URL}/applications/${appId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status: "rejected" }),
      });
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status: "rejected" as const } : app))
      );
      setSelectedApp(null);
    } catch (e) {
      console.error("Reject error:", e);
    }
  };

  const handleDelete = async (appId: string) => {
    try {
      await fetch(`${SERVER_URL}/applications/${appId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      setApplications((prev) => prev.filter((app) => app.id !== appId));
      if (selectedApp?.id === appId) setSelectedApp(null);
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="text-white text-xl">{t("applications.loading")}</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-3xl p-12">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("applications.access.denied")}
            </h2>
            <p className="text-xl text-gray-300">{t("applications.access.message")}</p>
          </div>
        </div>
      </div>
    );
  }

  const pendingApps = applications.filter((app) => app.status === "pending");
  const acceptedApps = applications.filter((app) => app.status === "accepted");
  const rejectedApps = applications.filter((app) => app.status === "rejected");

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">{t("applications.title")}</h1>
          <p className="text-xl text-gray-300">{t("applications.subtitle")}</p>
          <button
            onClick={loadApplications}
            className="mt-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Обновить
          </button>
        </div>

        {fetchError && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {fetchError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-900/20 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <Clock className="w-12 h-12 text-yellow-400" />
              <div>
                <div className="text-4xl font-bold text-white">{pendingApps.length}</div>
                <div className="text-gray-300">{t("applications.pending")}</div>
              </div>
            </div>
          </div>
          <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
              <div>
                <div className="text-4xl font-bold text-white">{acceptedApps.length}</div>
                <div className="text-gray-300">{t("applications.accepted")}</div>
              </div>
            </div>
          </div>
          <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <XCircle className="w-12 h-12 text-red-400" />
              <div>
                <div className="text-4xl font-bold text-white">{rejectedApps.length}</div>
                <div className="text-gray-300">{t("applications.rejected")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 max-h-[800px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{t("applications.list")}</h2>
            {applications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">{t("applications.empty")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedApp?.id === app.id
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-white/5 border-purple-500/30 hover:border-purple-500/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-bold">{app.robloxUsername}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : app.status === "accepted"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {t(`applications.status.${app.status}`)}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm space-y-1">
                      <div>Discord: {app.discordUsername}</div>
                      <div>{t("apply.kills")}: {app.kills}</div>
                      <div>
                        {t("applications.submitted")}:{" "}
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">{t("applications.details")}</h2>
            {selectedApp ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-4 text-2xl">{selectedApp.robloxUsername}</h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      selectedApp.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : selectedApp.status === "accepted"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {t(`applications.status.${selectedApp.status}`)}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">{t("apply.discord")}</label>
                    <p className="text-white">{selectedApp.discordUsername}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm">{t("apply.age")}</label>
                      <p className="text-white">{selectedApp.age}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">{t("apply.kills")}</label>
                      <p className="text-white">{selectedApp.kills}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">{t("apply.experience")}</label>
                    <p className="text-white">{t(`apply.experience.${selectedApp.experience}`)}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">{t("apply.playtime")}</label>
                    <p className="text-white">{selectedApp.playtime}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">{t("apply.mainChar")}</label>
                    <p className="text-white">{selectedApp.mainCharacter}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">{t("apply.whyJoin")}</label>
                    <p className="text-white whitespace-pre-wrap">{selectedApp.whyJoin}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">{t("applications.submitted")}</label>
                    <p className="text-white">{new Date(selectedApp.submittedAt).toLocaleString()}</p>
                  </div>
                </div>
                {selectedApp.status === "pending" && (
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => handleAccept(selectedApp.id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {t("applications.accept")}
                    </button>
                    <button
                      onClick={() => handleReject(selectedApp.id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      {t("applications.reject")}
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleDelete(selectedApp.id)}
                  className="w-full px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  {t("applications.delete")}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">{t("applications.select")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
