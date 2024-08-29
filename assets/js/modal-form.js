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

    document.getElementById('main_category').addEventListener('change', function () {
        var enquiryOptions = document.getElementById('enquiries-options');
        if (this.value === 'enquiries') {
            enquiryOptions.style.display = 'block';
        } else {
            enquiryOptions.style.display = 'none';
        }
    });
    
    // setTimeout(function(){
    //     $('#phoneModal').modal('show');
    // },200);
    
    // Show modal once per session
    if (!sessionStorage.getItem('modalShown')) {
        setTimeout(function() {
            $('#phoneModal').modal('show');
            sessionStorage.setItem('modalShown', 'true'); // Set flag in localStorage
        }, 100);
    }

    $("#phone-form").on("submit", function(event) {
        event.preventDefault();

        if (this.checkValidity()) {
            var formData = {
                fullName: document.getElementById('full_name').value,
                phoneNumber1: iti.getNumber(),
                mainCategory: document.getElementById('main_category').value,
                subCategory: document.getElementById('sub_category') ? document.getElementById('sub_category').value : null
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