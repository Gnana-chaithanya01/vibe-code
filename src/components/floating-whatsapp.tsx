import { MessageCircle } from "lucide-react";
import { shop } from "@/config/shop";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="Contact Sri Meena Jewellers">
      <a
        className="floating-whatsapp"
        href={shop.whatsapp}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle aria-hidden="true" size={18} strokeWidth={1.5} />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
