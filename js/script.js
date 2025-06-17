// Первый экран для iOS
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);



document.addEventListener('DOMContentLoaded', () => {
  // ==== Инициализация Smooth Scrollbar на #scroll-container ====
  const scrollContainer = document.querySelector('#scroll-container');
  if (scrollContainer) {
    Scrollbar.init(scrollContainer, {
      damping: 0.07,
      alwaysShowTracks: true,
    });
  }

  // ==== Видео ====
  const trigger = document.getElementById('videoTrigger');
  const videoModal = document.getElementById('videoModal');
  const video = document.getElementById('aboutVideo');
  const videoOverlay = videoModal.querySelector('.video-modal__overlay');

  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    videoModal.classList.add('active');
    video.currentTime = 0;
    video.play();

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  });

  videoOverlay.addEventListener('click', () => {
    video.pause();
    videoModal.classList.remove('active');

    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      video.pause();
      videoModal.classList.remove('active');
    }
  });
  document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement) {
      video.pause();
      videoModal.classList.remove('active');
    }
  });

  // ==== Модалка обратного звонка + закрывание на Esc ====
  const callbackModal = document.getElementById('callback-modal');
  const openBtn = document.querySelector('.header__callback');
  const closeBtn = callbackModal.querySelector('.modal__close');
  const callbackOverlay = callbackModal.querySelector('.modal__overlay');

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    callbackModal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    callbackModal.classList.remove('active');
  });

  callbackOverlay.addEventListener('click', () => {
    callbackModal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      callbackModal.classList.remove('active');
    }
  });

  // ==== Маска для телефона + поведение placeholder ====
  const phoneInput = document.querySelector('input[name="phone"]');
  const parent = phoneInput.closest(".form-group");

  const im = new Inputmask("+7 (999) 999-99-99", {
    showMaskOnHover: false,
    showMaskOnFocus: true,
    clearIncomplete: true,
  });

  im.mask(phoneInput);

  function updatePlaceholderState() {
    const unmaskedValue = phoneInput.inputmask ? phoneInput.inputmask.unmaskedvalue() : '';
    if (phoneInput.value.trim() !== '' && unmaskedValue.length > 0) {
      parent.classList.add("active");
    } else {
      parent.classList.remove("active");
    }
  }

  phoneInput.addEventListener("focus", () => {
    parent.classList.add("active");
  });

  phoneInput.addEventListener("blur", () => {
    updatePlaceholderState();
  });

  phoneInput.addEventListener("input", () => {
    updatePlaceholderState();
  });

  updatePlaceholderState();

  // ==== Обработка формы ====
  const form = document.querySelector(".modal__form");
  const successMessage = form.querySelector(".form-success-message");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();

    console.log("Форма отправлена:");
    console.log("Имя:", name);
    console.log("Телефон:", phone);
    console.log("Email:", email);

    successMessage.classList.add("active");

    setTimeout(() => {
      successMessage.classList.remove("active");
    }, 3000);

    form.reset();
    updatePlaceholderState();
  });
});

