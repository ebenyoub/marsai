import { useEffect, useState } from "react"
import { CMSHeader } from "./components/CMSHeader"
import { CMSMainTabs } from "./components/CMSTMainTabs"
import { CMSStatsGrid } from "./components/CMSStatsGrid"
import { FestivalInstance } from "./components/CreateFestivalForm"
import { EditFestivalDialog } from "./components/EditFestivalDialog"
import { useFetch } from "@/hooks/useFetch"
import { apiRequest } from "@/lib/api"

const festivalsTab: FestivalInstance[] = [
  {
    id: '1',
    name: 'marsAI Marseille 2026',
    slug: 'marseille-2026',
    year: 2026,
    city: 'Marseille',
    status: 'active',
    primaryColor: '#00F2FF',
    submissionsCount: 247,
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'marsAI Lyon 2027',
    slug: 'lyon-2027',
    year: 2027,
    city: 'Lyon',
    status: 'upcoming',
    primaryColor: '#FF6B9D',
    submissionsCount: 0,
    createdAt: '2026-01-15',
  },
  {
    id: '3',
    name: 'marsAI Paris 2025',
    slug: 'paris-2025',
    year: 2025,
    city: 'Paris',
    status: 'archived',
    primaryColor: '#FFD700',
    submissionsCount: 189,
    createdAt: '2024-01-01',
  },
];

function SuperAdminDashboard() {
  const [festivals, setFestivals] = useState<FestivalInstance[]>(festivalsTab);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState<FestivalInstance | null>(null);
  const [newFestival, setNewFestival] = useState<Partial<FestivalInstance>>({
    name: '',
    slug: '',
    city: '',
    year: new Date().getFullYear(),
    primaryColor: '#00F2FF',
    youtubeApiKey: '',
  });

  const { data, isLoading, error } = useFetch<FestivalInstance[]>('/festivals')

  interface CreateFestivalResponse {
    success: boolean;
    data: {
      insertId?: number;
    };
    message?: string;
  }

  useEffect(() => {
    if (data && Array.isArray(data)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFestivals(data.map((f) => ({
        ...f,
        slug: f.slug,
        city: f.city,
        year: new Date(f.start_at || Date.now()).getFullYear(),
        submissionsCount: f.submissionsCount || 0,
      })));
    }
  }, [data]);
  
  const handleCreateFestival = async () => {
    const token = localStorage.getItem('token');
    const festivalPayload = {
      name: newFestival.name!,
      description: 'Festival de courts-métrages sur les futurs souhaitables.',
      start_at: `${newFestival.year}-06-01 00:00:00`,
      end_at: `${newFestival.year}-06-30 00:00:00`,
      status: 'Inactif',
      booking_total: 100,
      slug: newFestival.slug!,
      city: newFestival.city || 'Marseille',
    };

    try {
      const res = await apiRequest<CreateFestivalResponse>('/festivals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(festivalPayload)
      });
      if (res.success) {
        const created: FestivalInstance = {
          id: String(res.data.insertId || festivals.length + 1),
          name: newFestival.name!,
          slug: newFestival.slug!,
          year: newFestival.year!,
          city: newFestival.city || 'Marseille',
          status: 'upcoming',
          primaryColor: newFestival.primaryColor!,
          youtubeApiKey: newFestival.youtubeApiKey,
          submissionsCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setFestivals([...festivals, created]);
        setIsCreateDialogOpen(false);
        setNewFestival({
          name: '',
          slug: '',
          city: '',
          year: new Date().getFullYear(),
          primaryColor: '#00F2FF',
          youtubeApiKey: '',
        });
      }
    } catch (err) {
      console.error("Erreur lors du post du festival", err);
      alert(err instanceof Error ? err.message : 'Erreur lors de la création du festival');
    }
  };

  const handleSaveFestival = async (updated: FestivalInstance) => {
    const token = localStorage.getItem('token');
    try {
      await apiRequest(`/festivals/${updated.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updated.name,
          description: updated.description || 'Festival de courts-métrages sur les futurs souhaitables.',
          start_at: updated.start_at || `${updated.year}-06-01 00:00:00`,
          end_at: updated.end_at || `${updated.year}-06-30 00:00:00`,
          status: updated.status === 'active' ? 'Actif' : 'Inactif',
          booking_total: updated.booking_total || 100,
          slug: updated.slug,
          city: updated.city || 'Marseille',
        })
      });
      setFestivals(prev => prev.map(f => f.id === updated.id ? updated : f));
      setEditingFestival(null);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde du festival", err);
      alert(err instanceof Error ? err.message : 'Erreur lors de la modification du festival');
    }
  };

  if (isLoading && festivals.length === 0) return <p>Chargement...</p>
  if (error && festivals.length === 0) return <p>{ error }</p>

  return (
    <main className="container mx-auto px-4 py-6 mt-15 max-w-7xl">
      <CMSHeader />
      <CMSStatsGrid festivals={festivals} />
      <CMSMainTabs
        festivals={festivals}
        newFestival={newFestival}
        setNewFestival={setNewFestival}
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        onCreateFestival={handleCreateFestival}
        onSelectFestival={(f) => setEditingFestival(f)}
      />
      <EditFestivalDialog
        festival={editingFestival}
        open={!!editingFestival}
        onOpenChange={(open) => !open && setEditingFestival(null)}
        onSave={handleSaveFestival}
      />
    </main>
  );
}

export default SuperAdminDashboard
