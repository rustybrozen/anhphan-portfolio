'use client';

import { useState, useEffect, ElementType } from 'react';
import { Save, Image as ImageIcon, Loader2, Github, Twitter, Facebook, Instagram, Linkedin, MessageCircle, BarChart3 } from 'lucide-react';


const DEFAULT_STATS = [
  { value: '05+', label: 'Years Exp.' },
  { value: '52', label: 'Projects' },
  { value: '31', label: 'Clients' },
  { value: '15', label: 'Open Source' },
];

export default function GeneralTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    devNickname: '', 
    image: '',
    jobTitle: '',
    bio: '',
    contactEmail: '',
    phoneNumber: '', 
    address: '', 
    isOpenForWork: true, 
    socials: { 
        github: '', twitter: '', facebook: '', instagram: '', linkedin: '', reddit: ''
    },
    stats: DEFAULT_STATS
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            name: data.name || '',
            devNickname: data.devNickname || '',
            image: data.image || '',
            jobTitle: data.jobTitle || '',
            bio: data.bio || '',
            contactEmail: data.contactEmail || '',
            phoneNumber: data.phoneNumber || '',
            address: data.address || '',
            isOpenForWork: data.isOpenForWork ?? true,
            socials: {
                github: data.socials?.github || '',
                twitter: data.socials?.twitter || '',
                facebook: data.socials?.facebook || '',
                instagram: data.socials?.instagram || '',
                linkedin: data.socials?.linkedin || '',
                reddit: data.socials?.reddit || '',
            },
        
            stats: (data.stats && data.stats.length > 0) ? data.stats : DEFAULT_STATS
          });
        }
      } catch (error) { console.error(error); } 
      finally { setIsFetching(false); }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      alert("Profile updated successfully!");
    } catch {
      alert("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        socials: { ...formData.socials, [e.target.name]: e.target.value }
    });
  };


  const handleStatChange = (index: number, field: 'value' | 'label', newValue: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: newValue };
    setFormData({ ...formData, stats: newStats });
  };

  if (isFetching) return <div className="p-12 flex justify-center text-neutral-400"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight">General Info</h2>
          <p className="text-neutral-500 text-sm mt-1">Manage your profile, bio, stats, and contact info.</p>
        </div>
        <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        
      
        <div className="space-y-6">
             <h3 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white border-l-2 border-black dark:border-white pl-3">Identity</h3>
             
             <div className="flex items-start gap-6">
                <div className="size-24 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden relative shrink-0">
                    {formData.image ? <img src={formData.image} alt="Avatar" className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-neutral-400" />}
                </div>
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Avatar URL</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors font-mono" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Dev Nickname (Required)</label>
                    <input required name="devNickname" placeholder="Ex: HelloDev" value={formData.devNickname} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors font-bold" />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Job Title</label>
                <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" />
            </div>

             <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Bio</label>
                <textarea rows={3} name="bio" value={formData.bio} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors resize-none" />
            </div>
        </div>

     
        <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white border-l-2 border-black dark:border-white pl-3">Key Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {formData.stats.map((stat, index) => (
                    <div key={index} className="p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 space-y-3">
                        <div className="flex items-center gap-2 text-neutral-400 mb-1">
                            <BarChart3 size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Stat #{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-neutral-500">Value</label>
                            <input 
                                type="text" 
                                value={stat.value}
                                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                className="w-full bg-white dark:bg-[#0f0f0f] border border-neutral-200 dark:border-neutral-800 p-2 text-lg font-black tracking-tighter outline-none focus:border-black dark:focus:border-white transition-colors text-center"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-neutral-500">Label</label>
                            <input 
                                type="text" 
                                value={stat.label}
                                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-2 text-xs font-bold uppercase tracking-wider outline-none focus:border-black dark:focus:border-white transition-colors text-center"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>

     
        <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white border-l-2 border-black dark:border-white pl-3">Contact Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Public Email (Optional)</label>
                    <input type="email" name="contactEmail" placeholder="contact@example.com" value={formData.contactEmail} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Phone Number (Optional)</label>
                    <input type="tel" name="phoneNumber" placeholder="+84..." value={formData.phoneNumber} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" />
                </div>
            </div>
            <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Address / Location (Optional)</label>
                 <input type="text" name="address" placeholder="Ho Chi Minh City, Vietnam" value={formData.address} onChange={handleChange} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors" />
            </div>
        </div>

      
        <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white border-l-2 border-black dark:border-white pl-3">Social Presence</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
                 <SocialInput icon={Github} name="github" value={formData.socials.github} onChange={handleSocialChange} placeholder="Github Username" />
                 <SocialInput icon={Twitter} name="twitter" value={formData.socials.twitter} onChange={handleSocialChange} placeholder="X / Twitter Username" />
                 <SocialInput icon={Facebook} name="facebook" value={formData.socials.facebook} onChange={handleSocialChange} placeholder="Facebook Username" />
                 <SocialInput icon={Instagram} name="instagram" value={formData.socials.instagram} onChange={handleSocialChange} placeholder="Instagram Username" />
                 <SocialInput icon={Linkedin} name="linkedin" value={formData.socials.linkedin} onChange={handleSocialChange} placeholder="LinkedIn Username" />
                 <SocialInput icon={MessageCircle} name="reddit" value={formData.socials.reddit} onChange={handleSocialChange} placeholder="Reddit Username" />
            </div>
        </div>

      
        <div className="space-y-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
             <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800">
                <div>
                    <h4 className="font-bold text-sm uppercase">Open for Work</h4>
                    <p className="text-xs text-neutral-500">Are you currently accepting new projects or freelance work?</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.isOpenForWork} onChange={(e) => setFormData({...formData, isOpenForWork: e.target.checked})} />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
             </div>
        </div>

      </form>
    </div>
  );
}

function SocialInput({ icon: Icon, name, value, onChange, placeholder }: { icon: ElementType, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) {
    return (
        <div className="flex items-center border border-neutral-200 dark:border-neutral-800 bg-transparent focus-within:border-black dark:focus-within:border-white transition-colors">
            <div className="p-3 border-r border-neutral-200 dark:border-neutral-800 text-neutral-500">
                <Icon size={16} />
            </div>
            <input 
                type="text" 
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                className="flex-1 bg-transparent p-3 text-sm outline-none placeholder:text-neutral-400"
            />
        </div>
    )
}