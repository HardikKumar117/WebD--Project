import { create } from "zustand";
import { type User, type Blog } from "@/utils/types";
import { type BlogSchema } from "@/utils/schemas";
import { MOCK_USERS, MOCK_BLOGS } from "@/mock/data";

const mockApi = {
    login: (data: any) => new Promise<User>((resolve, reject) => setTimeout(() => { const user = MOCK_USERS.find(u => u.username === data.username && u.password === data.password); user ? resolve({ id: user.id, username: user.username, email: user.email }) : reject(new Error('Invalid credentials')); }, 500)),
    signup: (data: any) => new Promise<User>((resolve) => setTimeout(() => { const newUser = { id: `user-${Date.now()}`, username: data.username, email: data.email, password: data.password }; MOCK_USERS.push(newUser); resolve({ id: newUser.id, username: newUser.username, email: newUser.email }); }, 500)),
    getBlogs: () => new Promise<Blog[]>(resolve => setTimeout(() => resolve(MOCK_BLOGS), 800)),
    createBlog: (data: BlogSchema, author: User) => new Promise<Blog>(resolve => setTimeout(() => { const newBlog: Blog = { ...data, id: `blog-${Date.now()}`, authorId: author.id, tags: data.tags.split(',').map(t => t.trim()) }; MOCK_BLOGS.unshift(newBlog); resolve(newBlog); }, 500)),
};

interface AppState {
    user: User | null;
    users: User[];
    blogs: Blog[];
    searchTerm: string;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    fetchBlogs: () => Promise<void>;
    createBlog: (data: BlogSchema) => Promise<void>;
    setSearchTerm: (term: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
    user: null,
    users: [],
    blogs: [],
    searchTerm: "",
    login: async (data: any) => {
        const user = await mockApi.login(data);
        set({ user });
    },
    register: async (data: any) => {
        await mockApi.signup(data);
    },
    logout: () => {
        set({ user: null });
    },
    fetchBlogs: async () => {
        const blogs = await mockApi.getBlogs();
        const users = MOCK_USERS.map(({ password, ...user }) => user);
        set({ blogs: blogs, users:users });
    },
    createBlog: async (data: BlogSchema) => {
        const { user, fetchBlogs } = get();
        if (!user) throw new Error("Not authenticated");
        await mockApi.createBlog(data, user);
        await fetchBlogs();
    },
    setSearchTerm: (term: string) => set({ searchTerm: term })
}));
