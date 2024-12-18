import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../utils/api"; // Import API functions

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [apiKeys, setApiKeys] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });

  const [subscription, setSubscription] = useState({
    plan: "Pro",
    renewalDate: "2024-12-01",
  });

  const [userProfile, setUserProfile] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleApiKeyChange = (platform, value) => {
    setApiKeys({ ...apiKeys, [platform]: value });
  };

  const fetchUserProfile = async () => {
    try {
      const userData = await getUser(); // Fetch user data from the backend
      setUserProfile(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "profile") {
      fetchUserProfile(); // Fetch profile data when the Profile tab is active
    }
  }, [activeTab]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const response = await updateUser(updatedProfile); // Update user data in the backend
      alert("Profile updated successfully!");
      setUserProfile(response); // Update the state with the new profile data
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-700">Settings</h1>
        </div>
        {/* Tabs */}
        <div className="flex border-b text-gray-600">
          <button
            onClick={() => handleTabClick("profile")}
            className={`w-1/3 text-center py-4 border-b-2 ${
              activeTab === "profile" ? "border-blue-600 text-blue-600 font-bold" : ""
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabClick("api-keys")}
            className={`w-1/3 text-center py-4 border-b-2 ${
              activeTab === "api-keys" ? "border-blue-600 text-blue-600 font-bold" : ""
            }`}
          >
            API Keys
          </button>
          <button
            onClick={() => handleTabClick("subscription")}
            className={`w-1/3 text-center py-4 border-b-2 ${
              activeTab === "subscription" ? "border-blue-600 text-blue-600 font-bold" : ""
            }`}
          >
            Subscription
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "profile" && (
            <ProfileTab
              userProfile={userProfile}
              onUpdateProfile={handleProfileUpdate}
            />
          )}
          {activeTab === "api-keys" && (
            <ApiKeysTab apiKeys={apiKeys} onChange={handleApiKeyChange} />
          )}
          {activeTab === "subscription" && (
            <SubscriptionTab subscription={subscription} />
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ userProfile, onUpdateProfile }) => {
  const [profileData, setProfileData] = useState(userProfile);

  useEffect(() => {
    setProfileData(userProfile); // Update local state when userProfile changes
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(profileData); // Call the parent function to update the profile
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={profileData.password}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          onChange={(e) =>
            setProfileData({ ...profileData, profilePicture: e.target.files[0] })
          }
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

const ApiKeysTab = ({ apiKeys, onChange }) => (
  <form className="space-y-4">
    {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((platform) => (
      <div key={platform}>
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {platform} API Key
        </label>
        <input
          type="text"
          value={apiKeys[platform]}
          onChange={(e) => onChange(platform, e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
    ))}
    <button type="submit" className="btn btn-primary">
      Save API Keys
    </button>
  </form>
);

const SubscriptionTab = ({ subscription }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-800">
      Current Plan: {subscription.plan}
    </h2>
    <p className="text-gray-600">Renewal Date: {subscription.renewalDate}</p>
    <button className="mt-4 btn btn-primary">Manage Subscription</button>
    <button className="ml-4 btn btn-outline">Upgrade Plan</button>
  </div>
);

export default Settings;
