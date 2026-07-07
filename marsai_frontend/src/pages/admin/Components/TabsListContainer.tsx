import { TabsContent } from '@/components/ui/tabs'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Film, Palette, Users } from 'lucide-react'
import BrandingForm from './BrandingForm'
import JuryPanel from './JuryPanel'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmissionsTable } from './SubmissionsTable'
import Badge from '@/components/ui/Badge'
import { FilmType } from '@/types/home'
import { useFetch } from '@/hooks/useFetch'


type JuryMember = {
    id: number
    email: string
    role?: string
}

interface AddJuryResponse {
    success: boolean
    isNewAccount?: boolean
    message?: string
}

const initialBrandingSettings = {
    logo: '',
    primaryColor: '#00F2FF',
    youtubeApiKey: '',
}
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return <Badge variant="green">Validé</Badge>
        case 'rejected':
            return <Badge variant="destructive">Refusé</Badge>
        default:
            return <Badge variant="warning">En attente</Badge>
    }
}

import { apiRequest } from '@/lib/api'
import FilmPopup from '@/components/FilmPopup'

function TabsListContainer() {
    const [brandingSettings, setBrandingSettings] = useState(initialBrandingSettings)
    const { data: allUsers, refetch: refetchUsers } = useFetch<JuryMember[]>("/users")
    const [juryMessage, setJuryMessage] = useState<string | null>(null)
    const { data: films, isLoading, error, refetch } = useFetch<FilmType[]>("/movies?status=all")
    const [previewFilm, setPreviewFilm] = useState<FilmType | null>(null)

    const jury = useMemo(() => {
        if (!allUsers || !Array.isArray(allUsers)) return [];
        return allUsers
            .filter((u) => u.role === 'jury')
            .map((u) => ({ id: u.id, email: u.email }));
    }, [allUsers]);

    const handleApprove = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await apiRequest(`/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'approved' })
            });
            refetch();
        } catch (err) {
            console.error('Erreur lors de la validation du film', err);
        }
    }

    const handleReject = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await apiRequest(`/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'rejected' })
            });
            refetch();
        } catch (err) {
            console.error('Erreur lors du rejet du film', err);
        }
    }

    const handleAddJury = async (email: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await apiRequest<AddJuryResponse>('/users/jury', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });
            if (res.success) {
                if (res.isNewAccount) {
                    setJuryMessage("Nouveau compte juré créé avec le mot de passe temporaire : password123");
                } else {
                    setJuryMessage(res.message);
                }
                refetchUsers();
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout du juré", err);
            setJuryMessage("Erreur : " + (err instanceof Error ? err.message : "Impossible d'ajouter le juré."));
        }
    }

    const handleRemoveJury = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await apiRequest(`/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ role: 'user' })
            });
            refetchUsers();
        } catch (err) {
            console.error("Erreur lors de la suppression du juré", err);
        }
    }

    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('submissions')

    const triggers = [
        { value: 'submissions', icon: <Film className="w-3 h-3 md:w-5 md:h-5" />, label: 'Soumissions' },
        { value: 'branding', icon: <Palette className="w-3 h-3 md:w-5 md:h-5" />, label: t('admin.tabs.branding') },
        { value: 'users', icon: <Users className="w-3 h-3 md:w-5 md:h-5" />, label: t('admin.tabs.users') },
    ]

    return (
        <Tabs defaultValue="submissions" className="w-full items-center" value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="flex w-contain justify-between mb-6 md:mb-8 h-auto bg-muted-foreground/10 rounded-xl p-2">
                {triggers.map((trigger) => (
                    <TabsTrigger
                        key={trigger.value}
                        value={trigger.value}
                        className={`gap-1 w-full justify-center p-3 cursor-pointer rounded-xl text-md flex items-center ${activeTab === trigger.value ? 'bg-black/60' : ''}`}
                    >
                        {trigger.icon}
                        <span className="hidden sm:inline">{trigger.label}</span>
                        <span className="sm:hidden">{trigger.label}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="submissions">
                {isLoading && <p>Chargement des soumissions…</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!isLoading && !error && films && (
                    <SubmissionsTable
                        submissions={films}
                        getStatusBadge={getStatusBadge}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onPreview={(f) => setPreviewFilm(f)}
                        t={t}
                        className={'w-full'}
                    />
                )}
                {previewFilm && (
                    <FilmPopup
                        film={previewFilm}
                        open={!!previewFilm}
                        onClose={() => setPreviewFilm(null)}
                    />
                )}
                <span className="sm:hidden">Jury</span>
            </TabsContent>
            <TabsContent value="branding">
                <BrandingForm
                    brandingSettings={brandingSettings}
                    onChange={setBrandingSettings}
                    onSave={() => console.error('Saved branding')}
                    onCancel={() => console.error('Cancelled')}
                    t={t}
                />
            </TabsContent>
            <TabsContent value="users">
                <JuryPanel
                    jury={jury}
                    onAdd={handleAddJury}
                    onRemove={handleRemoveJury}
                    t={t}
                    message={juryMessage}
                />

            </TabsContent>


        </Tabs>


    )
}

export default TabsListContainer
