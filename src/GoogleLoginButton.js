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
        : "https://trial-ncz4.vercel.app"; // 👈 replace with your actual deployed domain if needed

    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" }, // plain text token
        body: idToken,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("App JWT:", data.token);

        // 💾 Optionally store the JWT in localStorage or cookie
        localStorage.setItem("app_token", data.token);

        alert("Signed in successfully!");
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Error from server: " + errorText);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error while signing in.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed")}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
