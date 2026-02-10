export default function FormInput({ label, type = "text", defaultValue, placeholder }: { label: string, type?: string, defaultValue?: string, placeholder?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors"
      />
    </div>
  );
}