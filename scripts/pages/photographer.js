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

var listButtons = document.getElementsByClassName("list-elements-filtre")

for (let listButton of listButtons) {
    listButton.addEventListener("click", () => {
        trierAll(listButton);
    });
    listButton.addEventListener("keyup", (e) => {
        if (e.key === 'Enter' || e.key === 13) {
            trierAll(listButton);
        }
    });
}
function trierAll(trier) {

    const elementosArticles = document.querySelectorAll('.filterArticles')
    const arrayArticles = Array.from(elementosArticles)
    var contenedor = document.querySelector('.photo_section')
    select_value = trier.dataset.value

    console.log(select_value)

    function sortByTitle(a, b) {
        var h2a = a.querySelector('h3.titre').innerText.trim()
        var h2b = b.querySelector('h3.titre').innerText.trim()
        return h2a.localeCompare(h2b)
    }
    function sortByDate(a, b) {
        var dateA = new Date(a.querySelector('.date-photos').innerText)
        var dateB = new Date(b.querySelector('.date-photos').innerText)
        return dateA - dateB
    }
    function sortByPopularity(a, b) {
        var popularityA = parseInt(a.querySelector('.likes').innerText)
        var popularityB = parseInt(b.querySelector('.likes').innerText)
        return popularityB - popularityA
    }

    function sortDisplay(sortFunction) {
        arrayArticles.sort(sortFunction)
        arrayArticles.forEach((article) => {
            contenedor.appendChild(article)
        })
    }
    //Sort the articles
    function sortFu() {

        switch (select_value) {
            case 'titre':
                sortDisplay(sortByTitle)
                break;
            case 'date':
                sortDisplay(sortByDate)
                break;
            case 'popularity':
                sortDisplay(sortByPopularity)
                break;

            default:
                break;
        }
    }
    sortFu()

}
//Toggle the list trier

function toggleList() {
    var elementlick = document.querySelector('.arrow');
    var elementosLista = document.querySelector('.options-list');
    var hover = elementosLista.querySelectorAll('li')

    elementlick.innerText == 'expand_more' ? elementlick.innerHTML = 'expand_less' : elementlick.innerHTML = 'expand_more'
    for (let i = 1; i < hover.length; i++) {
        hover[i].style.display = (hover[i].style.display === 'block') ? 'none' : 'block';
        hover[i].style.display = (hover[i].classList.contains === 'd-line') ? hover[i].classList.remove('d-line') : hover[i].classList.add('d-line');
        //stopPropagation();
    }
}

//Toggle like and add a number of like or rest a number of like
function toggleLike(elementClick) {
    var elemt = elementClick.previousElementSibling
    const elemtChildIcon = elementClick.children[0]
    console.log(elemtChildIcon.innerText)

    var totalLikes = document.querySelector(".likesTotal")
    var totalLikesNum = parseInt(totalLikes.innerText)

    var likesNum = 0;
    if (elementClick.classList.contains('liked')) {
        elementClick.classList.remove('liked')
        elemtChildIcon.innerHTML = 'favorite_border'
        likesNum = parseInt(elemt.innerText)
        //console.log(elemt)
        likesNum--;
        totalLikesNum--
        elemt.innerHTML = likesNum
        totalLikes.innerHTML = totalLikesNum
    } else {
        elementClick.classList.add('liked')
        elemtChildIcon.innerHTML = 'favorite'
        likesNum = parseInt(elemt.innerText)
        likesNum++
        totalLikesNum++
        elemt.innerHTML = likesNum
        totalLikes.innerHTML = totalLikesNum
    }

}

