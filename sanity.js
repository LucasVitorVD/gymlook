const PROJECT_ID = 'wqlr40wg';
const DATASET = 'production';
const API_VERSION = '2025-02-06';

export async function fetchProducts() {
  const query = encodeURIComponent(
    `*[_type == "product"] | order(name asc) {
      name,
      category,
      type,
      price,
      description,
      sizes,
      colors,
      "images": images[] {
        colorName,
        "imageUrl": image.asset->url
      }
    }`
  );
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao buscar produtos: ${res.status}`);
  const { result } = await res.json();
  return result.map((p) => ({
    name: p.name,
    cat: p.category,
    type: p.type,
    price: p.price,
    desc: p.description,
    sizes: p.sizes || [],
    colors: (p.colors || []).map((c) => c.name),
    colorHex: (p.colors || []).reduce((acc, c) => { acc[c.name] = c.hex; return acc; }, {}),
    images: (p.images || []).map((img) => ({
      colorName: img.colorName,
      imageUrl: img.imageUrl || null,
    })),
  }));
}
