import { CreateFestivalDialog } from "./CreateFestivalDialog";
import { FestivalInstance } from "./CreateFestivalForm";
import { FestivalList } from "./FestivalList";

export interface FestivalInstancesTabProps {
  festivals: FestivalInstance[];
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newFestival: Partial<FestivalInstance>;
  setNewFestival: React.Dispatch<React.SetStateAction<Partial<FestivalInstance>>>;
  onCreateFestival: () => void;
  onSelectFestival: (festival: FestivalInstance) => void;
}

export function FestivalInstancesTab({
  festivals,
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newFestival,
  setNewFestival,
  onCreateFestival,
  onSelectFestival,
}: FestivalInstancesTabProps) {
  return (
    <FestivalList
      festivals={festivals}
      onSelect={onSelectFestival}
      headerAction={
        <CreateFestivalDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          newFestival={newFestival}
          setNewFestival={setNewFestival}
          onCreate={onCreateFestival}
        />
      }
    />
  );
}