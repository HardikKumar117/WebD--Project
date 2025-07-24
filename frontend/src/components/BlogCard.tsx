import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { type Blog } from "@/utils/types";

export const BlogCardComponent = ({ blog }: { blog: Blog }) => (
    <Card>
        <CardHeader>
            <Link to={`/blog/${blog.id}`}><CardTitle>{blog.title}</CardTitle></Link>
        </CardHeader>
        <CardContent><p>{blog.content}</p></CardContent>
        <CardFooter>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', flexGrow: 1}}>{blog.tags.map(tag => (<span key={tag}>{tag}</span>))}</div>
            <Link to={`/blog/${blog.id}`}>Read More &rarr;</Link>
        </CardFooter>
    </Card>
);
