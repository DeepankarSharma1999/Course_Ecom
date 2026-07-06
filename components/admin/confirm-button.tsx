"use client";

// Submit button that asks for confirmation first. Works as a plain submit or
// with a formAction (server action) passed through.
export function ConfirmButton({
  message,
  formAction,
  className,
  children,
  title,
}: {
  message: string;
  formAction?: (formData: FormData) => void;
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      title={title}
      className={className}
      onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}
    >
      {children}
    </button>
  );
}
