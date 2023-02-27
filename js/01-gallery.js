import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");

const galleryCardsMarkup = createGalleryCardsMarkup(galleryItems);
populateList(galleryCardsMarkup);

galleryRef.addEventListener("click", handleClickGalleryImage);

function createGalleryCardsMarkup(imgItems) {
  return imgItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>
      `;
    })
    .join("");
}

function populateList(markup) {
  galleryRef.innerHTML = markup;
}

function handleClickGalleryImage(evt) {
  evt.preventDefault(); // скасовує поведінку браузера за замовчуванням (відкривання посилання в новому вікні)

  const isGalleryImageRef = evt.target.classList.contains("gallery__image");
  if (!isGalleryImageRef) {
    return;
  }
  // if (evt.target.nodeName !== "IMG") { return; }
  console.log("Клікнули по IMG з атрибутом src:", evt.target.dataset.source);

  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${evt.target.dataset.source}">`,

    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(evt) {
    const ESC_KEY_CODE = "Escape";
    console.log(evt.code);

    if (evt.code === ESC_KEY_CODE) {
      instance.close();
    }
  }
}
