import { LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export async function AdminTopbar({ title }: { title?: string }) {
  const user = await getCurrentUser();
  return (
    <header className="h-14 bg-white border-b border-ink-200 sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="font-semibold text-ink-900">{title || "Admin"}</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-right">
          <div className="font-medium text-ink-800">{user?.name || user?.email}</div>
          <div className="text-xs text-ink-500 capitalize">{user?.role}</div>
        </div>
        <form action="/admin/logout" method="post">
          <button className="inline-flex items-center gap-1 text-sm text-ink-600 hover:text-red-600">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </form>
      </div>
    </header>
  );
}
