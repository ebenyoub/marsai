import { SubmissionCard } from './SubmissionCard'
import { SubmissionsTable } from './SubmissionsTable'
import { SubmissionsTableProps } from '../Components/SubmissionsTable'
import { useTranslation } from 'react-i18next'

export function SubmissionsPanel({ submissions, getStatusBadge }: SubmissionsTableProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className="md:hidden space-y-3">
        {submissions.map((s) => (
          <SubmissionCard
            key={s.id}
            submission={s}
            getStatusBadge={getStatusBadge}
            t={t}
          />
        ))}
      </div>

      <div className="hidden md:block">
        <SubmissionsTable
          submissions={submissions}
          getStatusBadge={getStatusBadge}
          t={t}
          className=''
        />
      </div>
    </>
  )
}
