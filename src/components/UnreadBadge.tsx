
import { cn } from "@/lib/utils";

interface UnreadBadgeProps {
  count: number;
  className?: string;
}

export const UnreadBadge = ({ count, className }: UnreadBadgeProps) => {
  if (count === 0) return null;
  
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 rounded-full bg-destructive animate-pulse-dot"></div>
      <div className="relative inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
        {count > 99 ? "99+" : count}
      </div>
    </div>
  );
};
