interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PasswordForm: React.FC<Props> = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Paste App Password
      </label>
      <input
        type="password"
        placeholder="xxxx xxxx xxxx xxxx"
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        value={value}
        onChange={onChange}
        required
      />
    </div>
    <button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
    >
      Save Configuration
    </button>
  </form>
);

export default PasswordForm;