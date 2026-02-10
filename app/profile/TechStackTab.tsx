/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from "react";
import { 
  LayoutGrid, Server, Database, Terminal, Brain, MoreHorizontal, 
  Plus, X, RotateCcw, Loader2
} from "lucide-react";


const ICON_MAP = [LayoutGrid, Server, Brain, Database, Terminal, MoreHorizontal];


const DEFAULT_STACK = [
  { category: "Frontend Ecosystem", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"] },
  { category: "Backend Infrastructure", items: ["NestJS", "Fastify", "Node.js", "Socket.IO", "C# (.NET)"] },
  { category: "AI & LLM Engineering", items: ["Python", "LangChain", "RAG Systems", "ChromaDB", "Ollama / vLLM", "Hugging Face"] },
  { category: "Data & DevOps", items: ["PostgreSQL", "Prisma", "Docker", "Coolify", "Redis"] },
  { category: "Tools & Workflow", items: ["Git/GitHub", "Linux (VPS)", "CI/CD", "Postman", "Figma"] },
  { category: "Others / Exploring", items: ["Go (Learning)", "WebAssembly", "UI/UX Design"] }
];

export default function TechStackTab() {
  const [stacks, setStacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isSaving, setIsSaving] = useState(false);  
  const [inputValues, setInputValues] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/techst');
        if (res.ok) {
          const data = await res.json();
    
          const mergedData = data.map((item: any, index: number) => ({
            ...item,
            icon: ICON_MAP[index] || MoreHorizontal
          }));
          setStacks(mergedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleSave = async () => {
    setIsSaving(true);
    try {
 
      const payload = stacks.map(({ category, items }) => ({ category, items }));
      
      const res = await fetch('/api/techst', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Tech stack updated successfully!");
      } else {
        alert("Failed to save changes.");
      }
    } catch  {
      alert("Error saving data.");
    } finally {
      setIsSaving(false);
    }
  };


  const handleReset = () => {
    if (confirm("Reset to default configuration?")) {
        const resetData = DEFAULT_STACK.map((item, index) => ({
            ...item,
            icon: ICON_MAP[index]
        }));
        setStacks(resetData);
    }
  };

  const handleAddItem = (categoryIndex: number) => {
    const val = inputValues[categoryIndex]?.trim();
    if (!val) return;
    const newStacks = [...stacks];
    if (!newStacks[categoryIndex].items.includes(val)) {
        newStacks[categoryIndex].items.push(val);
        setStacks(newStacks);
    }
    setInputValues({ ...inputValues, [categoryIndex]: '' });
  };

  const handleRemoveItem = (categoryIndex: number, itemToRemove: string) => {
    const newStacks = [...stacks];
    newStacks[categoryIndex].items = newStacks[categoryIndex].items.filter((i: any) => i !== itemToRemove);
    setStacks(newStacks);
  };

  const handleKeyDown = (e: React.KeyboardEvent, categoryIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(categoryIndex);
    }
  };

  if (isLoading) {
    return <div className="p-12 flex justify-center text-neutral-400"><Loader2 className="animate-spin"/></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
     
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tight">Tech Stack</h2>
          <p className="text-neutral-500 text-sm mt-1">Manage your skills and technologies.</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleReset} 
                className="flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white text-sm font-bold uppercase tracking-wider transition-colors" 
                title="Reset to Default"
            >
                <RotateCcw size={16} /> <span className="hidden sm:inline">Reset</span>
            </button>
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity disabled:opacity-50"
            >
                {isSaving ? <Loader2 size={16} className="animate-spin"/> : ""}
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stacks.map((stack, catIndex) => {
          const Icon = stack.icon || MoreHorizontal; // Lấy icon từ map
          return (
            <div key={stack.category || catIndex} className="flex flex-col border border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark h-full">
             
                <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151515]">
                    <div className="p-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-sm">
                        <Icon size={18} className="text-black dark:text-white" />
                    </div>
                    <h3 className="font-bold text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                        {stack.category}
                    </h3>
                </div>

           
                <div className="p-4 flex-1">
                    <div className="flex flex-wrap gap-2">
                        {stack.items.map((item: string) => (
                            <div key={item} className="group flex items-center gap-1.5 pl-3 pr-1 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono rounded-sm border border-transparent hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors">
                                <span>{item}</span>
                                <button onClick={() => handleRemoveItem(catIndex, item)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/50 text-neutral-400 hover:text-red-500 rounded transition-colors">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        {stack.items.length === 0 && <span className="text-xs text-neutral-400 italic py-1">No items yet...</span>}
                    </div>
                </div>

               
                <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2 px-2 rounded-md focus-within:bg-neutral-100 dark:focus-within:bg-neutral-800 transition-colors">
                        <Plus size={14} className="text-neutral-400" />
                        <input 
                            type="text" placeholder="Add tech..." 
                            className="w-full bg-transparent p-2 text-sm outline-none placeholder:text-neutral-400 font-mono text-black dark:text-white"
                            value={inputValues[catIndex] || ''}
                            onChange={(e) => setInputValues({...inputValues, [catIndex]: e.target.value})}
                            onKeyDown={(e) => handleKeyDown(e, catIndex)}
                        />
                    </div>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}