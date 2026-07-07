import { Calendar, Settings, Upload, X as XIcon } from 'lucide-react'
import Button from '@/components/ui/button'

export type Festival = {
  id: string
  name: string
  status: string
 
}

type Props = {
  festivals: Festival[]
  selectedFestival: string
  onSelectFestival: (id: string) => void
  sidebarOpen: boolean
  onClose: () => void
  t: (key: string) => string
}

export function AdminSidebar({
  festivals,
  selectedFestival,
  onSelectFestival,
  sidebarOpen,
  onClose,
  t,
}: Props) {
  return (
   <aside
  className={`
    flex relative
    flex-row lg:flex-col
    items-start

    w-full lg:w-64
     lg:h-[calc(100vh-60px)]

    top-0 left-0

    border-b lg:border-b-0 lg:border-r border-border
    bg-background 

    p-2
    z-30
    overflow-x-auto lg:overflow-y-auto justify-start

    ${sidebarOpen ? ' block shadow-2xl' : ' hidden'}
  `}
>
 
      {/* Close mobile */}
      <div className="flex justify-center items-center w-full p-10 top-0 z-10">
        <Button variant="destructive" size="icon" onClick={onClose}>
          <XIcon className="w-7 h-7" />
        </Button>
      </div>

      {/* Festivals */}
      <div className="border-t border-border w-full">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex justify-center mt-4 gap-2">
          <Calendar className="w-4 h-4" />
          {t('admin.festival.instance')}
        </h3>

        <div className="space-y-2">
          {festivals.map(festival => (
            <button
              key={festival.id}
              onClick={() => {
                onSelectFestival(festival.id)
                onClose()
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${selectedFestival === festival.id
                ? 'bg-primary/10 text-primary border border-primary/50'
                : 'hover:bg-muted text-muted-foreground'
                }`}
            >
              <div className="font-medium text-sm">{festival.name}</div>
              <div className="text-xs opacity-70">{festival.status}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="md:pt-4 border-t border-border w-full">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">
          Actions Rapides
        </h3>
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>
      <div className=" border-t border-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 md:flex md:justify-center text-center mt-4">
          {t('footer.status') || (t('admin.systemStatus') || 'Statut Système')}
        </h3>
        <div className="space-y-3 bg-card/50 rounded-lg p-3 border border-border/50 text-center ">
          {/* API Status */}
          <div className="flex items-center justify-between gap-5">
            <span className="text-sm font-extrabold text-muted-foreground">API</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" aria-hidden="true" />
                <div className="absolute inset-0 w-2 h-2 bg-[#10B981] rounded-full opacity-75 animate-ping" aria-hidden="true" />
              </div>
              <span className="text-xs text-[#10B981] font-medium">
                {t('footer.status.operational') || 'Opérationnel'}
              </span>
            </div>
          </div>

          {/* Database Status */}
          <div className="flex items-center gap-3 justify-between">
            <span className="text-sm font-extrabold text-muted-foreground">Database</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" aria-hidden="true" />
                <div className="absolute inset-0 w-2 h-2 bg-[#10B981] rounded-full opacity-75 animate-ping" aria-hidden="true" />
              </div>
              <span className="text-xs text-[#10B981] font-medium">
                {t('footer.status.operational') || 'Opérationnel'}
              </span>
            </div>
          </div>

          {/* Storage Status */}
          <div className="flex items-center gap-5 justify-between">
            <span className="text-sm font-extrabold text-muted-foreground">Storage</span>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" aria-hidden="true" />
                <div className="absolute inset-0 w-2 h-2 bg-[#10B981] rounded-full opacity-75 animate-ping" aria-hidden="true" />
              </div>
              <span className="text-xs text-[#10B981] font-medium">
                {t('footer.status.operational') || 'Opérationnel'}
              </span>
            </div>
          </div>

          {/* Last Check */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              {t('admin.lastCheck') || 'Dernière vérif.'}: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}