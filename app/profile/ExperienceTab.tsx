'use client';
import { Building2, Edit3, Plus, Trash2, X, Calendar, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";



export interface Experience {
  id: string;
  startDate: string;
  endDate: string | null;
  title: string;
  company: string;
  description: string;
  current: boolean;
  order: number;
}


const MonthYearPicker = ({ 
    label, 
    value, 
    onChange, 
    disabled = false 
}: { 
    label: string, 
    value: string, 
    onChange: (val: string) => void, 
    disabled?: boolean 
}) => {


    const [year, month] = value ? value.split('-') : ['', ''];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
    
   
    const months = [
        { val: '01', label: 'Jan' }, { val: '02', label: 'Feb' }, { val: '03', label: 'Mar' },
        { val: '04', label: 'Apr' }, { val: '05', label: 'May' }, { val: '06', label: 'Jun' },
        { val: '07', label: 'Jul' }, { val: '08', label: 'Aug' }, { val: '09', label: 'Sep' },
        { val: '10', label: 'Oct' }, { val: '11', label: 'Nov' }, { val: '12', label: 'Dec' },
    ];

    const handleChange = (newYear: string, newMonth: string) => {
        if (newYear && newMonth) {
            onChange(`${newYear}-${newMonth}`);
        } else if (newYear) {
            onChange(`${newYear}-01`);
        }
    };


    return (
        <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${disabled ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500'}`}>
                {label}
            </label>
            <div className="flex gap-2">
              
                <div className="relative flex-1">
                    <select 
                        disabled={disabled}
                        value={month}
                        onChange={(e) => handleChange(year || currentYear.toString(), e.target.value)}
                        className="w-full appearance-none bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="" disabled>Month</option>
                        {months.map(m => (
                            <option key={m.val} value={m.val} className="bg-white dark:bg-[#111]">{m.label}</option>
                        ))}
                    </select>
            
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>

           

                <div className="relative flex-1">
                    <select 
                        disabled={disabled}
                        value={year}
                        onChange={(e) => handleChange(e.target.value, month || '01')}
                        className="w-full appearance-none bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="" disabled>Year</option>
                        {years.map(y => (
                            <option key={y} value={y} className="bg-white dark:bg-[#111]">{y}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};


export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpModalOpen, setExpModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);


  const [formData, setFormData] = useState({
    company: '', 
    startDate: '', 
    endDate: '', 
    title: '',description: '', current: false
  });


  const fetchExperience = async () => {
    try {
      const res = await fetch('/api/exp');
      if (res.ok) setExperiences(await res.json());
    } catch (error) { console.error(error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchExperience(); }, []);


  const formatDateDisplay = (isoString: string) => {
      if (!isoString) return "";
      try {
          return format(new Date(isoString), "MMM yyyy");
      } catch { return isoString; }
  };


  const handleOpenModal = (item?: Experience) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        ...item,
        startDate: item.startDate ? item.startDate.substring(0, 7) : '',
        endDate: item.endDate ? item.endDate.substring(0, 7) : '',
      });
    } else {
      setEditingId(null);

      const now = new Date();
      const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      setFormData({ company: '', startDate: currentMonthStr, endDate: '', title: '', description: '', current: false });
    }
    setExpModalOpen(true);
  }


  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = editingId ? `/api/exp/${editingId}` : '/api/exp';
      const method = editingId ? 'PATCH' : 'POST';

  
      const payload = {
          ...formData,
          startDate: formData.startDate ? `${formData.startDate}-01T00:00:00Z` : null,
          endDate: formData.current ? null : (formData.endDate ? `${formData.endDate}-01T00:00:00Z` : null)
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setExpModalOpen(false);
        fetchExperience();
      } else { alert("Lỗi lưu dữ liệu"); }
    } catch (error) { console.error(error); } 
    finally { setIsSaving(false); }
  };

  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    await fetch(`/api/exp/${id}`, { method: 'DELETE' });
    fetchExperience();
  };


  const handleMove = async (index: number, direction: 'up' | 'down') => {
      const newExperiences = [...experiences];
      if (direction === 'up') {
          if (index === 0) return;
          [newExperiences[index], newExperiences[index - 1]] = [newExperiences[index - 1], newExperiences[index]];
      } else {
          if (index === newExperiences.length - 1) return;
          [newExperiences[index], newExperiences[index + 1]] = [newExperiences[index + 1], newExperiences[index]];
      }
      setExperiences(newExperiences);
      const orderPayload = newExperiences.map((item, idx) => ({ id: item.id, order: idx }));
      try {
          await fetch('/api/exp/reorder', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: orderPayload })
          });
      } catch  { fetchExperience(); }
  };

  if (isLoading) return <div className="p-12 flex justify-center text-neutral-400"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight">Experience</h2>
          <p className="text-neutral-500 text-sm mt-1">Manage your career timeline.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 text-sm font-bold uppercase tracking-wider transition-opacity">
          <Plus size={16} /> Add Role
        </button>
      </div>

      <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-4 md:ml-6 space-y-4 py-2">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 md:pl-12 group transition-all duration-300">
            <div className={`absolute -left-[5px] top-6 size-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 ${exp.current ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`} />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 p-5 border border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark hover:border-black dark:hover:border-white transition-colors">
                <div className="flex flex-col gap-1 pr-2 border-r border-neutral-100 dark:border-neutral-800 mr-2 self-center">
                    <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400 hover:text-black dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronUp size={16} />
                    </button>
                    <button onClick={() => handleMove(index, 'down')} disabled={index === experiences.length - 1} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded text-neutral-400 hover:text-black dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed">
                        <ChevronDown size={16} />
                    </button>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                            <Calendar size={12}/> 
                            {formatDateDisplay(exp.startDate)} - {exp.current ? "Present" : formatDateDisplay(exp.endDate || '')}
                        </span>
                        {exp.current && (
                             <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Current</span>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-bold">{exp.title}</h3>

                    
                    <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 text-sm font-medium mt-2">
                        <Building2 size={14} />
                        <span>{exp.company}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 self-start opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(exp)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                        <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <div className="text-center text-neutral-400 py-10 font-mono text-sm">No experience added yet.</div>}
      </div>


      {isExpModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white dark:bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white dark:bg-[#111] z-10">
                    <h3 className="text-lg font-bold uppercase tracking-tight">{editingId ? 'Edit Role' : 'Add New Role'}</h3>
                    <button onClick={() => setExpModalOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white"><X size={24}/></button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Company Name</label>
                            <input className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                            value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <MonthYearPicker 
                            label="Start Date" 
                            value={formData.startDate} 
                            onChange={(val) => setFormData({...formData, startDate: val})} 
                        />
                        <MonthYearPicker 
                            label="End Date" 
                            value={formData.endDate} 
                            onChange={(val) => setFormData({...formData, endDate: val})} 
                            disabled={formData.current}
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-0">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer size-5 appearance-none border border-neutral-300 dark:border-neutral-700 checked:bg-black dark:checked:bg-white rounded-sm transition-colors" 
                                    checked={formData.current} onChange={e => setFormData({...formData, current: e.target.checked})} />
                                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-3.5 text-white dark:text-black opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 14" fill="none">
                                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="text-sm font-medium group-hover:text-black dark:group-hover:text-white transition-colors">I am currently working here</span>
                        </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Job Title (EN)</label>
                             <input className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        </div>

                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Description (EN)</label>
                        <textarea rows={3} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    
    

                    <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0f0f0f] flex justify-end gap-3 sticky bottom-0">
                        <button onClick={() => setExpModalOpen(false)} className="px-6 py-2 text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Cancel</button>
                        <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50">
                            {isSaving ? 'Saving...' : 'Save Role'}
                        </button>
                    </div>
                </div>
           </div>
           </div>
      )}
    </div>
  );
}