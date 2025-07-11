import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import logo from "./logo.svg";
import "./App.css";
import { jwtDecode } from "jwt-decode";

function App() {
  const [loginStatus, setLoginStatus] = React.useState(null);
  const [user, setUser] = React.useState(null);
  // Remove auto-login from localStorage/sessionStorage

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    setLoginStatus(null);
  };

  return (
    <GoogleOAuthProvider clientId="433398797157-i4d0scs7n5qvkut4q9ru7b7i3v2dsaj1.apps.googleusercontent.com">
      <div className="google-login-container">
        {loginStatus === 'success' && user ? (
          <div className="google-login-card">
            <h1 className="google-login-title">Welcome, {user.name || 'User'}!</h1>
            {(
              <img
                src={user.picture ? user.picture : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`}
                alt="Profile"
                style={{ borderRadius: '50%', width: 80, height: 80, margin: '16px 0' }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`;
                }}
              />
            )}
            <p className="google-login-subtitle">You have successfully signed in with Google.</p>
            <button onClick={handleLogout} style={{marginTop: 24, padding: '10px 24px', borderRadius: 8, border: 'none', background: '#4285F4', color: '#fff', fontWeight: 600, cursor: 'pointer'}}>Logout</button>
          </div>
        ) : (
          <div className="google-login-card">
            <h1 className="google-login-title">Welcome Back</h1>
            <p className="google-login-subtitle">Sign in to continue to your account</p>
            <div className="google-login-button">
              <GoogleLogin
                onSuccess={CredentialResponse => {
                  var CredentialResponseDecoded = jwtDecode(CredentialResponse.credential);
                  console.log(CredentialResponseDecoded);
                  // localStorage (persists until cleared)
                  localStorage.setItem('user', JSON.stringify(CredentialResponseDecoded));
                  // sessionStorage (persists until tab closes)
                  sessionStorage.setItem('user', JSON.stringify(CredentialResponseDecoded));
                  // Save the raw Google ID token as well
                  localStorage.setItem('google_id_token', CredentialResponse.credential);
                  sessionStorage.setItem('google_id_token', CredentialResponse.credential);
                  setUser(CredentialResponseDecoded);
                  setLoginStatus('success');
                }}
                onError={() => {
                  console.log("Login Failed");
                  setLoginStatus('error');
                }}
              />
            </div>
            {loginStatus === 'error' && (
              <div className="login-error">
                ❌ Login failed. Please try again.
              </div>
            )}
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  )
}

export default App;
