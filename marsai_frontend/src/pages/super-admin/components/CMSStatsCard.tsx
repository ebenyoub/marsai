import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { motion } from "motion/react";

export function CMSStatsCard({ stat, index }: { stat: { label: string, value: number }, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {stat.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-medium text-primary">
            {stat.value}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}