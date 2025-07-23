export type User={
    id: string;
    username: string;
    email: string;
}

export type Blog={
    id: string;
    title: string;
    content: string;
    authorId: string;
    tags: string[];
}
