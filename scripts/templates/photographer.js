function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, title, likes, date, price, video, image } = data;

    let picture = `assets/photographers/${portrait}`;
    //Getting the Information of each user in the homepage
    function getUserCardDOM() {
        var articleGetCard = `<article class="user-card">
        <a href="photographer.html?id=${id}">
        <figure>
                                <img src="${picture}" alt="${name}">
                                    <figcaption>
                                    <h2>${name}</h2>
                                    </figcaption>
                                    </figure>
                                    </a>
                                    <h3>${city + ', ' + country}</h3>
                                        <p>${tagline}</p>
                                        <span>${price + "€/jour"}</span>
                                        </article>`;

        return (articleGetCard);
    }
    //Getting the header information in the photographer page
    function mediaTemplate() {
        let personPicture = `assets/photographers/${portrait}`;

        var divHeaderPhotographer = `<section>
                                    <div class="perso_desc">
                                            <h1>${name}</h1>
                                            <h2>${city + ', ' + country}</h2>
                                            <p>${tagline}</p>
                                    </div>
                                    <button class="contact_button" id="btn_disp_cont_modal">Contactez-moi</button>
                                    <figure class="perso_photo">
                                        <img src="${personPicture}" alt="${name}"></img>
                                    </figure>
                                </section>
      `;
        return (divHeaderPhotographer);

    }
    
    //Getting the information of each Media in the photgrapher page
    function getUserCardMedia(namePhotograph) {
        namePhotograph = namePhotograph.split(/[\s-]+/)
        namePhotograph = namePhotograph[0]
        var mediaPhoto
        if (image) {
            mediaPhoto = `<img data-type="image" tabindex="0" class="media-item" src="assets/image/${namePhotograph}/${image}" alt="${title}">`;
        }
        if (video) {
            mediaPhoto = `<video tabindex="0" data-type="video" class="media-item" src="assets/image/${namePhotograph}/${video}" aria-label="${title}"></video>`;
        }
        var cardMedia = `<article class="filterArticles">
                            <figure>${mediaPhoto}</figure>
                            <div class="photo-desc">
                            <h3 class="titre">${title}</h3>
                                <span class="date-photos" hidden>${date}</span>
                                <div class="likes-number">
                                <span class="likes">${likes}</span>
                                <button class="like-button" title="like photo">
                                <span class="material-icons heart">favorite_border</span>
                                </button>
                                </div>
                                </div>
                            </article>`
        return (cardMedia);
    }

    return { name, picture, getUserCardDOM, mediaTemplate, getUserCardMedia }
}


    
