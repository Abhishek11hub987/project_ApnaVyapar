'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddIdeaModal from './add-idea-modal';

export default function AdminIdeasHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Ideas Management</h1>
        <p className="text-gray-500 mt-2 font-medium">Moderate and manage the business ideas currently in the catalog.</p>
      </div>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <Plus size={18} /> Add New Idea
      </button>

      <AddIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
