import { type User, type Blog } from "@/utils/types";

export const MOCK_USERS: (User & { password?: string })[] = [ 
    { id: 'user-1', username: 'Hardik', email: 'hardik@example.com', password: 'password123' },
    { id: 'user-2', username: 'Aaditya Gautam', email: 'aaditya@example.com', password: 'password123' }
];

export const MOCK_BLOGS: Blog[] = [
    { id: 'blog-1', title: 'Exploring the new React Compiler', content: 'The React team has been working on a new compiler that promises to revolutionize how we write React code...', authorId: 'user-1', tags: ['react', 'compiler', 'javascript'] },
    { id: 'blog-2', title: 'A Guide to Modern CSS Layouts', content: 'Flexbox and Grid have completely changed the game for web layouts...', authorId: 'user-2', tags: ['css', 'webdev', 'layout'] },
];