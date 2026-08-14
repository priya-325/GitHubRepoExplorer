export default function RepoCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between gap-4">
        <div className="h-5 w-36 rounded bg-slate-200" />
        <div className="h-6 w-20 rounded-full bg-slate-200" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
        <div className="h-4 w-2/3 rounded bg-slate-200" />
      </div>

      <div className="mt-6 h-4 w-24 rounded bg-slate-200" />

      <div className="mt-7 flex justify-between">
        <div className="h-5 w-28 rounded bg-slate-200" />
        <div className="h-9 w-20 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
