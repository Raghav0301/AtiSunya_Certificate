function generateCertificate() {
  const studentName = document.getElementById("studentName").value.trim();
  const courseInput = document.getElementById("courseName").value.trim();
  const dateInput = document.getElementById("completionDate").value;

  if (!studentName || !courseInput || !dateInput) {
    alert("Please fill all fields.");
    return;
  }

  const completionDate = new Date(dateInput).toDateString();
  const uniqueId = "ASPL-" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("certName").textContent = studentName;
  document.getElementById("certCourse").textContent = courseInput;
  document.getElementById("certDate").textContent = "on " + completionDate;
  document.getElementById("certId").textContent = "Certificate ID: " + uniqueId;

  const qrCodeContainer = document.getElementById("qr-code");

// LinkedIn ka permanent link
const qrData = "https://www.linkedin.com/company/atisunyaprivatelimited/";

// API se QR generate hoga
const qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=150x150`;

// Certificate pe QR show karna
qrCodeContainer.innerHTML = `<img src="${qrLink}" alt="LinkedIn QR Code" width="90" height="90"/>`;
}

function downloadCertificate() {
  const certificateElement = document.getElementById("certificate");

  html2canvas(certificateElement, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [certificateElement.offsetWidth, certificateElement.offsetHeight]
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      certificateElement.offsetWidth,
      certificateElement.offsetHeight
    );

    pdf.save("AtiSunya_Certificate.pdf");
  });
}
