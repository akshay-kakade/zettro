import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const PASSWORD_KEY = "wipe_app_password";
const REMEMBER_KEY = "wipe_app_remember";
const ACCESS_PASSWORD = "Maverick"; // 👈 change this to your desired password

const WipeApp = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [remember, setRemember] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    const storedPassword = localStorage.getItem(PASSWORD_KEY);
    const remembered = localStorage.getItem(REMEMBER_KEY);
    if (storedPassword === ACCESS_PASSWORD && remembered === "true") {
      setAuthenticated(true);
      loadFiles();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  const handleAuth = async () => {
    if (password === ACCESS_PASSWORD) {
      setAuthenticated(true);
      if (remember) {
        localStorage.setItem(PASSWORD_KEY, password);
        localStorage.setItem(REMEMBER_KEY, "true");
      }
      await loadFiles();
    } else {
      alert("Wrong password");
    }
  };

  const handleDelete = async (filePath: string) => {
    setLoading(true);
    await fs.delete(filePath);
    await kv.delete(`resume:${filePath.split("/").pop()?.split(".")[0]}`);
    await loadFiles();
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    setLoading(true);
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    await loadFiles();
    setLoading(false);
  };

  if (isLoading) return <div className="p-10 text-center">Loading auth...</div>;

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
  <div className="w-full max-w-md bg-gray-300 p-10 rounded-3xl shadow-xl border border-gray-700">
    <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
      Admin Access
    </h1>

    <input
      type="password"
      className="w-full mb-5 px-4 py-3 rounded-lg text-black  border border-gray-700 
                 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8E97C5] transition"
      placeholder="Enter Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <label className="flex items-center text-sm gap-2 mb-6 select-none">
      <input
        type="checkbox"
        className="h-10 w-10"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />
      Remember me
    </label>

    <button
      onClick={handleAuth}
      className="w-full py-3 rounded-lg font-semibold text-lg transition-transform duration-200
                 bg-clip-text text-transparent bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5]
                 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(139,139,139,0.4)] border border-red-400 cursor-pointer"
    >
      Unlock Admin Panel
    </button>
  </div>
</div>

    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧹 Wipe App Data</h1>

        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600">
            Authenticated as: <strong>{auth.user?.username}</strong>
          </div>
          <button
            className="bg-red-400 cursor-pointer hover:bg-red-800 text-white px-4 py-2 rounded transition-all disabled:opacity-50"
            onClick={handleDeleteAll}
            disabled={loading}
          >
            {loading ? "Deleting All..." : "Delete All Resumes"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file) => (
            <div
              key={file.path}
              className="flex justify-between items-center p-4 rounded-lg shadow bg-white hover:shadow-lg transition"
            >
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">{file.path}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WipeApp;
