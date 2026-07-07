import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { FestivalInstance } from './CreateFestivalForm'
import { CreateFestivalForm } from './CreateFestivalForm'

interface CreateFestivalTabProps {
  newFestival: Partial<FestivalInstance>
  setNewFestival: React.Dispatch<
    React.SetStateAction<Partial<FestivalInstance>>
  >
  onCreateFestival: () => void
}

export function CreateFestivalTab({
  newFestival,
  setNewFestival,
  onCreateFestival,
}: CreateFestivalTabProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">
          Créer une Nouvelle Instance de Festival
        </CardTitle>
        <CardDescription className="text-sm">
          Lancez un nouveau festival marsAI avec sa propre configuration et identité visuelle
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <CreateFestivalForm
          newFestival={newFestival}
          setNewFestival={setNewFestival}
          onCreate={onCreateFestival}
        />
      </CardContent>
    </Card>
  )
}