import Link from "next/link";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.93 0 2.4-.7 2.728-1.602.115-.302.115-.557.085-.832-.115-.232-.345-.348-.733-.46-.55-.158-1.43-.66-1.72-.66ZM26.106 5.894C23.275 3.063 19.512 1.5 15.5 1.5 7.353 1.5.75 8.103.75 16.25c0 2.604.687 5.16 1.994 7.42L.625 30.5l6.97-2.084a14.71 14.71 0 0 0 7.905 2.13c8.147 0 14.75-6.603 14.75-14.75 0-3.96-1.545-7.722-4.144-10.4ZM15.5 27.85a12.86 12.86 0 0 1-6.557-1.792l-.469-.28L4.79 27.066l1.302-4.045-.305-.487a12.36 12.36 0 0 1-1.906-6.585c0-6.71 5.46-12.17 12.17-12.17 3.252 0 6.31 1.262 8.602 3.555a12.143 12.143 0 0 1 3.554 8.6c0 6.71-5.46 12.171-12.17 12.171Z" />
    </svg>
  );
}

export function FloatingWhatsApp({ phone, message }: { phone?: string | null; message?: string }) {
  if (!phone) return null;
  const text = encodeURIComponent(message || "Hi, I'd like more information about your courses.");
  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${text}`;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 left-5 z-40 w-12 h-12 rounded-full bg-emerald-500 text-white shadow-card-lg grid place-items-center hover:bg-emerald-600 hover:scale-105 transition-all"
    >
      <WhatsappIcon className="w-6 h-6" />
    </Link>
  );
}

export function WhatsAppCta({ phone, message, className = "" }: { phone?: string | null; message?: string; className?: string }) {
  if (!phone) return null;
  const text = encodeURIComponent(message || "Hi, I'd like more information.");
  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${text}`;
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white px-4 py-2.5 font-semibold text-sm hover:bg-emerald-600 ${className}`}>
      <WhatsappIcon className="w-4 h-4" /> Chat on WhatsApp
    </Link>
  );
}
