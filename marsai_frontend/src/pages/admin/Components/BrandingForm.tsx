import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/form'
import { Label } from '@/components/ui/form'
import { Upload } from 'lucide-react'
import { useState } from 'react'
import { apiRequest } from '@/lib/api'

interface FestivalInfo {
  id: number;
  name: string;
  description: string;
  start_at: string;
  end_at: string;
  status: 'Actif' | 'Inactif';
  booking_total: number;
  slug: string;
  city: string;
  logo_url?: string | null;
  primary_color?: string | null;
  youtube_api_key?: string | null;
}

type Props = {
  activeFestival: FestivalInfo
  onSave: () => void
  t: (key: string) => string
}

function BrandingForm({
  activeFestival,
  onSave,
  t,
}: Props) {
  const [brandingSettings, setBrandingSettings] = useState(() => ({
    logo: activeFestival.logo_url || '',
    primaryColor: activeFestival.primary_color || '#00F2FF',
    youtubeApiKey: activeFestival.youtube_api_key || '',
  }));

  const handleSave = async () => {
    try {
      await apiRequest(`/festivals/${activeFestival.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: activeFestival.name,
          description: activeFestival.description,
          start_at: activeFestival.start_at,
          end_at: activeFestival.end_at,
          status: activeFestival.status,
          booking_total: activeFestival.booking_total,
          slug: activeFestival.slug,
          city: activeFestival.city,
          logo_url: brandingSettings.logo,
          primary_color: brandingSettings.primaryColor,
          youtube_api_key: brandingSettings.youtubeApiKey,
        }),
      });
      onSave();
      alert('Configuration enregistrée avec succès !');
    } catch (err) {
      console.error('Error saving branding:', err);
      alert('Erreur lors de la sauvegarde du branding.');
    }
  };

  const handleCancel = () => {
    setBrandingSettings({
      logo: activeFestival.logo_url || '',
      primaryColor: activeFestival.primary_color || '#00F2FF',
      youtubeApiKey: activeFestival.youtube_api_key || '',
    });
  };

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">{t('admin.branding.title')}</CardTitle>
        <CardDescription className="text-sm">
          {t('admin.branding.description')} {activeFestival.name}
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
              onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
              className="w-20 h-12 cursor-pointer"
            />
            <Input
              type="text"
              value={brandingSettings.primaryColor}
              onChange={(e) => setBrandingSettings({ ...brandingSettings, primaryColor: e.target.value })}
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
            onChange={(e) => setBrandingSettings({ ...brandingSettings, youtubeApiKey: e.target.value })}
            placeholder="••••••••"
            className="border-border/50"
          />
          <p className="text-sm text-muted-foreground">
            {t('admin.branding.youtube.hint')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            {t('common.save')}
          </Button>
          <Button onClick={handleCancel} variant="outline" className="border-border/50 w-full sm:w-auto">
            {t('common.cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BrandingForm