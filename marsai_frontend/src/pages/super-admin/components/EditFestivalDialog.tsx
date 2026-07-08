import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input, Label, TextArea } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FestivalInstance } from "./CreateFestivalForm";

interface EditFestivalDialogProps {
  festival: FestivalInstance | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: FestivalInstance) => void;
}

export function EditFestivalDialog({ festival, open, onOpenChange, onSave }: EditFestivalDialogProps) {
  const [edited, setEdited] = useState<Partial<FestivalInstance>>({});

  useEffect(() => {
    if (festival) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEdited({ ...festival });
    }
  }, [festival]);

  if (!festival) return null;

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleNameChange = (name: string) => {
    const currentSlug = edited.slug || '';
    const oldName = edited.name || '';
    const newSlug = currentSlug === slugify(oldName) ? slugify(name) : currentSlug;
    setEdited(prev => ({ ...prev, name, slug: newSlug }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 text-white border border-slate-800 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white mb-4">
            Modifier le Festival : {festival.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name" className="text-sm font-semibold text-slate-300">Nom du Festival</Label>
              <Input
                id="edit-name"
                value={edited.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="edit-city" className="text-sm font-semibold text-slate-300">Ville</Label>
              <Input
                id="edit-city"
                value={edited.city || ''}
                onChange={(e) => setEdited(prev => ({ ...prev, city: e.target.value }))}
                className="bg-slate-900 border-slate-800 text-white mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-slug" className="text-sm font-semibold text-slate-300">Slug</Label>
              <Input
                id="edit-slug"
                value={edited.slug || ''}
                onChange={(e) => setEdited(prev => ({ ...prev, slug: e.target.value }))}
                className="bg-slate-900 border-slate-800 text-white mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="edit-year" className="text-sm font-semibold text-slate-300">Année</Label>
              <Input
                id="edit-year"
                type="number"
                value={edited.year || ''}
                onChange={(e) => setEdited(prev => ({ ...prev, year: Number(e.target.value) }))}
                className="bg-slate-900 border-slate-800 text-white mt-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-status" className="text-sm font-semibold text-slate-300">Statut</Label>
              <div className="mt-1.5">
                <Select
                  value={edited.status}
                  onValueChange={(val: 'active' | 'archived') => setEdited(prev => ({ ...prev, status: val }))}
                >
                  <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                    <SelectValue placeholder="Choisir un statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800 text-white">
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-color" className="text-sm font-semibold text-slate-300">Couleur Principale</Label>
              <Input
                id="edit-color"
                type="color"
                value={edited.primaryColor || '#00F2FF'}
                onChange={(e) => setEdited(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="h-10 p-1 bg-slate-900 border-slate-800 mt-1.5 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-description" className="text-sm font-semibold text-slate-300">Description / Infos Publiques</Label>
            <TextArea
              id="edit-description"
              value={edited.description || ''}
              onChange={(e) => setEdited(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Synopsis ou description du festival..."
              className="bg-slate-900 border-slate-800 text-white mt-1.5 min-h-[80px]"
            />
          </div>

          <div className="flex gap-4 justify-end mt-6">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="border border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Annuler
            </Button>
            <Button
              variant="green"
              onClick={() => onSave(edited as FestivalInstance)}
              disabled={!edited.name || !edited.slug}
            >
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
