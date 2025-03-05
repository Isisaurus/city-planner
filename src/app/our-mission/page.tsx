import { MissionCards } from "@/components/ui";

export default function MissionPage() {
  return (
    <section className="section container">
      <h1>Our mission</h1>
      <div className="my-20">
        <MissionCards />
      </div>
      <p>
        <strong>Our mission is simple:</strong> We believe in open cities,
        active communities, and the power of everyday people to shape the places
        they live. Through transparency, participation, and engagement, we’re
        building a model where{" "}
        <em>citizens don’t just live in a city—they help create it.</em>
      </p>
    </section>
  );
}
