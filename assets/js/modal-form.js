// Enquary Form
$(document).ready(function() {
    var input = document.querySelector("#mobile_code");
    var iti = window.intlTelInput(input, {
        initialCountry: "in",
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    input.addEventListener('keypress', function(e) {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    });

    $('#phoneModal').modal('show');

    $("#phone-form").on("submit", function(event) {
        event.preventDefault();

        if (this.checkValidity()) {
            var formData = {
                firstName: document.getElementById('full_name').value,
                phoneNumber: iti.getNumber(),
                email: document.getElementById('email').value
            };
            console.log("Enquary Form submitted successfully!", JSON.stringify(formData, null, 2));
            alert("Form submitted successfully!");

            this.reset();
            iti.setNumber(""); 
            var myModalEl = document.getElementById('phoneModal');
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
        } else {
            alert("Please fill in all required fields.");
        }

    });
});