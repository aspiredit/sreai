import { cn } from "@/lib/utils";

export type StatusType = "healthy" | "warning" | "error" | "offline";

interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  className?: string;
}

const statusConfig = {
  healthy: {
    color: "bg-green-500",
    text: "text-green-700 dark:text-green-400",
    label: "Healthy"
  },
  warning: {
    color: "bg-yellow-500",
    text: "text-yellow-700 dark:text-yellow-400",
    label: "Warning"
  },
  error: {
    color: "bg-red-500", 
    text: "text-red-700 dark:text-red-400",
    label: "Error"
  },
  offline: {
    color: "bg-gray-400",
    text: "text-gray-600 dark:text-gray-400",
    label: "Offline"
  }
};

export default function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  
  return (
    <div className={cn("flex items-center gap-2", className)} data-testid={`status-${status}`}>
      <div className={cn("w-2 h-2 rounded-full", config.color)} />
      <span className={cn("text-sm font-medium", config.text)}>
        {label}
      </span>
    </div>
  );
}