import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { FestivalInstance } from "./CreateFestivalForm";
import { motion } from "motion/react";

export function FestivalListItem({ festival, index, onClick }: { festival: FestivalInstance, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={onClick}>
        <CardContent className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg"
            style={{ backgroundColor: festival.primaryColor }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{festival.name}</h3>
            <p className="text-xs text-muted-foreground truncate">
              marsai.com/{festival.slug}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function FestivalList({ festivals, headerAction, onSelect }: { festivals: FestivalInstance[], headerAction: React.ReactNode, onSelect: (festival: FestivalInstance) => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Liste des Festivals</CardTitle>
          <CardDescription>
            Gérez toutes les instances marsAI
          </CardDescription>
        </div>
        {headerAction}
      </CardHeader>

      <CardContent className="space-y-3">
        {festivals.map((festival, i) => (
          <FestivalListItem key={festival.id} festival={festival} index={i} onClick={() => onSelect(festival)} />
        ))}
      </CardContent>
    </Card>
  )
}