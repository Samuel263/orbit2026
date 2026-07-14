import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { unlocked?: boolean };

export function adminSessionConfig() {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password) throw new Error("ADMIN_SESSION_SECRET not set");
  return {
    password,
    name: "admin-gate",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

export async function getAdminSession() {
  return useSession<AdminSession>(adminSessionConfig());
}

export async function requireAdmin() {
  const s = await getAdminSession();
  if (!s.data.unlocked) throw new Error("Unauthorized");
  return s;
}
