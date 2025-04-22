import { decodeJwt } from "jose"

export interface AuthResponse {
  token?: string
  error?: string
}

export interface TokenUser {
  id: number
  email: string
  name?: string
  role: string
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return await authService._authRequest("login", { email, password })
  },

  async register(email: string, password: string, role: string = "USER"): Promise<AuthResponse> {
    return await authService._authRequest("register", { email, password, role })
  },

  logout() {
    document.cookie = "currentUser=; path=/; max-age=0"
  },

  getToken(): string | null {
    if (typeof document === "undefined") return null
    const match = document.cookie.match(/(^| )currentUser=([^;]+)/)
    return match?.[2] || null
  },

  getCurrentUser(): TokenUser | null {
    const token = authService.getToken()
    if (!token) return null
    try {
      return decodeJwt(token) as TokenUser
    } catch {
      return null
    }
  },

  async _authRequest(
    endpoint: "login" | "register",
    payload: Record<string, any>
  ): Promise<AuthResponse> {
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const error = await res.text()
      return { error }
    }

    const { token } = await res.json()
    if (token) {
      // 💥 кука вместо localStorage
      document.cookie = `currentUser=${token}; path=/; max-age=3600`
      return { token }
    }

    return { error: "No token in response" }
  },
}
