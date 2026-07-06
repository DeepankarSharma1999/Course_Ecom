"use client";

// Header checkbox that toggles every checkbox with the given name in its form.
export function SelectAll({ name }: { name: string }) {
  return (
    <input
      type="checkbox"
      aria-label="Select all"
      onChange={(e) => {
        e.currentTarget.form?.querySelectorAll<HTMLInputElement>(`input[type=checkbox][name="${name}"]`)
          .forEach((cb) => { cb.checked = e.currentTarget.checked; });
      }}
    />
  );
}
