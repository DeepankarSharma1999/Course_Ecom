import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { Badge, Field, Input, PageHeader, Section, Select } from "@/components/admin/ui";
import { createAdminUser, resetAdminPassword, toggleAdminUser } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <AdminTopbar title="Admin Users" />
      <div className="p-6">
        <PageHeader title="Admin Users" description="Manage who can access the admin panel." />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
                <tr><th className="px-4 py-3">User</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Last login</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium">{u.name || "—"}</div>
                      <div className="text-xs text-ink-500">{u.email}</div>
                    </td>
                    <td className="px-4 py-3 capitalize">{u.role}</td>
                    <td className="px-4 py-3">{u.isActive ? <Badge tone="green">Active</Badge> : <Badge tone="red">Disabled</Badge>}</td>
                    <td className="px-4 py-3 text-xs text-ink-600">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : "—"}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <form action={toggleAdminUser.bind(null, u.id)} className="inline"><button className="text-xs text-ink-600 hover:text-brand-600">{u.isActive ? "Disable" : "Enable"}</button></form>
                      <form action={resetAdminPassword.bind(null, u.id)} className="inline">
                        <input name="password" type="password" placeholder="new password" className="text-xs border border-ink-200 rounded px-2 py-1" />
                        <button className="text-xs text-brand-600 ml-1 hover:underline">Reset</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form action={createAdminUser}>
            <Section title="Add Admin User">
              <Field label="Name"><Input name="name" /></Field>
              <Field label="Email" required><Input type="email" name="email" required /></Field>
              <Field label="Role">
                <Select name="role" defaultValue="editor">
                  <option value="admin">Admin (full access)</option>
                  <option value="editor">Editor</option>
                </Select>
              </Field>
              <Field label="Password" required><Input type="password" name="password" minLength={6} required /></Field>
              <button type="submit" className="btn-primary w-full">Create User</button>
            </Section>
          </form>
        </div>
      </div>
    </>
  );
}
