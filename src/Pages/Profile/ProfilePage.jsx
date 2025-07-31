import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Services/AuthContext';
import { usersService } from '../../Services/api';
import { useTheme } from '../../Context/ThemeContext';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import ProfileHeader from './components/ProfileHeader';
import MessageAlert from './components/MessageAlert';
import ProfileCard from './components/ProfileCard';
import ProfileTabs from './components/ProfileTabs';
import ProfileForm from './components/ProfileForm';
import SecurityTab from './components/SecurityTab';
import PreferencesTab from './components/PreferencesTab';

const ProfilePage = () => {
  const { user, updateCurrentUser } = useContext(AuthContext);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = async (avatarUrl) => {
    setFormData(prev => ({ ...prev, avatar: avatarUrl }));
    
    try {
      const userId = user._id || user.id;
      if (!userId) throw new Error('User ID not found');
      
      const updatedData = { ...formData, avatar: avatarUrl };
      const updatedUser = await usersService.updateUser(userId, updatedData);
      updateCurrentUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save profile picture. Please try again.' });
      setFormData(prev => ({ ...prev, avatar: user.avatar || '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const userId = user._id || user.id;
      if (!userId) throw new Error('User ID not found');
      
      const updatedUser = await usersService.updateUser(userId, formData);
      updateCurrentUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'var(--color-error)',
      super_admin: 'var(--color-error)',
      editor: 'var(--color-secondary)',
      author: 'var(--color-primary)',
      contributor: 'var(--color-success)',
      subscriber: 'var(--color-base-content)'
    };
    return colors[role?.toLowerCase()] || colors.subscriber;
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--color-base-100) 0%, var(--color-base-200) 100%)`
    }}>
      <AnimatedBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader onBack={() => window.history.back()} />
        <MessageAlert message={message} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileCard 
            user={user}
            formData={formData}
            isEditing={isEditing}
            onAvatarChange={handleAvatarChange}
            getInitials={getInitials}
            getRoleColor={getRoleColor}
          />

          <div className="lg:col-span-2">
            <div className="backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden animate-fade-in-up border" style={{
              animationDelay: '0.2s',
              backgroundColor: 'var(--color-base-200)',
              borderColor: 'var(--color-base-300)',
              background: `linear-gradient(135deg, var(--color-base-200) 0%, var(--color-base-100) 100%)`
            }}>
              <ProfileTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="p-8">
                {activeTab === 'profile' && (
                  <ProfileForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    loading={loading}
                  />
                )}
                {activeTab === 'security' && <SecurityTab />}
                {activeTab === 'preferences' && <PreferencesTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;