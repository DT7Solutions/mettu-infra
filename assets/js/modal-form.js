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
        var enquiries = document.getElementById('enquiries');
        var others = document.getElementById('others');
        if (this.value === 'enquiries') {
            enquiries.style.display = 'block';
            others.style.display = 'none';
        } else if (this.value === 'others') {
            enquiries.style.display = 'none';
            others.style.display = 'block';
        } else {
            enquiries.style.display = 'none';
            others.style.display = 'none';
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
            var mainCategoryValue = document.getElementById('main_category').value;
            var subCategoryValue = null;
            if (mainCategoryValue === 'enquiries') {
                subCategoryValue = document.getElementById('sub_category').value;
            } else if (mainCategoryValue === 'others') {
                subCategoryValue = document.getElementById('others').querySelector('input').value;
            }
            var formData = {
                fullName: document.getElementById('full_name').value,
                phoneNumber: iti.getNumber(),
                mainCategory: mainCategoryValue,
                subCategory: subCategoryValue
            };
            console.log("Enquary Form submitted successfully!", JSON.stringify(formData, null, 2));
            alert("Form submitted successfully!");

            this.reset();
            iti.setNumber(""); 
            $('#phoneModal').modal('hide');
        } else {
            alert("Please fill in all required fields.");
        }

    });
});