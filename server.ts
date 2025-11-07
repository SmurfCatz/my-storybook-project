import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. กำหนด Schema
const typeDefs = `#graphql
  type Contact {
    id: ID!
    name: String!
    phone: String!
    position: String!
    avatar: String!
  }

  type About {
    title: String!
    description: String!
  }

  type Author {
    id: ID!
    name: String!
    bio: String
    avatar: String
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    coverImage: String
    createdAt: String!
    updatedAt: String
    author: Author!
    tags: [String!]
  }

  type Query {
    contacts: [Contact!]!
    about: [About!]!
    authors: [Author!]!
    blogs: [Blog!]!
    blog(id: ID!): Blog
    blogByAuthor(authorId: ID!): [Blog!]
    searchBlogs(keyword: String!): [Blog!]
  }

  type Mutation {
    createBlog(
      title: String!
      content: String!
      coverImage: String
      authorId: ID!
      tags: [String!]
    ): Blog!

    updateBlog(
      id: ID!
      title: String
      content: String
      coverImage: String
      tags: [String]
    ): Blog!
  }
`;

// 2. ข้อมูลจำลอง
const contacts = [
  { id: '1', name: 'ธานอส สมบัติพูน', phone: '081-234-5678', position: 'ผู้ดูแลระบบ', avatar: 'https://picsum.photos/100?random=1' },
  { id: '2', name: 'กิตติชัย สุนทร', phone: '082-987-6543', position: 'นักพัฒนา', avatar: 'https://picsum.photos/100?random=2' },
  { id: '3', name: 'วรัญญา ภักดีผล', phone: '083-456-7890', position: 'นักออกแบบ UI/UX', avatar: 'https://picsum.photos/100?random=3' },
];

const about = [
  {
    title: 'เกี่ยวกับเรา',
    description: 'My Storybook นี้เป็น project สำหรับการฝึกใช้ Storybook, GraphQL และการเขียนแบบ Components',
  },
];

const authors = [
  { id: '1', name: 'ธานอส สมบัติพูน', bio: 'นักพัฒนาเว็บผู้ชื่นชอบ GraphQL และ React', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '2', name: 'กิตติชัย สุนทร', bio: 'Frontend Developer ที่หลงใหลใน TypeScript และ Storybook', avatar: 'https://i.pravatar.cc/150?img=4' },
];

let blogs: BlogType[] = [
  {
    id: '1',
    title: 'เริ่มต้นกับ GraphQL',
    content: 'GraphQL คือภาษาสำหรับ query API ที่ช่วยให้ client ขอข้อมูลเฉพาะที่ต้องการได้...',
    coverImage: 'https://picsum.photos/600/300?random=10',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    authorId: '1',
    tags: ['GraphQL', 'API', 'Backend'],
  },
  {
    id: '2',
    title: 'Storybook คืออะไร?',
    content: 'Storybook เป็นเครื่องมือสำหรับพัฒนา UI component อย่างอิสระและทดสอบได้สะดวก...',
    coverImage: 'https://picsum.photos/600/300?random=11',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    authorId: '2',
    tags: ['UI', 'React', 'Storybook'],
  },
  {
    id: '3',
    title: 'GraphQL และ Storybook คืออะไร?',
    content: 'GraphQL คือภาษาสำหรับ query API ที่ช่วยให้ client ขอข้อมูลเฉพาะที่ต้องการได้...',
    coverImage: 'https://picsum.photos/600/300?random=12',
    createdAt: new Date().toISOString(),
    updatedAt: null,
    authorId: '1',
    tags: ['GraphQL', 'API', 'Backend'],
  },
];
// ✅ TypeScript interfaces (อยู่นอก typeDefs)
type CreateBlogArgs = {
  title: string;
  content: string;
  coverImage?: string;
  authorId: string;
  tags?: string[];
};

type UpdateBlogArgs = {
  id: string;
  title?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
};

type BlogType = {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string | null;
  authorId: string;
  tags: string[];
};

// 3. Resolver
const resolvers = {
  Query: {
    contacts: () => contacts,
    about: () => about,
    authors: () => authors,
    blogs: () =>
      blogs.map((b) => ({
        ...b,
        author: authors.find((a) => a.id === b.authorId),
      })),
    blog: (_: unknown, { id }: { id: string }) => {
      const blog = blogs.find((b) => b.id === id);
      return blog ? { ...blog, author: authors.find((a) => a.id === blog.authorId) } : null;
    },
    blogByAuthor: (_: unknown, { authorId }: { authorId: string }) =>
      blogs
        .filter((b) => b.authorId === authorId)
        .map((b) => ({ ...b, author: authors.find((a) => a.id === b.authorId) })),
    searchBlogs: (_: unknown, { keyword }: { keyword: string }) =>
      blogs
        .filter((b) =>
          b.title.toLowerCase().includes(keyword.toLowerCase()) ||
          b.content.toLowerCase().includes(keyword.toLowerCase())
        )
        .map((b) => ({ ...b, author: authors.find((a) => a.id === b.authorId) })),
  },

  Mutation: {
    createBlog: (_: unknown, { title, content, coverImage, authorId, tags }: CreateBlogArgs) => {
      const newBlog = {
        id: String(blogs.length + 1),
        title,
        content,
        // 👇 ถ้าไม่มี coverImage ให้สุ่ม
        coverImage: coverImage || `https://picsum.photos/600/300?random=${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: null,
        authorId,
        tags: tags || [],
      };

      blogs.push(newBlog);
      return {
        ...newBlog,
        author: authors.find((a) => a.id === authorId),
      };
    },

    updateBlog: (_: unknown, { id, title, content, coverImage, tags }: UpdateBlogArgs) => {
      const blogIndex = blogs.findIndex((b) => b.id === id);
      if (blogIndex === -1) throw new Error('ไม่พบบทความ');

      const updatedBlog = {
        ...blogs[blogIndex],
        title: title ?? blogs[blogIndex].title,
        content: content ?? blogs[blogIndex].content,
        coverImage: coverImage ?? blogs[blogIndex].coverImage,
        tags: tags ?? blogs[blogIndex].tags,
        updatedAt: new Date().toISOString(),
      };

      blogs[blogIndex] = updatedBlog;

      return {
        ...updatedBlog,
        author: authors.find((a) => a.id === updatedBlog.authorId),
      };
    },
  },
};

// 4. สร้างและเริ่มเซิร์ฟเวอร์
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
