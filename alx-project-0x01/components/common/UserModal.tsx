import { UserData, UserModalProps } from "@/interfaces";
import React, { useState } from "react";

const UserModal: React.FC<UserModalProps> = ({ onClose, onSubmit }) => {
    const [user, setUser] = useState<UserData>({
        id: 0,
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle nested properties for address and company
        if (name.startsWith('address.')) {
            const addressField = name.replace('address.', '') as keyof typeof user.address;
            setUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [addressField]: value
                }
            }));
        } else if (name.startsWith('company.')) {
            const companyField = name.replace('company.', '') as keyof typeof user.company;
            setUser((prevUser) => ({
                ...prevUser,
                company: {
                    ...prevUser.company,
                    [companyField]: value
                }
            }));
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(user);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Add New User</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-2xl font-bold transition-colors"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-blue-100 mt-2">Create a new user profile with complete information</p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            👤 Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    Username *
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            📞 Contact Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="website" className="block text-gray-700 font-medium mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={user.website}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter website URL"
                            />
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            🏠 Address Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address.street" className="block text-gray-700 font-medium mb-2">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    id="address.street"
                                    name="address.street"
                                    value={user.address.street}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter street address"
                                />
                            </div>

                            <div>
                                <label htmlFor="address.suite" className="block text-gray-700 font-medium mb-2">
                                    Suite/Apt
                                </label>
                                <input
                                    type="text"
                                    id="address.suite"
                                    name="address.suite"
                                    value={user.address.suite}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter suite/apartment"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address.city" className="block text-gray-700 font-medium mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="address.city"
                                    name="address.city"
                                    value={user.address.city}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter city"
                                />
                            </div>

                            <div>
                                <label htmlFor="address.zipcode" className="block text-gray-700 font-medium mb-2">
                                    ZIP Code
                                </label>
                                <input
                                    type="text"
                                    id="address.zipcode"
                                    name="address.zipcode"
                                    value={user.address.zipcode}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter ZIP code"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Company Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            🏢 Company Information
                        </h3>

                        <div>
                            <label htmlFor="company.name" className="block text-gray-700 font-medium mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="company.name"
                                name="company.name"
                                value={user.company.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div>
                            <label htmlFor="company.catchPhrase" className="block text-gray-700 font-medium mb-2">
                                Company Catchphrase
                            </label>
                            <input
                                type="text"
                                id="company.catchPhrase"
                                name="company.catchPhrase"
                                value={user.company.catchPhrase}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter company catchphrase"
                            />
                        </div>

                        <div>
                            <label htmlFor="company.bs" className="block text-gray-700 font-medium mb-2">
                                Company Description
                            </label>
                            <textarea
                                id="company.bs"
                                name="company.bs"
                                value={user.company.bs}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter company description or business"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;