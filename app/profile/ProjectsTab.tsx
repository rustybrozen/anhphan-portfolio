'use client';

import { useState, useEffect } from "react";
import { Edit3, ImageIcon, Plus, Trash2, X, Loader2, Star, Link as LinkIcon, ExternalLink } from "lucide-react";


interface Project {
  id: string;
  title: string;
  description?: string;
  techStack: string; 
  image?: string;
  link?: string; 
  featured: boolean;
}

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', description: '', techStack: '', image: '', link: '', featured: false
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) setProjects(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', techStack: '', image: '', link: '', featured: false });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PATCH' : 'POST';
      

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProjects(); 
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProjects();
    } catch {
      alert("Failed to delete");
    }
  };

  if (isLoading) return <div className="p-12 flex justify-center text-neutral-400"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight">Projects</h2>
          <p className="text-neutral-500 text-sm mt-1">Showcase your best work.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
        >
          <Plus size={16} /> New Project
        </button>
      </div>


      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark hover:border-black dark:hover:border-white transition-colors gap-4">
            <div className="flex items-start gap-4">
              <div className="size-16 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 overflow-hidden relative">
                 {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                 ) : (
                    <ImageIcon size={24} className="text-neutral-400" />
                 )}
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                    {project.title}
                    {project.featured && <Star size={12} className="fill-yellow-500 text-yellow-500"/>}
                   
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-500 ml-1" title="View Demo">
                            <ExternalLink size={14} />
                        </a>
                    )}
                </h3>
  
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.split(',').map((tech, i) => (
                        <span key={i} className="text-[10px] bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-sm font-mono border border-neutral-200 dark:border-neutral-700">
                            {tech.trim()}
                        </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button onClick={() => openModal(project)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                <Edit3 size={18} />
              </button>
              <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div className="text-center text-neutral-400 py-10 font-mono text-sm">No projects yet. Create one!</div>}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white dark:bg-[#111] z-10">
              <h3 className="text-lg font-bold uppercase tracking-tight">
                {editingId ? 'Edit Project' : 'Create New Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-black dark:hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Project Name</label>
                        <input className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
    
                </div>
                
             
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Demo / Live Link</label>
                    <div className="flex gap-2">
                         <input className="flex-1 bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                            placeholder="https://my-awesome-project.com" value={formData.link || ''} onChange={e => setFormData({...formData, link: e.target.value})} />
                         <div className="px-4 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 bg-neutral-50 dark:bg-neutral-900">
                             <LinkIcon size={16} className="text-neutral-400"/>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Thumbnail URL</label>
                    <div className="flex gap-2">
                        <input className="flex-1 bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                            placeholder="https://..." value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                        <div className="size-11 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0">
                             {formData.image ? <img src={formData.image} className="size-full object-cover"/> : <ImageIcon size={18}/>}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Description (EN)</label>
                         <textarea rows={4} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors resize-none" 
                            value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
  
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Tech Stack (comma separated)</label>
                    <input className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 p-3 text-sm outline-none focus:border-black dark:focus:border-white transition-colors" 
                        placeholder="React, Next.js, TypeScript..." value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="size-4 accent-black dark:accent-white" 
                            checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                        <span className="text-sm font-medium">Featured Project (Show on Home)</span>
                    </label>
                </div>
            </div>

            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0f0f0f] flex justify-end gap-3 sticky bottom-0">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50">
                    {isSaving ? 'Saving...' : 'Save Project'}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}