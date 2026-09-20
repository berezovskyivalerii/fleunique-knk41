export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem("access_token");

  const headers = new Headers(options.headers || {});

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      try {
        const refreshResponse = await fetch("/api/v1/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();

          localStorage.setItem("access_token", data.access_token);
          if (data.refresh_token) {
            localStorage.setItem("refresh_token", data.refresh_token);
          }

          headers.set("Authorization", `Bearer ${data.access_token}`);
          response = await fetch(url, { ...options, headers });
        } else {
          throw new Error("Refresh token expired");
        }
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
      }
    } else {
      localStorage.removeItem("access_token");
      window.location.href = "/";
    }
  }

  return response;
}
