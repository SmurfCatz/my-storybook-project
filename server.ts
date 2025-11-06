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

  type Query {
    contacts: [Contact!]!
  }
`;

// 2. ข้อมูลจำลอง
const contacts = [
  {
    id: '1',
    name: 'ธานอส สมบัติพูน',
    phone: '081-234-5678',
    position: 'ผู้ดูแลระบบ',
    avatar: 'https://picsum.photos/100?random=1',
  },
  {
    id: '2',
    name: 'กิตติชัย สุนทร',
    phone: '082-987-6543',
    position: 'นักพัฒนา',
    avatar: 'https://picsum.photos/100?random=2',
  },
  {
    id: '3',
    name: 'วรัญญา ภักดีผล',
    phone: '083-456-7890',
    position: 'นักออกแบบ UI/UX',
    avatar: 'https://picsum.photos/100?random=3',
  },
];

// 3. Resolver
const resolvers = {
  Query: {
    contacts: () => contacts,
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
