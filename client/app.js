const API_BASE = "https://ai-cv-builder-amye.onrender.com";

const form = document.getElementById("cv-form");
const result = document.getElementById("result");
const downloadBtn = document.getElementById("download-btn");

let currentCV = "";

// Handle CV generation
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const skills = document.getElementById("skills").value;

  result.innerHTML = "Generating...";
  downloadBtn.style.display = "none";

  try {
    const response = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, job, skills }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate CV");
    }

    const data = await response.json();

    currentCV = data.cv;
    downloadBtn.style.display = "block";

    result.innerHTML = `
      <h3>${data.message}</h3>
      <pre>${data.cv}</pre>
    `;
  } catch (error) {
    console.error(error);
    result.innerHTML = "Something went wrong. Please try again.";
  }
});

// Handle PDF download
downloadBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_BASE}/download-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cv: currentCV }),
    });

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cv.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("PDF download failed.");
  }
});
