
export default async function PropertyDetail({ params }) {
  const res = await fetch(`http://localhost:3000/api/properties?id=${params.id}`, { cache: 'no-store' })
  const property = await res.json()

  return (
    <main>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
    </main>
  )
}



