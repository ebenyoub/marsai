import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateFestivalForm, FestivalInstance } from "./CreateFestivalForm";

interface CreateFestivalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newFestival: Partial<FestivalInstance>;
  setNewFestival: React.Dispatch<React.SetStateAction<Partial<FestivalInstance>>>;
  onCreate: () => void;
}

export function CreateFestivalDialog({ open, onOpenChange, newFestival, setNewFestival, onCreate }: CreateFestivalDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="green">
          <Plus className="w-4 h-4 mr-2" /> Nouveau Festival
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <CreateFestivalForm newFestival={newFestival} setNewFestival={setNewFestival} onCreate={onCreate} />
      </DialogContent>
    </Dialog>
  );
}