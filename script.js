async function downloadFile() {
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.textContent = 'Please enter a URL.';
        return;
    }

    resultDiv.textContent = 'Downloading...';

    try {
        const response = await fetch(`/.netlify/functions/terabox-downloader?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `
                <p>Download URL: <a href="${data.download_url}" target="_blank">${data.download_url}</a></p>
                <p>File Name: ${data.file_name}</p>
                <p>File Size: ${data.file_size}</p>
            `;
        } else {
            resultDiv.textContent = `Error: ${data.error}`;
        }
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
}
