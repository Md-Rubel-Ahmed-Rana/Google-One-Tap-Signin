/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState<null | {
    name: string;
    email: string;
    picture: string;
  }>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  console.log(user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {user?.email ? (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome</h1>
          <div className="flex flex-col items-center">
            <img
              src={user?.picture}
              alt={user?.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full mb-4 shadow-md"
            />
            <p className="text-lg font-semibold">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              className="bg-blue-600 mt-2 cursor-pointer px-2 py-1 rounded-md text-white"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-gray-500">No user signed in yet.</p>
      )}
    </div>
  );
};

export default UserInfo;
