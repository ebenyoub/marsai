import Button from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";

export interface FestivalInstance {
  id: string;
  name: string;
  slug: string;
  city: string;
  year: number;
  status: 'active' | 'upcoming' | 'archived';
  logo?: string;
  primaryColor: string;
  youtubeApiKey?: string;
  submissionsCount: number;
  createdAt: string;
  description?: string;
  start_at?: string;
  end_at?: string;
  booking_total?: number;
}
export function CreateFestivalForm({ newFestival, setNewFestival, onCreate }: {
  newFestival: Partial<FestivalInstance>;
  setNewFestival: React.Dispatch<React.SetStateAction<Partial<FestivalInstance>>>;
  onCreate: () => void;
}){
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nom du Festival</Label>
          <Input
            id="name"
            value={newFestival.name || ''}
            onChange={(e) => {
              const name = e.target.value;
              setNewFestival(prev => ({
                ...prev,
                name,
                slug: prev.slug === slugify(prev.name || '') ? slugify(name) : prev.slug
              }));
            }}
          />
        </div>
        <div>
          <Label htmlFor="city">Ville</Label>
          <Input
            id="city"
            value={newFestival.city || ''}
            onChange={(e) => setNewFestival({ ...newFestival, city: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={newFestival.slug || ''}
            onChange={(e) => setNewFestival({ ...newFestival, slug: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="year">Année</Label>
          <Input
            id="year"
            type="number"
            value={newFestival.year}
            onChange={(e) => setNewFestival({ ...newFestival, year: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="color">Couleur Principale</Label>
        <Input
          id="color"
          type="color"
          value={newFestival.primaryColor}
          onChange={(e) => setNewFestival({ ...newFestival, primaryColor: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onCreate} disabled={!newFestival.name || !newFestival.slug || !newFestival.city}>
          Créer le Festival
        </Button>
      </div>
    </div>
  );
}