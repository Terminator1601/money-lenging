// pages/index.tsx
import Link from "next/link";
import Header from "../../components/Header";
import Process from "../../components/Process";

const Home = () => {
  return (
    <div>
      <Header/>
      <Process/>
      <h1>Welcome to the App</h1>
      <Link href="/Auth/Client">use as client</Link>
      <br />
      <Link href="/Auth/Merchant">use as merchant</Link>
    </div>
  );
};

export default Home;
