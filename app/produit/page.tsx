import ProduitClientPage from "./ProduitClientPage";

export default async function ProduitPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string | string[] }>;
}) {
  const resolved = await searchParams;
  const productId = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;

  return <ProduitClientPage productId={productId} />;
}
