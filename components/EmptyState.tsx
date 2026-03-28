import { Search } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-surface-2 border border-border rounded-2xl flex items-center justify-center mb-6">
        <Search className="w-7 h-7 text-text-tertiary" />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-2">
        Trouvez vos prochains clients
      </h2>
      <p className="text-text-tertiary text-sm max-w-sm leading-relaxed">
        Recherchez des entreprises locales par ville et secteur. Identifiez celles qui ont besoin d&apos;un site web ou d&apos;améliorations digitales.
      </p>

      <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
        {[
          { emoji: '🔍', text: 'Trouvez des leads locaux' },
          { emoji: '📊', text: 'Scorez automatiquement' },
          { emoji: '📩', text: 'Contactez en 1 clic' },
        ].map(({ emoji, text }) => (
          <div key={text} className="bg-surface-2 border border-border rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">{emoji}</div>
            <p className="text-xs text-text-tertiary leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
