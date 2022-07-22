import _ from 'lodash';
import {flattenConnection, Image} from '@shopify/hydrogen/client';
import {useState} from 'react';

const Gallery = ({product}) => {
  const galleryItems = flattenConnection(product.media);

  // Capture the index of currently selected image
  const [selectedImage, setSelectedImage] = useState(0);
  // Capture the index of the currently hovered image
  const [hoveredImage, setHoveredImage] = useState(null);

  // Use hovered image index for offset if present
  let currentOffset = hoveredImage != null ? hoveredImage : selectedImage;

  return (
    <>
      <div
        className="gallery"
        tabIndex="-1"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: 1,
          overflow: 'hidden',
        }}
      >
        {_.map(galleryItems, (item, index) => {
          let imageStyles = {
            position: 'absolute',
            top: 0,
            left: `${(index - currentOffset) * 100}%`,
            aspectRatio: 1,
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          };
          return (
            <Image
              key={item.image.id}
              className="gallery__image"
              src={item.image.url}
              style={imageStyles}
              width={2000}
              height={2000}
            />
          );
        })}
      </div>
      <div
        className="gallery__thumbnails"
        style={{
          textAlign: 'center',
          margin: '1rem',
          display: galleryItems.length > 1 ? 'block' : 'none', // Hide if there's less than two images
        }}
      >
        {_.map(galleryItems, (item, index) => {
          return (
            <Image
              key={item.image.id}
              className="gallery__thumbnail"
              src={item.image.url}
              width={50}
              height={50}
              style={{
                margin: '.5rem',
                boxShadow: index === selectedImage ? '0 0 0 1px #333' : 'none',
                opacity: index === selectedImage ? 1 : 0.75,
              }}
              onClick={() => {
                setSelectedImage(index);
              }}
              onMouseOver={() => {
                setHoveredImage(index);
              }}
              onMouseOut={() => {
                setHoveredImage(null);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
