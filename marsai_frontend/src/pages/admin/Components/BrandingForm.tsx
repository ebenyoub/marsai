import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/form'
import { Label } from '@/components/ui/form'
import { Upload } from 'lucide-react'
import { useState } from 'react'



const festivalInstances = [
  { id: '2026', name: 'Marseille 2026', year: 2026, status: 'active' },
  { id: '2027', name: 'Marseille 2027', year: 2027, status: 'à venir' },
  { id: '2025', name: 'Marseille 2025', year: 2025, status: 'archivé' },
];

type BrandingSettings = {
  logo: string
  primaryColor: string
  youtubeApiKey: string
  value?: string
}

type Props = {
  brandingSettings: BrandingSettings
  onChange: (settings: BrandingSettings) => void
  onSave: () => void
  onCancel: () => void
  t: (key: string) => string
  value?: string
}

function BrandingForm({
  brandingSettings,
  onChange,
  t,
}: Props) {
  const [selectedFestival] = useState(festivalInstances[0]?.id || '');

  const currentFestival = festivalInstances.find(f => f.id === selectedFestival);

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">{t('admin.branding.title')}</CardTitle>
        <CardDescription className="text-sm">
          {t('admin.branding.description')} {currentFestival?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="logo">{t('admin.branding.logo')}</Label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Input
              id="logo"
              type="file"
              accept="image/*"
              className="flex-1 border-border/50"
            />
            <Button variant="outline" className="border-border/50 w-full sm:w-auto">
              <Upload className="w-4 h-4 mr-2" />
              {t('common.add')}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('admin.branding.logo.hint')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryColor">{t('admin.branding.color')}</Label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Input
              id="primaryColor"
              type="color"
              value={brandingSettings.primaryColor}
              onChange={(e) => onChange({ ...brandingSettings, primaryColor: e.target.value })}
              className="w-20 h-12 cursor-pointer"
            />
            <Input
              type="text"
              value={brandingSettings.primaryColor}
              onChange={(e) => onChange({ ...brandingSettings, primaryColor: e.target.value })}
              className="flex-1 border-border/50"
              placeholder="#00F2FF"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtubeKey">{t('admin.branding.youtube')}</Label>
          <Input
            id="youtubeKey"
            type="password"
            value={brandingSettings.youtubeApiKey}
            onChange={(e) => onChange({ ...brandingSettings, youtubeApiKey: e.target.value })}
            placeholder="••••••••"
            className="border-border/50"
          />
          <p className="text-sm text-muted-foreground">
            {t('admin.branding.youtube.hint')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            {t('common.save')}
          </Button>
          <Button variant="outline" className="border-border/50 w-full sm:w-auto">
            {t('common.cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BrandingForm