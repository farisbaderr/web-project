document.addEventListener('DOMContentLoaded', () => {
    const scanUrlButton = document.getElementById('scan-url');
    scanUrlButton.addEventListener('click', async function (event) {
        event.preventDefault();
  
        const text = document.getElementById('url-to-check').value;
        // const text = 'https://www.google.com'
        // Send a POST request to the backend
        try {
          const response = await fetch('http://localhost:3000/receive-text', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }), // Sending the text message
          });
  
          const data = await response.json();
  
          document.getElementById('response').innerHTML = `
              <p><strong>Message:</strong> ${data}</p>
            `;
        } catch (error) {
          document.getElementById('response').innerHTML = `
            <p><strong>Error:</strong> Unable to send request to the server</p>
          `;
        }
      });
    
   
  });