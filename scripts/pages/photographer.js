async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json')
        if (!response.ok) {
            throw new Error('error', error)
        }
        const data = await response.json();
        const photographers = data
        //console.log(photographers)
        return photographers
    } catch (error) {
        console.error('error en el fetch')
        throw error;
    }
}

async function init() {
    // Récupère les données des photographers
    const { media, photographers } = await getPhotographers();
    const searchParams = new URLSearchParams(window.location.search);
    const headerPhotographerDiv = document.querySelector('#main-header');
    const divPhotographersection = document.querySelector(".photo_section")
    const name_phot_contact = document.querySelector("header h2");

    var id_photographer = searchParams.get('id');
    photographers.forEach((photographer) => {
        //Getting id photographers
        if (photographer.id == id_photographer) {
            var namePhotograph = photographer.name
            name_phot_contact.innerHTML += namePhotograph
            const personalPage = photographerTemplate(photographer);
            //Media template function creates the header of each photographer 
            const personalData = personalPage.mediaTemplate();
            headerPhotographerDiv.innerHTML += personalData
            //Applying the counter likes
            var total_likes = 0
            const clickCounter = document.querySelector('.click-counter')
            media.forEach((pictures) => {

                //verifyng the id of the pictures and matching with the photographer id
                if (pictures.photographerId == id_photographer) {
                    // Getting all the information for each objet media
                    const personalPagePhoto = photographerTemplate(pictures);
                    // Passing as parameter the name of the photographer to create url in the picture
                    const allPhotographPicts = personalPagePhoto.getUserCardMedia(namePhotograph);
                    //Adding all the information
                    divPhotographersection.innerHTML += allPhotographPicts
                    //counting the likes of each pictures to get the total likes
                    var counter_likes = parseInt(pictures.likes)
                    total_likes += counter_likes

                }
            });
            //Adding the total likes                        
            clickCounter.innerHTML += `
            <div class="like_number_heart">
            <p class="likesTotal">${total_likes}</p>
            <span class="material-icons">favorite</span>
            </div>
            <span class="pricePhotograph">${photographer.price}€/jour</span>`
        }
    });
    var selectButton = document.getElementById('selectButton')
    console.log(selectButton)
    selectButton.addEventListener('click', function () {
        toggleList();
    });
    var likeButtons = document.getElementsByClassName("like-button")
    for (let likeButton of likeButtons) {
        likeButton.addEventListener("click", () => {
            toggleLike(likeButton);
        })
        likeButton.addEventListener("keyup", (e) => {
            if (e.key == 'Enter' && e.key === 13) {
                toggleLike(likeButton);
            }
        })
    }
    contactFormFunc();
    ModalPhotoFunc();
}
init();
