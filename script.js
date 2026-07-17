const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

const yesBtn1 = document.getElementById('yes-btn-1');
const noBtn = document.getElementById('no-btn');
const submitDetails = document.getElementById('submit-details');
const downloadBtn = document.getElementById('download-btn');

// Array of text loops for the "No" button to make it fun
const noTexts = [
    "Are you sure?",
    "Think again! 🥺",
    "Please? ❤️",
    "Don't do this to me...",
    "Last chance!",
    "Error: Wrong choice ❌"
];
let noCount = 0;

// Step 1: Handling the "No" Button Playful dodging & text changes
noBtn.addEventListener('click', () => {
    if (noCount < noTexts.length) {
        noBtn.innerText = noTexts[noCount];
        noCount++;
    } else {
        // Hide the button entirely once options run out
        noBtn.style.display = 'none';
    }
    
    // Make the "Yes" button slightly bigger each time they click No!
    const currentSize = parseFloat(window.getComputedStyle(yesBtn1).fontSize);
    yesBtn1.style.fontSize = `${currentSize + 2}px`;
    yesBtn1.style.padding = `${parseFloat(window.getComputedStyle(yesBtn1).paddingTop) + 2}px`;
});

// Navigate to Step 2
yesBtn1.addEventListener('click', () => {
    step1.classList.remove('active');
    step2.classList.add('active');
});

// Step 2: Handle Details Submission
submitDetails.addEventListener('click', () => {
    const dateInput = document.getElementById('date-picker').value;
    const timeInput = document.getElementById('time-picker').value;

    if (!dateInput) {
        alert("Please pick a beautiful date!");
        return;
    }

    // Format the date into a readable format (e.g., "Thursday, July 16")
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date(dateInput).toLocaleDateString('en-US', dateOptions);

    // Inject values into the final confirmation screen
    document.getElementById('final-date').innerText = formattedDate;
    document.getElementById('final-time').innerText = timeInput;

    // Transition to step 3
    step2.classList.remove('active');
    step3.classList.add('active');
});

// Step 3: Handle Downloading the Screenshot
downloadBtn.addEventListener('click', () => {
    const targetElement = document.getElementById('capture-area');

    html2canvas(targetElement, {
        backgroundColor: "#ffffff",
        scale: 2 // Improves quality for mobile screens
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'its_a_date_invitation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});