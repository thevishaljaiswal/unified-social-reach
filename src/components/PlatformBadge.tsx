
import { Facebook, Linkedin, MessageSquare } from "lucide-react";
import { Platform } from "../types";
import { cn } from "@/lib/utils";

interface PlatformBadgeProps {
  platform: Platform;
  className?: string;
  showLabel?: boolean;
  size?: number;
}

export const PlatformBadge = ({ platform, className, showLabel = false, size = 16 }: PlatformBadgeProps) => {
  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook size={size} />;
      case 'linkedin':
        return <Linkedin size={size} />;
      case 'whatsapp':
        return <MessageSquare size={size} />; // Changed from Whatsapp to MessageSquare
      default:
        return <MessageSquare size={size} />;
    }
  };

  const getColor = () => {
    switch (platform) {
      case 'facebook':
        return 'bg-facebook text-white';
      case 'linkedin':
        return 'bg-linkedin text-white';
      case 'whatsapp':
        return 'bg-whatsapp text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getLabel = () => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("p-1 rounded flex items-center justify-center", getColor())}>
        {getIcon()}
      </div>
      {showLabel && <span className="text-sm font-medium">{getLabel()}</span>}
    </div>
  );
};
