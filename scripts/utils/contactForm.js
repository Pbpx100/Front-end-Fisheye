
//Applying the contact form contactez-moi
function contactFormFunc() {

    const modal = document.getElementById("contact_modal");
    const btnDispContModal = document.getElementById('btn_disp_cont_modal')
    const btnCloseModalCont = document.getElementById("btn_close_cont_modal")
    const ButtonDataSend = document.getElementById('btn_cont_send')



    function displayModal() {
        modal.style.display = "flex";
    }

    function closeModal() {
        modal.style.display = "none";
    }
    function contactData(e) {
        e.preventDefault();
        var formData = document.getElementById('contact-form')
        var elements = formData.elements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            console.log(element.value);
            element.value = ''
            closeModal()

        }
    }
    btnCloseModalCont.addEventListener("click", (e) => {
        closeModal()
    });
    btnCloseModalCont.addEventListener('keyup', (e) => {
        if (e.key == 'Enter' || e.key == 13) {
            closeModal()
        }
    });

    btnDispContModal.addEventListener("click", () => {
        displayModal()

    });

    btnDispContModal.addEventListener("keyup", (e) => {
        if (e.key == 'Enter') {
            displayModal()
        }
    });

    ButtonDataSend.addEventListener("click", (e) => {
        contactData(e);
    });
    ButtonDataSend.addEventListener("keyup", (e) => {
        if (e.key == 'Enter') {
            contactData(e);
        }

    });
}
