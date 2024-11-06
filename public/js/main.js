async function verifyUser(username, password) {
    const url = "https://restapi.tu.ac.th/api/v1/auth/Ad/verify"; 
    const accessToken = "TU1edde0303f2b1ead50f5899a6b9cd4bf3e71aa7234e60642308a5a3cdb403da1f033183dcdee999dd24def202b61c016"; 

    const headers = {
        "Content-Type": "application/json",
        "Application-Key": accessToken,
    };

    const body = JSON.stringify({
        UserName: username,
        PassWord: password,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error("Error during API call:", error);
        displayError("An error occurred while verifying the user.");
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById("result");
    const resultContainer = document.getElementById("result-container")
    resultContainer.style.backgroundColor = "#ffffff"; 
    resultContainer.style.padding = "20px";
    resultContainer.style.borderRadius = "8px";
    resultContainer.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"; 
    resultContainer.style.width = "300px"; 
    resultContainer.style.display = "block"; 
    resultDiv.innerHTML = ""; 
    if (data.status) {
        resultDiv.innerHTML = `
            <h2>User verified successfully!</h2>
            <p><strong>ID:</strong> ${data.username}</p>
            <p><strong>Name (TH):</strong> ${data.displayname_th}</p>
            <p><strong>Name (EN):</strong> ${data.displayname_en}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Department:</strong> ${data.department}</p>
            <p><strong>Faculty:</strong> ${data.faculty}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>${data.message}</p>`;
    }
}

function displayError(message) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}


document.getElementById("verificationForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    verifyUser(username, password);
});
