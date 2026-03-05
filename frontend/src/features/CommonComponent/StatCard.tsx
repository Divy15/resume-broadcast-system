export interface StatsCardProps {
  label: string;
  count: number | string | undefined;
}

export const StatCard: React.FC<StatsCardProps> = ({ label, count=0 }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    <div className="flex items-center h-full justify-start">
    <p className="text-3xl font-bold text-indigo-600 mt-1">+{count}</p>
    </div>
  </div>
);