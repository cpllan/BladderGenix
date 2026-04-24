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
