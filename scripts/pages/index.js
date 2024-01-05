//Getting photographers data
async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json')
        if (!response.ok) {
            throw new Error('error', error)
        }
        const data = await response.json();
        const photographers = data
        return photographers
    } catch (error) {
        throw error
    }
}
//Displaying photographer data
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.innerHTML += userCardDOM;
    });
}
//Calling the functions when are ready
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

