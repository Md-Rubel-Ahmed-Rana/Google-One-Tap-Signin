import { useEffect } from "react";

export default function GoogleOneTap() {
  useEffect(() => {
    const initializeOneTap = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response) => {
          console.log("Received credential:", response.credential);
          const res = await fetch("/api/auth/one-tap-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ credential: response.credential }),
          });

          const user = await res.json();
          localStorage.setItem("user", JSON.stringify(user));
          window.location.reload();
        },
        auto_select: true,
        cancel_on_tap_outside: false,
      });

      window.google.accounts.id.prompt();
    };

    if (window.google) {
      initializeOneTap();
      console.log("Inside window.google");
    } else {
      window.addEventListener("DOMContentLoaded", initializeOneTap);
      console.log("Inside DOMContentLoaded");
    }
  }, []);

  return (
    <script src="https://accounts.google.com/gsi/client" async defer></script>
  );
}
