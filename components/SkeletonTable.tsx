export function SkeletonRow() {
  return (
    <tr className="border-b border-border-subtle">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <div
            className="shimmer rounded-md h-4"
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        </td>
      ))}
    </tr>
  )
}

export function SkeletonTable() {
  return (
    <tbody>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </tbody>
  )
}
