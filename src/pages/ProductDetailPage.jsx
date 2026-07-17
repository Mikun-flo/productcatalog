import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <section>
      <h1>Product Details</h1>
      <p>You are viewing product {id}.</p>
    </section>
  );
}

export default ProductDetailPage;
