const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".header__content .bar", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".header__image__card", {
  duration: 1000,
  interval: 500,
  delay: 2500,
});

const canvas = document.getElementById('grid-canvas');
const ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}


// adding interactive grid 
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gridSize = 45;
    const columns = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);
  
    ctx.strokeStyle = '#8500F208';
    ctx.lineWidth = 2;
  
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        
        const distanceToMouse = Math.sqrt(
          Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
        );
        
        const size = Math.min(
          gridSize - 2,
          Math.max(1, gridSize * (1 - distanceToMouse / 300))
        );
  
        ctx.beginPath();
        ctx.arc(x, y, size / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#8500F208';
        ctx.fill();
        
        if (i < columns - 1 && j < rows - 1) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + gridSize, y);
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + gridSize);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(drawGrid);
  }
  
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', handleMouseMove);
  resize();
  drawGrid();


const textElement = document.querySelector('.header__content p');
const text = textElement.textContent;
textElement.textContent = '';

let index = 0;
function animateText() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(animateText, 50);
    } else {
        // Reset and start over after a delay
        setTimeout(() => {
            textElement.textContent = '';
            index = 0;
            animateText();
        }, 10000); // Wait 2 seconds before repeating
    }
}

animateText();


const spanElements = document.querySelectorAll('.header__content span');

// Initial animation
spanElements.forEach((span, index) => {
    span.style.opacity = '0';
    span.style.transform = 'translateY(-20px)';
    span.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
    }, 500 * (index + 1));
});

// Add hover effects
spanElements.forEach(span => {
    span.addEventListener('mouseover', () => {
        span.style.transform = 'scale(1.2) rotate(5deg)';
        span.style.color = '#8500F2';
    });

    span.addEventListener('mouseout', () => {
        span.style.transform = 'scale(1) rotate(0deg)';
        span.style.color = '';
    });

    span.addEventListener('click', () => {
        span.style.transform = 'scale(0.8) translateY(10px)';
        setTimeout(() => {
            span.style.transform = 'scale(1) translateY(0)';
        }, 200);
    });
});

function typeWriter(element, texts, speed = 100) {
    let currentTextIndex = 0;
    let currentText = '';
    let letterIndex = 0;

    function type() {
        if (letterIndex < texts[currentTextIndex].length) {
            currentText += texts[currentTextIndex].charAt(letterIndex);
            element.textContent = currentText;
            letterIndex++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                currentText = '';
                letterIndex = 0;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                type();
            }, 2000);
        }
    }

    type();
}

// Define arrays of different texts for each span
const textSets = [
    ["Visualise", "Create", "Innovate", "Design"] 
];

spanElements.forEach((span, index) => {
    span.textContent = '';
    typeWriter(span, textSets[index % textSets.length]);
});