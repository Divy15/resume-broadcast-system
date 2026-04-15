

export const StatusBadge = ({ label, value, type }: { label: string; value: boolean | null; type: 'verified' | 'applied' }) => {
  let colorClass = "bg-slate-100 text-slate-600";
  let text = value ? "Yes" : "No";

  if (type === 'verified') {
    if (value === null) { text = "Pending"; colorClass = "bg-yellow-100 text-yellow-800"; }
    else if (value === true) { text = "Verified"; colorClass = "bg-green-100 text-green-800"; }
    else { text = "Rejected"; colorClass = "bg-red-100 text-red-800"; }
  } else if (type === 'applied' && value) {
    colorClass = "bg-blue-100 text-blue-800";
  }

  return (
    <div>
      <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
        {text}
      </span>
    </div>
  );
};