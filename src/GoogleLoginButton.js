import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "433398797157-i4d0scs7n5qvkut4q9ru7b7i3v2dsaj1.apps.googleusercontent.com"; // your real client ID

function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse) => {
    console.log("Google response:", credentialResponse);

    const idToken = credentialResponse?.credential;
    if (!idToken) {
      return alert("Login failed: No token returned");
    }

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5001"
        : "https://backend-lemon-omega-65.vercel.app"; // update this if deployed

    try {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ App JWT:", data.token);

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
      <div id="googleBtn">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => alert("Google Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
