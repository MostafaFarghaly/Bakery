document.addEventListener('DOMContentLoaded', () => {
const form = document.querySelector("#OrderOnline");
const requiredFields = form.querySelectorAll(".required");

// Validation functions
function validateName(name) {
    return name.trim() !== "";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailPattern.test(email);
}

function validateMobile(mobile) {
    const mobilePattern = /^[0-9]{11}$/; // Adjust pattern if needed
    return mobilePattern.test(mobile);
}

function validateAddress(address) {
    return address.trim() !== "";
}

function validateDate(date) {
    return date.trim() !== "";
}

// Error message display function
function displayError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    }
}

function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
    errorElement.style.display = "none";
    }
}

// Map each field to its validation function
const validationFunctions = {
    "name": validateName,
    "email": validateEmail,
    "mobile": validateMobile,
    "address": validateAddress,
    "date": validateDate,
    "products": (value) => value.trim() !== "" // Product field validation
};

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    let isValid = true;

    requiredFields.forEach(field => {
    clearError(field);

    const validationFunction = validationFunctions[field.id];
    if (validationFunction) {
        if (!validationFunction(field.value)) {
        displayError(field, getErrorMessage(field.id));
        isValid = false;
        }
    }
    });

    if (isValid) {
    form.submit(); // Submit form if all validations pass
    }
});

// Get error message based on field id
function getErrorMessage(fieldId) {
    const errorMessages = {
    "name": "Name is required.",
    "email": "Invalid email format.",
    "mobile": "Invalid mobile number.",
    "address": "Address is required.",
    "date": "Date is required.",
    "products": "Product selection is required."
    };
    return errorMessages[fieldId] || "This field is invalid.";
}
});
