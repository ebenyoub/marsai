import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/button'
import { FilmWithDirector } from '@/types/home'
import { Eye, Check, X } from 'lucide-react'
import { JSX } from 'react'

export interface submission {
  id: number
  title: string
  director: string
  aiTools: string
  status: 'pending' | 'approved' | 'rejected'
}
export interface SubmissionsTableProps {
  submissions: FilmWithDirector[]
  getStatusBadge: (status: string) => JSX.Element
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onPreview: (film: FilmWithDirector) => void
  t: (key: string) => string
  className: string
}


const fallbackImages = [
  'https://images.unsplash.com/photo-1620712943543-bcc4628c9457?q=80&w=800&auto=format&fit=crop', // Futuristic AI/Robot human face
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', // Cyberpunk neon city
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', // Globe technology network
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop', // Cinema theater neon
  'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop', // AI technology concept
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop', // Colorful digital gradient
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop', // Futuristic android interaction
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=800&auto=format&fit=crop', // Marseille coast / Sea adapt
  'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop', // Dark cinematic nebula
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop', // Tech chip / motherboard
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'  // Futuristic server room
];

export function SubmissionsTable({ submissions, getStatusBadge, onApprove, onReject, onPreview, t }: SubmissionsTableProps) {
  return (
    <table className="w-full">
      <thead className='w-full'>
        <tr className="text-center bg-muted-foreground/10 items-center h-10 ">
          <th className="rounded-l-lg hidden md:visible">{t('admin.submissions.column.cover')}</th>
          <th className='rounded-l-xl'>{t('admin.submissions.column.title')}</th>
          <th>{t('admin.submissions.column.director')}</th>
          <th>{t('admin.submissions.column.ai')}</th>
          <th>{t('admin.submissions.column.status')}</th>
          <th className="rounded-r-lg" />
        </tr>
      </thead>
      <tbody className='items-center'>
        {submissions.map((s: FilmWithDirector) => (
          <tr key={s.id} className="border-t text-center">
            <td className='hidden md:block'>
              {s.thumbnail && (
                <img
                  src={s.thumbnail}
                  className="w-20 h-20 m-3 border-3 border-primary rounded-xl object-cover"
                  alt=""
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const fallbackIndex = s.id ? (s.id % fallbackImages.length) : 0;
                    const fallbackUrl = fallbackImages[fallbackIndex];

                    if (target.src === fallbackUrl) {
                      target.src = '/src/assets/hero.jpg';
                      return;
                    }

                    if (target.src === '/src/assets/hero.jpg') {
                      return;
                    }

                    if (target.src.includes('maxresdefault.jpg')) {
                      target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
                    } else if (target.src.includes('hqdefault.jpg')) {
                      target.src = target.src.replace('hqdefault.jpg', 'mqdefault.jpg');
                    } else {
                      target.src = fallbackUrl;
                    }
                  }}
                />
              )}
            </td>
            <td>{s.title}</td>
            <td>{`${s.director_firstname} ${s.director_lastname}`}</td>
            <td>
  {s.ia_type && <Badge>{s.ia_type}</Badge>}
</td>
            <td>{getStatusBadge(s.status)}</td>
            <td className="p-3">
              <div className="flex gap-2 items-center justify-end">
                <Button size="icon" variant="ghost" onClick={() => onPreview(s)} title={t('admin.submissions.preview')}>
                  <Eye className="w-5 h-5" />
                </Button>
                {s.status === 'pending' && (
                  <>
                    <Button size="icon" variant="ghost" onClick={() => onApprove(s.id)} className="text-green-500 hover:text-green-400" title={t('admin.submissions.approve')}>
                      <Check className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => onReject(s.id)} className="text-red-500 hover:text-red-400" title={t('admin.submissions.reject')}>
                      <X className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}