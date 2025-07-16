// ===== Scroll suave para links internos =====
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===== Destaque da seção ativa na navbar =====
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

function updateActiveNav() {
  let current = ""
  const scrollPos = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("ativo")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("ativo")
    }
  })
}

window.addEventListener("scroll", updateActiveNav)

// ===== Navbar scroll effect =====
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// === ENVIO DOS FORMULÁRIOS PARA GOOGLE SHEETS ===
document.addEventListener('DOMContentLoaded', function () {
  const forms = ['form-contato', 'form-orcamento'];

  forms.forEach((formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        servico: formData.get('tipo-servico') || 'Não especificado',
        seguro: formData.get('seguro') || 'Não informado',
        seguradora: formData.get('seguradora') || 'Não informado',
        mensagem: formData.get('mensagem') || 'Nenhuma'
      };

      try {
const response = await fetch('https://script.google.com/macros/s/AKfycbwaNr58I9pGFNh13pH5oKOoQu81I5gtZSXiZczJgPJVSgAqEsQm5gelH-pT6WsYBw4/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

        const result = await response.json();

        if (result.success) {
          alert('✅ Mensagem enviada com sucesso!');
          form.reset();
        } else {
          alert('❌ Erro: ' + (result.error || 'Não foi possível enviar.'));
        }

      } catch (err) {
        alert('❌ Erro ao enviar: ' + err.message);
      }
    });
  });
});

// ===== Slider da Seção Sobre =====
let slideIndex = 0
const slider = document.getElementById("slider-sobre")
const imagens = slider ? slider.querySelectorAll("img") : []
const totalSlides = imagens.length

function createDots() {
  const dotsContainer = document.getElementById("slider-dots")
  if (dotsContainer && totalSlides > 0) {
    dotsContainer.innerHTML = ""
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div")
      dot.className = "dot"
      dot.addEventListener("click", () => goToSlide(i))
      dotsContainer.appendChild(dot)
    }
    updateDots()
  }
}

function mostrarSlide(index) {
  if (!slider || totalSlides === 0) return

  if (index >= totalSlides) slideIndex = 0
  if (index < 0) slideIndex = totalSlides - 1

  slider.style.transform = `translateX(-${slideIndex * 100}%)`
  updateDots()
}

function mudarSlide(n) {
  slideIndex += n
  mostrarSlide(slideIndex)
}

function goToSlide(n) {
  slideIndex = n
  mostrarSlide(slideIndex)
}

function updateDots() {
  const dots = document.querySelectorAll(".dot")
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === slideIndex)
  })
}

function autoPlay() {
  slideIndex++
  mostrarSlide(slideIndex)
}

// Inicializar slider
if (slider && totalSlides > 0) {
  createDots()
  mostrarSlide(slideIndex)

  // Auto-play a cada 5 segundos
  let autoPlayInterval = setInterval(autoPlay, 5000)

  // Pausar auto-play ao hover
  const sliderWrapper = document.querySelector(".sobre-slider-wrapper")
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval)
    })

    sliderWrapper.addEventListener("mouseleave", () => {
      autoPlayInterval = setInterval(autoPlay, 5000)
    })
  }
}

// ===== Animações de scroll =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// ===== Menu mobile =====
const menuToggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".navbar .menu")

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active")
      menuToggle.classList.remove("active")
    })
  })
}

// ===== Smooth reveal animations =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(".scroll-animate")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("animate")
    }
  })
}

window.addEventListener("scroll", revealOnScroll)

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
  // Observar elementos para animação
  const animateElements = document.querySelectorAll(".service-card, .feature-item, .stat-item")
  animateElements.forEach((el) => {
    el.classList.add("scroll-animate")
    observer.observe(el)
  })

  // Trigger inicial das animações
  revealOnScroll()
  updateActiveNav()

  // Adicionar classe de carregamento
  document.body.classList.add("loaded")
})
