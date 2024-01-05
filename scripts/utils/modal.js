//Creating Modal for each picture or video
function ModalPhotoFunc() {
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightbox-content');
    var closeBtn = document.getElementById('closeBtn');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var currentIndex = 0;

    // Getting all the elements of the media
    var mediaItems = document.querySelectorAll('.media-item');


    // Open each element of the media
    mediaItems.forEach(function (mediaItem, index) {
        mediaItem.addEventListener('click', function () {
            currentIndex = index;
            showMedia();
            lightbox.style.display = 'flex';

        });
        mediaItem.addEventListener('keyup', function (e) {
            if (e.key == 'Enter') {

                currentIndex = index;
                showMedia();
                lightbox.style.display = 'flex';
            }
        });
    });


    // Close the element
    function showMedia() {
        //here we get the all the items and we add the currentindex that is the index we get type
        var clonedMedia = mediaItems[currentIndex].cloneNode();
        var clonedMediaType = mediaItems[currentIndex].dataset.type;
        lightboxContent.innerHTML = '';

        var titleMedia
        if (clonedMediaType === 'video') {
            titleMedia = clonedMedia.getAttribute('aria-label')
        } else if (clonedMediaType === 'image') {
            titleMedia = clonedMedia.alt

        }
        lightboxContent.appendChild(clonedMedia)
        lightboxContent.innerHTML += `<figcaption>${titleMedia}</figcaption>`

    }


    closeBtn.addEventListener("click", () => {
        lightbox.style.display = 'none';
        lightboxContent.innerHTML = '';
    })

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        showMedia();
    })

    // Navegation amoung the medias
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        showMedia();
    })

}
