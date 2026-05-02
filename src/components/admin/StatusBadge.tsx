import { Clock, PhoneCall, CheckCircle2, XCircle } from "lucide-react";
import type { ReservationStatus } from "@/lib/database.types";

export type { ReservationStatus };

interface StatusBadgeProps {
  status: ReservationStatus;
  size?: "sm" | "md";
}

const STATUS_MAP: Record<ReservationStatus, { label: string; cls: string; Icon: typeof Clock }> = {
  pending: {
    label: "En attente",
    cls: "bg-accent/10 text-accent border-accent/30",
    Icon: Clock,
  },
  contacted: {
    label: "Contacté",
    cls: "bg-accent/10 text-accent border-accent/30",
    Icon: PhoneCall,
  },
  confirmed: {
    label: "Confirmée",
    cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Icon: CheckCircle2,
  },
  refused: {
    label: "Refusée",
    cls: "bg-red-500/10 text-red-400 border-red-500/30",
    Icon: XCircle,
  },
  cancelled: {
    label: "Refusée",
    cls: "bg-red-500/10 text-red-400 border-red-500/30",
    Icon: XCircle,
  },
} as Record<string, { label: string; cls: string; Icon: typeof Clock }>;

export default function StatusBadge({
  status,
  size = "md",
}: StatusBadgeProps) {
  const { label, cls, Icon } = STATUS_MAP[status];
  const pad = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs";
  const iconSize = size === "sm" ? 11 : 12;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${pad} ${cls}`}
    >
      <Icon size={iconSize} />
      {label}
    </span>
  );
}
