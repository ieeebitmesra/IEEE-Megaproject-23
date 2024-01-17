document.getElementById('imageInput').addEventListener('change', handleImage);

function handleImage(event) {
    const input = event.target;
    const image = document.getElementById('selectedImage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        image.src = reader.result;
        image.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
    };

    if (file) {
        loadingSpinner.classList.remove('hidden'); // Added to show loading spinner while image is being loaded.
        reader.readAsDataURL(file);
    }
}

document.getElementById('generateCaption').addEventListener('click', generateCaption);

async function generateCaption() {
    const imageInput = document.getElementById('imageInput').files[0];

    const formData = new FormData();
    formData.append('image', imageInput);

    const response = await fetch('/predict', {
        method: 'POST',
        body: formData,
    });

    const result = await response.json();
    document.getElementById('captionResult').innerText = result.caption;
}

document.getElementById('reset').addEventListener('click', reset);

function reset() {
    const imageInput = document.getElementById('imageInput');
    const image = document.getElementById('selectedImage');
    const result = document.getElementById('captionResult');
    const loadingSpinner = document.getElementById('loadingSpinner');

    imageInput.value = ""; 
    image.src = ""; 
    image.classList.add('hidden');
    result.innerText = "";
    loadingSpinner.classList.add('hidden'); // Hide loading spinner when resetting.
}
