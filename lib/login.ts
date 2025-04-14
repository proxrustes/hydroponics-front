export async function loginClient(email: string, password: string): Promise<boolean> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) return false

  const data = await res.json()
  localStorage.setItem("jwt", data.token)
  return true
}
