import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pagesService } from '../../Services';
import { useAuth } from '../../Services';
import { Link } from 'react-router-dom';

const PagesList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: pagesData, isLoading, error } = useQuery({
    queryKey: ['pages-admin'],
    queryFn: pagesService.getAllPagesAdmin,
    select: (data) => data.data || [],
    retry: 1
  });

  const deleteMutation = useMutation({
    mutationFn: pagesService.deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries(['pages-admin']);
    }
  });

  const pages = pagesData || [];
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  
  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">Error loading pages</div>
          <div className="text-sm opacity-70 mb-4">{error.message}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>
          Pages
        </h1>
        <Link
          to="/dashboard/pages/new"
          className="px-4 py-2 rounded-lg text-white"
          style={{backgroundColor: 'var(--color-primary)'}}
        >
          Add New Page
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          style={{
            backgroundColor: 'var(--color-base-200)',
            borderColor: 'var(--color-base-300)',
            color: 'var(--color-base-content)'
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{backgroundColor: 'var(--color-base-200)'}}>
              <th className="p-3 text-left border-b" style={{borderColor: 'var(--color-base-300)'}}>
                Title
              </th>
              <th className="p-3 text-left border-b" style={{borderColor: 'var(--color-base-300)'}}>
                Status
              </th>
              <th className="p-3 text-left border-b" style={{borderColor: 'var(--color-base-300)'}}>
                Template
              </th>
              <th className="p-3 text-left border-b" style={{borderColor: 'var(--color-base-300)'}}>
                Author
              </th>
              <th className="p-3 text-left border-b" style={{borderColor: 'var(--color-base-300)'}}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.map((page) => (
              <tr key={page._id} style={{backgroundColor: 'var(--color-base-100)'}}>
                <td className="p-3 border-b" style={{borderColor: 'var(--color-base-300)'}}>
                  <div>
                    <div className="font-medium" style={{color: 'var(--color-base-content)'}}>
                      {page.title}
                    </div>
                    <div className="text-sm opacity-70">/{page.slug}</div>
                  </div>
                </td>
                <td className="p-3 border-b" style={{borderColor: 'var(--color-base-300)'}}>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      page.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="p-3 border-b" style={{borderColor: 'var(--color-base-300)'}}>
                  {page.template}
                </td>
                <td className="p-3 border-b" style={{borderColor: 'var(--color-base-300)'}}>
                  {page.author?.name}
                </td>
                <td className="p-3 border-b" style={{borderColor: 'var(--color-base-300)'}}>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/pages/edit/${page._id}`}
                      className="px-3 py-1 text-sm rounded"
                      style={{backgroundColor: 'var(--color-secondary)', color: 'white'}}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(page._id)}
                      className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-8" style={{color: 'var(--color-base-content)'}}>
          No pages found.
        </div>
      )}
    </div>
  );
};

export default PagesList;