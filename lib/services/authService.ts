import { decodeJwt } from "jose"

const API_URL = "/api"

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
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const error = await res.text()
      return { error }
    }

    const { token } = await res.json()
    if (token) {
      localStorage.setItem("jwt", token)
      return { token }
    }

    return { error: "No token in response" }
  },

  async register(email: string, password: string, role: string = "USER"): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    })

    if (!res.ok) {
      const error = await res.text()
      return { error }
    }

    const { token } = await res.json()
    if (token) {
      localStorage.setItem("jwt", token)
      return { token }
    }

    return { error: "No token in response" }
  },

  logout() {
    localStorage.removeItem("jwt")
  },

  getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem("jwt") : null
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
}
