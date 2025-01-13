import { useState } from 'react';
// import Image from 'next/image';

export default function Settings({ isOpen, onClose, profile, onProfileUpdate }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileUpdate({ name, email, avatar });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0a1a14] bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="bg-[#0e261c] p-8 rounded-lg w-96">
        <h2 id="settings-title" className="text-2xl font-bold mb-4 text-white">
          Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label htmlFor="avatar" className="block text-white mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={avatar}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAvatar(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="bg-[#152922] text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-white mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#152922] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-white mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#152922] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#1c3b2e] text-white bg-[#1c3b2e] rounded hover:bg-[#234a3a] focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#98d948] text-black rounded hover:bg-[#8bc741] focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
