import { motion } from 'motion/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

export type DashboardStat = {
  label?: string,
  value?: string | number,
  icon?: LucideIcon,
  color?: string,
  className?: string,
}

export function StatsGrid({ stats }: { stats: DashboardStat[] }) {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card/50 w-full lg:w-65 h-fit md:h-50 border-border/50 p-3 flex md:flex-col text-center justify-between md:justify-center items-center ">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 justify-center">
                  {Icon && <Icon className=" text-sm text-primary" />}
                  <div className='text-xl items-center'>
                    {stat.label}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}