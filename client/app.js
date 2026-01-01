const form = document.getElementById("cv-form");
const result = document.getElementById("result");
const downloadBtn = document.getElementById("download-btn");

let currentCV = "";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const skills = document.getElementById("skills").value;

  result.innerHTML = "Generating...";
  downloadBtn.style.display = "none";

  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, job, skills }),
  });

  const data = await response.json(); // 👈 THIS IS THE LINE

  // 👇 THIS IS "INSIDE FETCH SUCCESS"
  currentCV = data.cv;
  downloadBtn.style.display = "block";

  result.innerHTML = `
    <h3>${data.message}</h3>
    <pre>${data.cv}</pre>
  `;
});

// DOWNLOAD PDF
downloadBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:3000/download-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cv: currentCV }),
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cv.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
});
