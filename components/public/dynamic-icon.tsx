import {
  CheckCircle2, Clock, Globe, Laptop, ShieldCheck, Trophy, Award, BookOpen, Briefcase,
  Calendar, Cpu, GraduationCap, Headphones, Heart, Layers, Lightbulb, Rocket, Sparkles,
  Star, Target, TrendingUp, Users, Video, Zap, Gift, DollarSign, Share2, FileCheck,
  PlayCircle, BarChart, MessageSquare, Building2, Search, Cloud, Code, LineChart,
  Server, Layout, MonitorPlay, type LucideIcon,
} from "lucide-react";

// Map editable string icon names (stored in page content) to Lucide components.
// Add a name here to make it selectable from the admin Site Pages editor.
const ICONS: Record<string, LucideIcon> = {
  check: CheckCircle2, clock: Clock, globe: Globe, laptop: Laptop, shield: ShieldCheck,
  trophy: Trophy, award: Award, book: BookOpen, briefcase: Briefcase, calendar: Calendar,
  cpu: Cpu, graduation: GraduationCap, headphones: Headphones, heart: Heart, layers: Layers,
  lightbulb: Lightbulb, rocket: Rocket, sparkles: Sparkles, star: Star, target: Target,
  trending: TrendingUp, users: Users, video: Video, zap: Zap, gift: Gift, dollar: DollarSign,
  share: Share2, filecheck: FileCheck, play: PlayCircle, chart: BarChart, message: MessageSquare,
  building: Building2, search: Search, cloud: Cloud, code: Code, linechart: LineChart,
  server: Server, layout: Layout, monitor: MonitorPlay,
};

export function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && ICONS[name]) || CheckCircle2;
  return <Icon className={className} />;
}
