import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
  bgColor: string;
  className?: string;
}
