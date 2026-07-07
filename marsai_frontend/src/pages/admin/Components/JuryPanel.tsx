import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/form'
import { Label } from '@/components/ui/form'
import { useState } from 'react'

type JuryMember = {
  id: number
  email: string
}

type Props = {
  jury: JuryMember[]
  onAdd: (email: string) => void
  onRemove: (id: number) => void
  t: (key: string) => string
  message?: string | null
}


function JuryPanel({ jury, onAdd, onRemove, message, t }: Props) {
  const [email, setEmail] = useState('')

  return (
    <Card>
      <div className="p-6 space-y-6">
        {message && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-slate-300">
            {message}
          </div>
        )}

        {/* Ajouter un juré */}
        <div className="space-y-2">
          <Label>{t('admin.jury.email_label')}</Label>
          <div className="flex gap-2">
            <Input
              placeholder="jury@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!email) return
                onAdd(email)
                setEmail('')
              }}
            >
              {t('common.add')}
            </Button>
          </div>
        </div>

        {/* Liste des jurés */}
        <div className="space-y-2">
          <Label>{t('admin.jury.existing')}</Label>

          {jury.length === 0 && (
            <p className="text-sm text-muted-foreground">
              {t('admin.jury.none')}
            </p>
          )}

          <ul className="space-y-2">
            {jury.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between border rounded-md px-3 py-2"
              >
                <span>{member.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemove(member.id)}
                >
                  {t('common.delete')}
                </Button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Card>
  )
}

export default JuryPanel