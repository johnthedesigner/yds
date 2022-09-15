import { useProduct, SelectedVariantImage } from "@shopify/hydrogen/client";
import Image from "next/image";

export default function Gallery() {
  const { media, selectedVariant } = useProduct();

  if (!media.length) {
    return (
      <div className="gallery" tabIndex="-1">
        <Image
          className="gallery__image"
          src="/no-image.svg"
          layout="fill"
          alt="product image"
        />
      </div>
    );
  }

  return (
    <div className="gallery" tabIndex="-1">
      <SelectedVariantImage
        className="gallery__image"
        style={{ aspectRatio: 1, objectFit: "cover" }}
      />
    </div>
  );
}
