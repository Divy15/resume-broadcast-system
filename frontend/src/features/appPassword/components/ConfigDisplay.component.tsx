interface ConfigProps {
  email: string;
  onEdit: () => void;
}

const ConfigDisplay: React.FC<ConfigProps> = ({ email, onEdit }) => (
  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
    <div>
      <p className="text-sm text-green-700 font-medium">Active Email</p>
      <p className="text-lg text-slate-800 font-mono">{email}</p>
    </div>
    <button 
      onClick={onEdit}
      className="text-blue-600 hover:text-blue-800 font-semibold text-sm underline underline-offset-4"
    >
      Change Settings
    </button>
  </div>
);

export default ConfigDisplay;