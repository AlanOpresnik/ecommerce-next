import Image from "next/image";
import Header from "../components/Header/Header";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";

export default function Home() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <FeaturedProducts />
      </section>
    </div>
  );
}
