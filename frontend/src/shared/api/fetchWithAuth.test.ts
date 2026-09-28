import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchWithAuth } from "./fetchClient";

describe("fetchWithAuth", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();

    delete (window as unknown as { location?: Location }).location;
    window.location = { ...originalLocation, href: "" } as Location;
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.unstubAllGlobals();
  });

  it("should refresh token on 401, update localStorage, and retry the request", async () => {
    // 1. Arrange: подготовка начальных токенов в localStorage
    localStorage.setItem("access_token", "expired_access_123");
    localStorage.setItem("refresh_token", "valid_refresh_456");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // Вызов 1: Первый запрос с истекшим токеном возвращает 401
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ detail: "Token expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    );

    // Вызов 2: Запрос к /api/v1/auth/refresh возвращает новые токены
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          access_token: "new_access_789",
          refresh_token: "new_refresh_999",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    // Вызов 3: Повторный запрос с обновленным токеном успешен
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: "user_profile" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    // 2. Act: выполняем защищенный запрос
    const response = await fetchWithAuth("/api/v1/users/me");
    const data = await response.json();

    // 3. Assert: проверки
    expect(fetchMock).toHaveBeenCalledTimes(3);

    // Проверяем первый запрос с истекшим токеном
    const firstCallHeaders = fetchMock.mock.calls[0][1]?.headers as Headers;
    expect(firstCallHeaders.get("Authorization")).toBe(
      "Bearer expired_access_123",
    );

    // Проверяем запрос на обновление токена
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/v1/auth/refresh",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ refresh_token: "valid_refresh_456" }),
      }),
    );

    // Проверяем, что в localStorage сохранились новые токены
    expect(localStorage.getItem("access_token")).toBe("new_access_789");
    expect(localStorage.getItem("refresh_token")).toBe("new_refresh_999");

    // Проверяем повторный запрос с новым токеном
    const retriedCallHeaders = fetchMock.mock.calls[2][1]?.headers as Headers;
    expect(retriedCallHeaders.get("Authorization")).toBe(
      "Bearer new_access_789",
    );

    // Проверяем финальный успешный ответ
    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, data: "user_profile" });
  });

  it("should clear localStorage and redirect to / if refresh token request fails", async () => {
    localStorage.setItem("access_token", "expired_access_123");
    localStorage.setItem("refresh_token", "invalid_refresh_456");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    // Исходный запрос: 401
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));

    // Запрос на рефреш тоже возвращает ошибку (например, 400 или 401)
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ detail: "Invalid refresh token" }), {
        status: 401,
      }),
    );

    await fetchWithAuth("/api/v1/users/me");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem("access_token")).toBeNull();
    expect(localStorage.getItem("refresh_token")).toBeNull();
    expect(window.location.href).toBe("/");
  });

  it("should clear access_token and redirect to / immediately if no refresh token exists", async () => {
    localStorage.setItem("access_token", "expired_access_123");
    // refresh_token намеренно не задаем

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));

    await fetchWithAuth("/api/v1/users/me");

    // Запрос на рефреш не должен вызываться
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("access_token")).toBeNull();
    expect(window.location.href).toBe("/");
  });
});
