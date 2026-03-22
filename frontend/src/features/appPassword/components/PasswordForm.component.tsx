interface Props {
  email: string;
  password: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
  onCancel: () => void;
}

const PasswordForm: React.FC<Props> = ({ email, password, setEmail, setPassword, onSubmit, isEditing, onCancel }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Google Email Address</label>
      <input
        type="email"
        placeholder="yourname@gmail.com"
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">16-Character App Password</label>
      <input
        type="password"
        placeholder="xxxx xxxx xxxx xxxx"
        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className="flex gap-3">
      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
        {isEditing ? "Update Configuration" : "Save Configuration"}
      </button>
      {isEditing && (
        <button type="button" onClick={onCancel} className="text-slate-600 hover:bg-slate-100 py-3 px-6 rounded-lg transition">
          Cancel
        </button>
      )}
    </div>
  </form>
);

export default PasswordForm;