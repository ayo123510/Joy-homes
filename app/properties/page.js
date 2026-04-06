





import PropertyList from "../../components/PropertyList";

export default async function PropertiesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`, {
    cache: "no-store",
  });
  const properties = await res.json();

  if (!properties || properties.length === 0) {
    return <div>No property available</div>;
  }

  return (
    <div>
      <h2>Available Properties</h2>
      <PropertyList properties={properties} />
    </div>
  );
}
