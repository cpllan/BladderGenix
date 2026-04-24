// Form Validation
function validateAndProceed(currentStep, nextStep) {
    const stepEl = document.getElementById('step-' + currentStep);
    const requiredFields = stepEl.querySelectorAll('input[required], select[required]');
    let valid = true;

    requiredFields.forEach(field => {
        const group = field.closest('.input-group');
        if (group) group.classList.remove('input-error');

        const isEmpty = field.tagName === 'SELECT'
            ? field.value === ''
            : field.value.trim() === '';

        if (isEmpty) {
            if (group) {
                group.classList.add('input-error');
                void group.offsetWidth; // Re-trigger shake animation
            }
            valid = false;
        }
    });

    if (valid) {
        if (nextStep) {
            goToStep(nextStep);
        } else {
            submitOrder();
        }
    } else {
        const firstError = stepEl.querySelector('.input-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(el => {
        el.classList.remove('active');
    });

    // Show the target step
    document.getElementById('step-' + step).classList.add('active');

    // Update the progress indicators
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById('indicator-' + i);
        if (i < step) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
        } else if (i === step) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
        } else {
            indicator.classList.remove('active', 'completed');
        }
    }

    // Scroll to the top of the form for better UX
    document.querySelector('.checkout-heading').scrollIntoView({ behavior: 'smooth' });
}

function submitOrder() {
    // Placeholder for form submission
    alert('Order submitted successfully!');
}
