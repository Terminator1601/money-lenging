// pages/index.tsx
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Link href="/Auth/">Signup/Login</Link>
    </div>
  );
};

export default Home;
