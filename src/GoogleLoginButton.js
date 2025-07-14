import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "433398797157-i4d0scs7n5qvkut4q9ru7b7i3v2dsaj1.apps.googleusercontent.com";

function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log("Google ID Token:", idToken);

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://backend-git-main-shrutimovaliya24-gmailcoms-projects.vercel.app";

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/webhook`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: idToken,
      });

      if (res.ok) {
        alert(" Webhook sent successfully!");
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert(" Error from server: " + errorText);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(" Network error while sending webhook.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert(" Google Login Failed")}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
