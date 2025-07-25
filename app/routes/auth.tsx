import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resulyzer | Auth" },
  { name: "description", content: "Login or register to Resulyzer" },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 p-10 bg-[#d44949] rounded-2xl">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Login to continue your job journey</h2>
          </div>
          <div>
            {isLoading ? (
              <Button className=" bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-[320px] md:w-[420px] h-12 animate-pulse">
                <p>Signing you in.....</p>
              </Button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <Button
                    className=" bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-[320px] md:w-[420px] h-12 animate-pulse"
                    onClick={auth.signOut}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    className=" bg-[#ffd900] text-gray-800 text-xs hover:bg-yellow-400 border-amber-400 w-[320px] md:w-[420px] h-12 animate-pulse"
                    onClick={auth.signIn}
                  >
                    Login
                  </Button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
