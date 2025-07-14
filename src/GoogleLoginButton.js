import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "433398797157-i4d0scs7n5qvkut4q9ru7b7i3v2dsaj1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID

function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    console.log("Google ID Token:", credentialResponse.credential); // <-- Add this line
    // credentialResponse.credential is the Google ID token (JWT)
    const idToken = credentialResponse.credential;

    // Send to backend
    // const res = await fetch("http://localhost:3000/webhook", {
    //   method: "POST",
    //   headers: { "Content-Type": "text/plain" },
    //   body: idToken,
    // });
    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://backend-git-main-shrutimovaliya24-gmailcoms-projects.vercel.app";
    const res = await fetch(`${API_URL}/webhook`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: idToken,
    });
    if (res.ok) {
      alert("Webhook sent successfully!");
    } else {
      alert("Error sending webhook");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          alert("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
