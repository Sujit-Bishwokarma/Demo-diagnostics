import React from 'react';
import {
  Microscope,
  Activity,
  Scan,
  Heart,
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  Cpu,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Star,
  ArrowRight,
  Download,
  Search,
  Check,
  AlertCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  Building,
  CheckSquare,
  User
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  User,
  Microscope,
  Activity,
  Scan,
  Heart,
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  Cpu,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  Star,
  ArrowRight,
  Download,
  Search,
  Check,
  AlertCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
  Building,
  CheckSquare
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = '', size = 24 }: DynamicIconProps) {
  const IconComponent = iconMap[name] || Microscope; // Fallback icon
  return <IconComponent className={className} size={size} />;
}
