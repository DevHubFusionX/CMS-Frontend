import React, { useState } from 'react';
import { useForm } from '../../Hooks/useForm';
import { isRequired, isValidEmail, minLength } from '../../Utils/validators';
import { USER_ROLES } from '../../Constants';
import UserModal from './UserModal';
import UserFormField from './UserFormField';
import UserRoleSelector from './UserRoleSelector';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const initialValues = user || {};
  const buttonText = user ? 'Update User' : 'Create User';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const defaultValues = {
    name: initialValues.name || '',
    email: initialValues.email || '',
    role: initialValues.role || USER_ROLES.AUTHOR,
    password: '',
    confirmPassword: '',
  };

  const isEditing = !!initialValues.id || !!initialValues._id;
  if (isEditing) {
    delete defaultValues.password;
    delete defaultValues.confirmPassword;
  }

  const validate = (values) => {
    const errors = {};
    
    if (!isRequired(values.name)) {
      errors.name = 'Name is required';
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!isRequired(values.email)) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!isEditing) {
      if (!isRequired(values.password)) {
        errors.password = 'Password is required';
      } else if (!minLength(values.password, 8)) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(defaultValues, validate);

  return (
    <UserModal title={user ? 'Edit User' : 'Create New User'} onClose={onCancel}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <UserFormField
          label="Full Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full name"
          error={errors.name}
          icon={<svg className="h-5 w-5" style={{color: 'var(--color-base-content)', opacity: 0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
        />

        <UserFormField
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email address"
          error={errors.email}
          icon={<svg className="h-5 w-5" style={{color: 'var(--color-base-content)', opacity: 0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
        />

        <UserRoleSelector selectedRole={values.role} onChange={handleChange} />

        {!isEditing && (
          <>
            <UserFormField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter password"
              error={errors.password}
              showToggle={true}
              showValue={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              icon={<svg className="h-5 w-5" style={{color: 'var(--color-base-content)', opacity: 0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
            />

            <UserFormField
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm password"
              error={errors.confirmPassword}
              showToggle={true}
              showValue={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={<svg className="h-5 w-5" style={{color: 'var(--color-base-content)', opacity: 0.5}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          </>
        )}

        <div className="pt-4 flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: 'var(--color-base-200)',
              borderColor: 'var(--color-base-300)',
              color: 'var(--color-base-content)'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-content)'
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isEditing ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              )}
            </svg>
            {buttonText}
          </button>
        </div>
      </form>
    </UserModal>
  );
};

export default UserForm;