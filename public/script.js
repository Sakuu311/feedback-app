document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const responseMessage = document.getElementById('responseMessage');
    
    try {
        const response = await fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, feedback })
        });

        const result = await response.json();

        if (result.success) {
            responseMessage.innerText = 'Thank you for your feedback!';
            responseMessage.style.color = 'green';
        } else {
            responseMessage.innerText = 'An error occurred. Please try again.';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        responseMessage.innerText = 'An error occurred. Please try again.';
        responseMessage.style.color = 'red';
    }
});
