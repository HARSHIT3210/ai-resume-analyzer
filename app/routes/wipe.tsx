import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { Button } from "~/components/ui/button";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <main className="bg-[url('/images/abstract-envelope.svg')] bg-cover ">
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen p-4">
        Authenticated as: {auth.user?.username}
        <div>Existing files:</div>
        <div className="flex flex-col gap-4">
          {!files ? (
            <h1>No Files in the history</h1>
          ) : (
            files.map((file) => (
              <div key={file.id} className="flex flex-row gap-4">
                <p>{file.name}</p>
              </div>
            ))
          )}
        </div>
        <div>
          <Button
            className="w-full bg-green-400 border border-green-800 cursor-pointer hover:bg-green-500 font-semibold text-gray-900 text-lg"
            onClick={() => handleDelete()}
          >
            Wipe App Data
          </Button>
        </div>
      </div>
    </main>
  );
};

export default WipeApp;
