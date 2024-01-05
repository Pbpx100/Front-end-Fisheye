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
