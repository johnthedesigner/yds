import { useProduct, SelectedVariantImage } from "@shopify/hydrogen/client";

export default function Gallery() {
  const { media, selectedVariant } = useProduct();

  // const featuredMedia = selectedVariant.image || media[0].image;
  // const featuredMediaSrc = featuredMedia.url.split('?')[0];
  // const galleryMedia = media.filter((med) => {
  //   return !med.image.url.includes(featuredMediaSrc);
  // });

  if (!media.length) {
    return (
      <div className="gallery" tabIndex="-1">
        <img className="gallery__image" src="/no-image.svg" />
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
