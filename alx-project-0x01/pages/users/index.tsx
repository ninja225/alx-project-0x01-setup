import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import UserCard from '../../components/common/UserCard';
import UserModal from '../../components/common/UserModal';
import { UserData } from '../../interfaces';

// Sample user data - in a real app, this would come from an API or database
const sampleUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Developer',
        avatar: '/vercel.svg',
        joinDate: '2023-06-15',
        postsCount: 12,
        isActive: true,
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Designer',
        avatar: '/next.svg',
        joinDate: '2023-08-22',
        postsCount: 8,
        isActive: true,
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'Product Manager',
        avatar: '/file.svg',
        joinDate: '2023-05-10',
        postsCount: 15,
        isActive: false,
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        role: 'Developer',
        avatar: '/globe.svg',
        joinDate: '2023-09-03',
        postsCount: 6,
        isActive: true,
    },
];

interface ApiUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
}

interface SampleUser {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    joinDate: string;
    postsCount: number;
    isActive: boolean;
}

type User = ApiUser | SampleUser;

interface UsersPageProps {
    posts: ApiUser[];
}

const Users: React.FC<UsersPageProps> = ({ posts = [] }) => {
    // Use API data if available, otherwise fall back to sample data
    const users: User[] = posts.length > 0 ? posts : sampleUsers;

    // Use posts.map to process posts data
    const processedPosts = posts.map(post => ({
        ...post,
        displayName: `${post.name} (${post.username})`
    }));

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usersList, setUsersList] = useState<User[]>(users);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitUser = (newUser: UserData) => {
        // Generate a new ID for the user
        const newId = Math.max(...usersList.map(u => u.id), 0) + 1;
        const userWithId = { ...newUser, id: newId };

        // Add the new user to the list
        setUsersList(prevUsers => [...prevUsers, userWithId]);

        console.log('New user added:', userWithId);
    };
    return (
        <>
            <Head>
                <title>Users - ALX Project</title>
                <meta name="description" content="Browse all users on ALX Project" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen flex flex-col">
                <Header />

                <main className="flex-grow bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Header Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        Users Directory
                                    </h1>
                                    <p className="text-gray-600">
                                        Connect with developers, designers, and other professionals in our community.
                                    </p>
                                </div>
                                <div>
                                    <Button
                                        onClick={handleOpenModal}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add User
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter Section */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="Filter users by role"
                                >
                                    <option value="">All Roles</option>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="manager">Product Manager</option>
                                </select>
                                <select
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    aria-label="Filter users by status"
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {usersList.map((user: User) => (
                                <UserCard
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    username={'username' in user ? user.username : undefined}
                                    email={user.email}
                                    phone={'phone' in user ? user.phone : undefined}
                                    website={'website' in user ? user.website : undefined}
                                    company={'company' in user ? user.company : undefined}
                                    address={'address' in user ? user.address : undefined}
                                    role={'role' in user ? user.role : 'Member'}
                                    avatar={'avatar' in user ? user.avatar : undefined}
                                    joinDate={'joinDate' in user ? user.joinDate : undefined}
                                    postsCount={'postsCount' in user ? user.postsCount : 0}
                                    isActive={'isActive' in user ? user.isActive : true}
                                />
                            ))}
                        </div>

                        {/* Load More Section */}
                        <div className="mt-12 text-center">
                            <Button>
                                Load More Users
                            </Button>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>

            {/* User Modal */}
            {isModalOpen && (
                <UserModal
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitUser}
                />
            )}
        </>
    );
};

export async function getStaticProps() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const posts = await response.json()

    return {
        props: {
            posts
        }
    }
}

export default Users;