import React from 'react';
import { useForm } from '../../Hooks/useForm';
import { isRequired } from '../../Utils/validators';

const TagForm = ({ initialValues = {}, onSubmit, buttonText = 'Save' }) => {
  const defaultValues = {
    name: '',
    slug: '',
    ...initialValues
  };

  const validate = (values) => {
    const errors = {};
    
    if (!isRequired(values.name)) {
      errors.name = 'Tag name is required';
    }
    
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(defaultValues, validate);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Tag Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.name ? 'border-red-300' : ''
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={values.slug}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="tag-slug"
        />
        <p className="mt-1 text-xs text-gray-500">
          URL-friendly version of the name. Leave empty to generate automatically.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default TagForm;