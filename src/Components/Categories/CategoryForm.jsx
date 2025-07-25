import React from 'react';
import { useForm } from '../../Hooks/useForm';
import { isRequired, minLength } from '../../Utils/validators';

const CategoryForm = ({ initialValues = {}, onSubmit, buttonText = 'Save' }) => {
  const defaultValues = {
    name: '',
    slug: '',
    description: '',
    ...initialValues
  };

  const validate = (values) => {
    const errors = {};
    
    if (!isRequired(values.name)) {
      errors.name = 'Category name is required';
    } else if (!minLength(values.name, 2)) {
      errors.name = 'Category name must be at least 2 characters';
    }
    
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(defaultValues, validate);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.name ? 'border-red-400 bg-red-50' : 'hover:border-gray-400'
          }`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 animate-fade-in">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="category-slug"
        />
        <p className="mt-2 text-xs text-gray-500">
          URL-friendly version of the name. Leave empty to generate automatically.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm transition-all duration-200 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-blue-500 to-blue-600 py-2.5 px-5 text-sm font-medium text-white shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;