const music = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");

toggleBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleBtn.textContent = "🔊";
  } else {
    music.pause();
    toggleBtn.textContent = "🔇";
  }
});

// Слайдер
const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, 4000);

// Таймер
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2026-06-13T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdown.textContent = "Свадьба уже состоялась!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const format = (num) => String(num).padStart(2, '0');

  countdown.innerHTML = `
    <div class="time-block">
      <div class="number">${format(days)}</div>
      <div class="label">օր</div>
    </div>
    <div class="time-block">
      <div class="number">${format(hours)}</div>
      <div class="label">ժամ</div>
    </div>
    <div class="time-block">
      <div class="number">${format(minutes)}</div>
      <div class="label">րոպե</div>
    </div>
    <div class="time-block">
      <div class="number">${format(seconds)}</div>
      <div class="label">վայրկյան</div>
    </div>
  `;
}

function generateCalendar() {
  const calendarWrapper = document.getElementById('calendar');
  calendarWrapper.innerHTML = '';

  const weekdays = ['Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շբթ', 'Կիր'];
  weekdays.forEach(day => {
    calendarWrapper.innerHTML += `<div class="weekday">${day}</div>`;
  });

  const date = new Date(2026, 5, 1);
  const daysInMonth = new Date(2026, 6, 0).getDate();
  const firstDay = (date.getDay() === 0) ? 6 : date.getDay() - 1;

  for (let i = 0; i < firstDay; i++) {
    calendarWrapper.innerHTML += '<div class="day"></div>';
  }

  for (let i = 1; i <= daysInMonth; i++) {
    if (i === 13) {
      calendarWrapper.innerHTML += `
        <div class="day selected">
          <img src="images/ring.png" alt="кольцо" />
          <span>${i}</span>
        </div>
      `;
    } else {
      calendarWrapper.innerHTML += `<div class="day">${i}</div>`;
    }
  }
}

function checkVisibility() {
  const elements = [
    {
      text: document.querySelector('.registry-office-text'),
      section: document.getElementById('registry-office')
    },
    {
      text: document.querySelector('.restaurant-text'),
      section: document.getElementById('restaurant')
    }
  ];

  const calendarSection = document.querySelector('.calendar');
  const ring = document.querySelector('.selected img');

  elements.forEach(item => {
    if (item.text && item.section) {
      const rect = item.section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight / 1.5) {
        item.text.style.opacity = '1';
        item.text.style.transform = 'translateY(0)';
      }
    }
  });

  if (calendarSection && ring) {
    const calendarRect = calendarSection.getBoundingClientRect();
    const triggerPoint = window.innerHeight / 1.25;
    
    if (calendarRect.top + calendarRect.height/2 < triggerPoint) {
      ring.classList.add('visible');
    } else {
      ring.classList.remove('visible');
    }
  }
}

// Инициализация
generateCalendar();
updateCountdown();
setInterval(updateCountdown, 1000);

// Обработчики событий
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
checkVisibility();