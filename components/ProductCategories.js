import Link from "next/link";

const ProductCategories = ({ category }) => {
  const CategoryItem = ({ label, path }) => {
    if (category === label) {
      return <b>{label}</b>;
    } else {
      return <Link href={path}>{label}</Link>;
    }
  };

  return (
    <div className="product-detail__categories">
      <span>
        <em>Shop Categories</em>:{" "}
        <CategoryItem label="Dahlias" path="/shop/dahlias" /> |{" "}
        <CategoryItem label="Supplies" path="/shop/supplies" />
      </span>
    </div>
  );
};

export default ProductCategories;
