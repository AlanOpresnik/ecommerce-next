import Image from "next/image";
import Header from "../components/Header/Header";
import FeatuedServerWrapper from "@/components/FeaturedProducts/FeatuedServerWrapper";

export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        < FeatuedServerWrapper/>
      </section>
    </div>
  );
}
