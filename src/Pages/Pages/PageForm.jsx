import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pagesService } from '../../Services';
import { useAuth } from '../../Services';

const PageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    template: 'default',
    metaDescription: ''
  });

  const { data: pageData } = useQuery({
    queryKey: ['page', id],
    queryFn: () => pagesService.getPageBySlug(id),
    enabled: isEdit,
    select: (data) => data.data
  });

  useEffect(() => {
    if (pageData) {
      setFormData({
        title: pageData.title || '',
        content: pageData.content || '',
        excerpt: pageData.excerpt || '',
        status: pageData.status || 'draft',
        template: pageData.template || 'default',
        metaDescription: pageData.metaDescription || ''
      });
    }
  }, [pageData]);

  const createMutation = useMutation({
    mutationFn: pagesService.createPage,
    onSuccess: () => {
      queryClient.invalidateQueries(['pages-admin']);
      navigate('/dashboard/pages');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => pagesService.updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['pages-admin']);
      navigate('/dashboard/pages');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateMutation.mutate({ id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{color: 'var(--color-base-content)'}}>
          {isEdit ? 'Edit Page' : 'Create New Page'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
                style={{
                  backgroundColor: 'var(--color-base-200)',
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 border rounded-lg" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
              <h3 className="font-medium mb-4" style={{color: 'var(--color-base-content)'}}>
                Page Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      borderColor: 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                    Template
                  </label>
                  <select
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    style={{
                      backgroundColor: 'var(--color-base-100)',
                      borderColor: 'var(--color-base-300)',
                      color: 'var(--color-base-content)'
                    }}
                  >
                    <option value="default">Default</option>
                    <option value="contact">Contact</option>
                    <option value="about">About</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg" style={{backgroundColor: 'var(--color-base-200)', borderColor: 'var(--color-base-300)'}}>
              <h3 className="font-medium mb-4" style={{color: 'var(--color-base-content)'}}>
                SEO
              </h3>

              <div>
                <label className="block text-sm font-medium mb-2" style={{color: 'var(--color-base-content)'}}>
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  maxLength={160}
                  className="w-full px-3 py-2 border rounded text-sm"
                  style={{
                    backgroundColor: 'var(--color-base-100)',
                    borderColor: 'var(--color-base-300)',
                    color: 'var(--color-base-content)'
                  }}
                />
                <div className="text-xs mt-1 opacity-70">
                  {formData.metaDescription.length}/160 characters
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 px-4 py-2 rounded-lg text-white"
                style={{backgroundColor: 'var(--color-primary)'}}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Page'
                  : 'Create Page'
                }
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/pages')}
                className="px-4 py-2 border rounded-lg"
                style={{
                  borderColor: 'var(--color-base-300)',
                  color: 'var(--color-base-content)'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageForm;