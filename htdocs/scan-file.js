document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-upload');
    const preview = document.getElementById('preview');

    // Event Listener: File Selection and Upload
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Select only the first file
        preview.innerHTML = ''; // Clear previous preview

        if (file) {
            // Display file name and size
            const info = document.createElement('p');
            info.textContent = `File: ${file.name}, Size: ${file.size} bytes`;
            preview.appendChild(info);

            // Optional: Preview image file
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '200px';
                img.style.marginTop = '10px';
                preview.appendChild(img);

                // Revoke object URL after use
                img.onload = () => URL.revokeObjectURL(img.src);
            }

            // Upload file immediately after selection
            uploadFile(file);
        } else {
            alert('No file selected.');
        }
    });

    // Function to upload file
    function uploadFile(file) {
        console.log(`Uploading: ${file.name}`);

        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:3000/receive-file', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload success:', data);
                alert('File uploaded successfully!');
            })
            .catch(error => {
                console.error('Upload error:', error);
                alert(`File upload failed. Please try again. ${error.message}`);
            });
    }
});
