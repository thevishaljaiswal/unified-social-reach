
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Agent } from "@/types";

interface AgentAvatarProps {
  agent: Agent;
  size?: "sm" | "md" | "lg";
}

export const AgentAvatar = ({ agent, size = "md" }: AgentAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const getInitials = () => {
    return agent.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={agent.avatar} alt={agent.name} />
      <AvatarFallback className="bg-secondary text-secondary-foreground">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};
