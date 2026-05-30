import { AdminSidebar } from "@/components/admin/sidebar";
import { getSiteSettings } from "@/lib/site-content";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  
  return (
    <div className="min-h-screen flex bg-ink-50">
      <AdminSidebar brandName={settings.brandName} logoUrl={settings.logoUrl} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
