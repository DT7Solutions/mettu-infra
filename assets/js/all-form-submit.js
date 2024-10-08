$(document).ready(function() {
    // Initialize EmailJS with your public key
    emailjs.init("your_public_key");

    if ($("#phone-form").length > 0) {
        var input = document.querySelector("#mobile_code");
        var iti = window.intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        input.addEventListener('keypress', function(e) {
            if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
        });

        document.getElementById('main_category').addEventListener('change', function() {
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

        // Show modal once per session
        if (!sessionStorage.getItem('modalShown')) {
            setTimeout(function() {
                $('#phoneModal').modal('show');
                sessionStorage.setItem('modalShown', 'true');
            }, 100);
        }

        // =================Modal Enquiry Form=================== //
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

                // Send form data using EmailJS
                emailjs.send('your_service_id', 'your_template_id', formData)
                    .then(function(response) {
                        console.log("Enquiry Form submitted successfully!", JSON.stringify(formData, null, 2));
                        alert("Form submitted successfully!");

                        $("#phone-form")[0].reset();
                        iti.setNumber(""); 
                        $('#phoneModal').modal('hide');
                    }, function(error) {
                        console.error("Failed to submit form. Please Try Again.", error);
                        alert("Failed to submit form. Please try again.");
                    });
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }

    // ===================Contact Form===================== //
    $('.contact-form').each(function() {
        var formInstance = $(this);

        formInstance.submit(function(event) {
            event.preventDefault();

            $("#message").slideUp(750, function() {
                $('#message').hide();

                $('#submit')
                    .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');

                var formData = {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    comments: $('#comments').val()
                };

                // Send form data using EmailJS
                emailjs.send('your_service_id', 'your_template_id', formData)
                    .then(function(response) {
                        console.log("Contact Form submitted successfully!", JSON.stringify(formData, null, 2));
                        document.getElementById('message').innerHTML = "<div class='alert alert-success'>Message sent successfully!</div>";
                        $('#message').slideDown('slow');
                        $('.contact-form img.loader').fadeOut('slow', function() {
                            $(this).remove();
                        });
                        $('#submit').removeAttr('disabled');

                        formInstance[0].reset();
                    }, function(error) {
                        console.error("Failed to submit form. Please Try Again.", error);
                        document.getElementById('message').innerHTML = "<div class='alert alert-danger'>Failed to send message. Please try again.</div>";
                        $('#message').slideDown('slow');
                        $('.contact-form img.loader').fadeOut('slow', function() {
                            $(this).remove();
                        });
                        $('#submit').removeAttr('disabled');
                    });
            });
        });
    });
});
