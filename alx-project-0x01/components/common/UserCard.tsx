import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { UserProps } from '../../interfaces';

interface UserCardProps {
    id: number;
    name: string;
    username?: string;
    email: string;
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    };
    address?: {
        street?: string;
        suite?: string;
        city?: string;
        zipcode?: string;
        geo?: {
            lat: string;
            lng: string;
        };
    };
    avatar?: string;
    role?: string;
    joinDate?: string;
    postsCount?: number;
    isActive?: boolean;
    skills?: string[];
}

const UserCard = <UserProps,>(props: UserCardProps) => {
    const {
        id,
        name,
        username,
        email,
        phone,
        website,
        company,
        address,
        avatar,
        role,
        joinDate,
        postsCount = 0,
        isActive = true,
        skills = [],
    } = props;
    // Generate initials from name
    const getInitials = (fullName: string) => {
        return fullName
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate a consistent color based on user ID
    const getAvatarColor = (userId: number) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-teal-500',
        ];
        return colors[userId % colors.length];
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-20 relative">
                <div className="absolute -bottom-8 left-6">
                    <div className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-lg ${avatar ? 'bg-gray-200' : getAvatarColor(id)}`}>
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt={name}
                                width={64}
                                height={64}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-white">{getInitials(name)}</span>
                        )}
                    </div>
                </div>

                {/* Status indicator */}
                <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full border-2 border-white ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-10 px-6 pb-6">
                {/* User Info */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                        {name}
                    </h3>
                    {username && (
                        <p className="text-sm text-gray-500 mb-1">@{username}</p>
                    )}
                    {role && (
                        <p className="text-sm font-medium text-blue-600 mb-2">{role}</p>
                    )}
                    {company?.name && (
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Company:</span> {company.name}
                        </p>
                    )}
                </div>

                {/* Contact Info */}
                <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{email}</span>
                    </div>

                    {phone && (
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{phone}</span>
                        </div>
                    )}

                    {website && (
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c0-5.385-4.365-9.741-9.741-9.741m0 0L3 12m9-9a9 9 0 019 9" />
                            </svg>
                            <a href={`https://${website}`} className="text-blue-500 hover:text-blue-700 truncate" target="_blank" rel="noopener noreferrer">
                                {website}
                            </a>
                        </div>
                    )}

                    {address?.city && (
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{address.city}</span>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                            {skills.slice(0, 3).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                            {skills.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                    +{skills.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Stats */}
                {(postsCount > 0 || joinDate) && (
                    <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                        {postsCount > 0 && (
                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">{postsCount}</div>
                                <div className="text-xs text-gray-500">Posts</div>
                            </div>
                        )}
                        {joinDate && (
                            <div className="text-center">
                                <div className="text-xs text-gray-500">
                                    Joined {new Date(joinDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Company catchphrase */}
                {company?.catchPhrase && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm italic text-gray-700">&ldquo;{company.catchPhrase}&rdquo;</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                        View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                        Contact
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;