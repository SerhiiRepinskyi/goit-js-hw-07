import { myGalleryItems } from "./my-gallery-items.js";
console.log(myGalleryItems);
// ============================

const galleryRef = document.querySelector(".gallery");

const galleryCardsMarkup = createGalleryCardsMarkup(myGalleryItems);
populateList(galleryCardsMarkup);

function createGalleryCardsMarkup(imgItems) {
  return imgItems
    .map(({ preview, original, description }) => {
      return `
        <a class="gallery__item" href="${original}">
          <img
            loading="lazy"
            class="gallery__image"
            data-src="${preview}"
            alt="${description}"
          />
        </a>
      `;
    })
    .join("");
}

function populateList(markup) {
  galleryRef.innerHTML = markup;
}

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  //   captionPosition:	"bottom", // Default
  captionDelay: 250,
});

/*
 * Библіотека lazysizes
 * - feature detection
 */

if ("loading" in HTMLImageElement.prototype) {
  console.log("Браузер підтримує lazyload");
  addSrcAttrToLazyImages();
} else {
  console.log("Браузер НЕ підтримує lazyload");
  addLazySizesScript();
}

function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
}

function addLazySizesScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossorigin = "anonymous";
  script.referrerpolicy = "no-referrer";

  document.body.appendChild(script);
}
