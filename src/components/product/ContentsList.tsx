export function ContentsList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ol className="divide-y divide-stone border-y border-stone">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[2.5rem_1fr] items-baseline py-3.5">
          <span className="text-[0.75rem] tabular-nums text-clay">{String(i + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
