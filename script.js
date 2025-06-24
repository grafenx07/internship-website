// Set default font size and step
            let currentFontSize = 16;
            const fontStep = 2;
            const minFontSize = 12;
            const maxFontSize = 24;

            // Get all elements that need font size changes
            const elementsToResize = document.querySelectorAll('p, a, h1, h2, h3, h4, h5, h6, span, button');

            // Font size control functions
            function increaseFontSize() {
                if (currentFontSize < maxFontSize) {
                    currentFontSize += fontStep;
                    updateFontSize();
                }
            }

            function decreaseFontSize() {
                if (currentFontSize > minFontSize) {
                    currentFontSize -= fontStep;
                    updateFontSize();
                }
            }

            function resetFontSize() {
                currentFontSize = 16;
                updateFontSize();
            }

            function updateFontSize() {
                elementsToResize.forEach(element => {
                    element.style.fontSize = `${currentFontSize}px`;
                });
            }

            // Add event listeners to buttons
            document.querySelector('.font-button:nth-child(1)').onclick = decreaseFontSize;    // Minus button
            document.querySelector('.font-button:nth-child(2)').onclick = resetFontSize;       // A button
            document.querySelector('.font-button:nth-child(3)').onclick = increaseFontSize;    // Plus button
            document.querySelector('.accessibility-controls > .font-button').onclick = resetFontSize; // Reset button


    // Hamburger menu functionality
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (hamburgerBtn && dropdownMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
            // Chatbot toggle functionality
            document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContent = document.getElementById('chatbotContent');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const closeChat = document.getElementById('closeChat');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContent.classList.toggle('active');
    });

    // Close chat
    closeChat.addEventListener('click', () => {
        chatbotContent.classList.remove('active');
    });

    // Send message function
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user');
            userMessageDiv.textContent = message;
            chatMessages.appendChild(userMessageDiv);

            // Clear input
            userInput.value = '';

            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate bot response (replace with actual chatbot logic)
            setTimeout(() => {
                const botMessageDiv = document.createElement('div');
                botMessageDiv.classList.add('message', 'bot');
                botMessageDiv.textContent = "Thank you for your message. How else can I help you?";
                chatMessages.appendChild(botMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
});

// Replace the dark mode toggle event listener in your script
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Dark mode toggle click handler
    darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            localStorage.setItem('darkMode', null);
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Reset to light mode on page load
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';

    // Dark mode toggle click handler
    darkModeToggle.addEventListener('click', () => {
        const isDarkModeEnabled = document.body.classList.contains('dark-mode');

        if (!isDarkModeEnabled) {
            // Switch to dark mode
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    });
});

// Add this to your existing script section
function loadContent(section) {
    const dynamicContent = document.getElementById('dynamicContent');

    // Example content mapping
    const contentMap = {
        'home': {
            title: 'Welcome to Department of Information Technology',
            content: `
                <div class="about-department">
                    <p>The Government of Meghalaya created the Department of Information Technology (D.I.T.) in May, 2001 with a view of making available the benefits of Information and Communication Technology to all citizens, especially the poor and disadvantaged section of the population, businesses and Government employees and all other stakeholders.</p>

                    <p>Government of Meghalaya through I.T. Department plans to realise its vision of transforming the state of Meghalaya into one of the most preferred and leading destinations for investments in I.T./I.T.E.S., high-end technology and electronics industry in East India or NorthEast Region.</p>

                    <h3>Vision</h3>
                    <p>To effectively leverage I.C.T. (Information and Communication Technology) for the State's overall development and focus on I.T. dissemination and usage as a crucial engine of economic growth and as a tool for increasing productivity, effectiveness, speed and transparency in governance leading to improved quality of life for the common man, businesses and internal Governmental agencies.</p>

                    <h3>Mission /Major Objectives and Goals</h3>
                    <ul>
                        <li>Leverage I.C.T. to make G2C (Government to Citizens), G2B (Government to Business), G2E (Government to Employee), G2G (Government to Government) services easily accessible to the common man and to ensure efficiency, transparency and reliability of such services at affordable costs.</li>
                        <li>Stimulate investment and growth in the I.T./ I.T.E.S. and high-end technology Sector through suitable policy initiatives</li>
                        <li>Bridging the digital divide by I.C.T. dissemination among the state citizenry</li>
                        <li>Developing Human Resources for I.T. and I.T.E.S.</li>
                    </ul>
                </div>
            `
        },
        'tenders': {
            title: 'Current Tenders',
            content: 'List of active tenders will appear here.'
        },
        'notifications': {
            title: 'Latest Notifications',
            content: 'Recent notifications and announcements.'
        }, 'forms': {
            title: 'Download Forms',
            content: `
                <p>Access all department-related forms here:</p>
                <ul class="modern-form-list">
                    <li>
                        <a href="forms/Affidavit_Format_II.pdf" target="_blank">
                            📄 Affidavit - Format II (Meghalaya Tourism Development and Investment Promotion Scheme 2012)
                        </a>
                    </li>
                    <li>
                        <a href="forms/Agreement_HT_EHT.pdf" target="_blank">
                            ⚡ Agreement for supply at High Tension (HT) or Extra High Tension (EHT) <span>(PDF, 13 KB)</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms/Agreement_LT.pdf" target="_blank">
                            ⚡ Agreement for supply at Low Tension (LT) <span>(PDF, 10.64 KB)</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms/Appeal_Insecticide_Act.pdf" target="_blank">
                            🧪 Appeal under section 10 of the Insecticide Act, 1968 to the Central Government <span>(PDF, 21.39 KB)</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms/NOC_Application.pdf" target="_blank">
                            📝 Application and Grant of No Objection Certificate
                        </a>
                    </li>
                    <li>
                        <a href="forms/Fitness_Declaration.pdf" target="_blank">
                            🏃‍♂️ Application cum Declaration as to the Physical Fitness
                        </a>
                    </li>
                    <li>
                        <a href="forms/Permit_Stage_Carriage.pdf" target="_blank">
                            🚌 Application for a Permit in Respect of Service of Stage Carriage
                        </a>
                    </li>
                    <li>
                        <a href="forms/New_Registration_Mark.pdf" target="_blank">
                            🚗 Application for Assignment of New Registration Mark to a Motor Vehicle
                        </a>
                    </li>
                    <li>
                        <a href="forms/Cash_Award_Application.pdf" target="_blank">
                            💰 Application for Cash Award <span>(PDF, 309.98 KB)</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms/Cash_Benefit_Application.pdf" target="_blank">
                            💰 Application for Cash Benefit <span>(PDF, 227.5 KB)</span>
                        </a>
                    </li>
                </ul>
            `
        },
    };

    const sectionContent = contentMap[section] || contentMap['home'];

    dynamicContent.innerHTML = `
        <h2>${sectionContent.title}</h2>
        <div class="section-content">
            ${sectionContent.content}
        </div>
    `;
}

// Load home content by default when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home'); // This will load the home content automatically

    // ... existing DOMContentLoaded event listeners ...
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only prevent default and load dynamically if it's a hash link
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = href.slice(1); // Remove #
            loadContent(section);
        }
        // Else: allow default browser behavior (e.g., for about.html, contact.html)
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots-container');
    const prevButton = document.querySelector('.slider-btn.prev');
    const nextButton = document.querySelector('.slider-btn.next');
    const pauseButton = document.querySelector('.pause-btn');

    let currentSlide = 0;
    const slideCount = slides.length;
    let isPlaying = true;
    let slideInterval;

    // Initialize slideshow state
    function initSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
        pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }

    function toggleSlideshow() {
        if (isPlaying) {
            // Pause the slideshow
            clearInterval(slideInterval);
            pauseButton.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            // Resume the slideshow
            slideInterval = setInterval(nextSlide, 5000);
            pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    }

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    pauseButton.addEventListener('click', toggleSlideshow);

    // Initialize the slideshow
    initSlideshow();

    // Remove hover pause functionality to avoid conflicts
    // with manual pause button
});

