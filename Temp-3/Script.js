// Import GSAP and ScrollTrigger
const gsap = window.gsap
const ScrollTrigger = window.gsap.ScrollTrigger

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobileToggle")
const mobileMenu = document.getElementById("mobileMenu")
const menuIcon = document.querySelector(".menu-icon")
const closeIcon = document.querySelector(".close-icon")

mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  menuIcon.style.display = menuIcon.style.display === "none" ? "block" : "none"
  closeIcon.style.display = closeIcon.style.display === "none" ? "block" : "none"
})

// Close mobile menu on link click
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    menuIcon.style.display = "block"
    closeIcon.style.display = "none"
  })
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Hero Canvas Animation
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas")
  const ctx = canvas.getContext("2d")

  const setCanvasSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.6
  }

  setCanvasSize()
  window.addEventListener("resize", setCanvasSize)

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.vx = (Math.random() - 0.5) * 2
      this.vy = (Math.random() - 0.5) * 2
      this.radius = Math.random() * 3 + 1
      this.opacity = Math.random() * 0.5 + 0.3
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1

      this.x = Math.max(0, Math.min(canvas.width, this.x))
      this.y = Math.max(0, Math.min(canvas.height, this.y))
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(179, 102, 255, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particleCount = 80
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height))
  }

  // Draw connections
  const drawConnections = () => {
    const distance = 150

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < distance) {
          ctx.strokeStyle = `rgba(179, 102, 255, ${0.1 * (1 - dist / distance)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "rgba(20, 20, 35, 0)")
    gradient.addColorStop(0.5, "rgba(88, 28, 135, 0.05)")
    gradient.addColorStop(1, "rgba(20, 20, 35, 0)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.update()
      particle.draw(ctx)
    })

    drawConnections()
    requestAnimationFrame(animate)
  }

  animate()
}

// Initialize hero canvas when DOM is ready
document.addEventListener("DOMContentLoaded", initHeroCanvas)

// GSAP Animations
gsap.utils.toArray(".hero-badge").forEach((element) => {
  gsap.fromTo(element, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
})

gsap.utils.toArray(".hero-title").forEach((element) => {
  gsap.fromTo(element, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 })
})

gsap.utils.toArray(".hero-subtitle").forEach((element) => {
  gsap.fromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 })
})

gsap.utils.toArray(".hero-buttons").forEach((element) => {
  gsap.fromTo(element, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 })
})

gsap.utils.toArray(".hero-stats").forEach((element) => {
  gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.5 })
})

// Floating animations for glows
gsap.to(".glow-1", {
  y: 30,
  repeat: -1,
  yoyo: true,
  duration: 4,
  ease: "sine.inOut",
})

gsap.to(".glow-2", {
  y: -30,
  repeat: -1,
  yoyo: true,
  duration: 5,
  ease: "sine.inOut",
})

// Projects scroll animation
gsap.fromTo(
  ".projects-heading",
  { opacity: 0, x: -50 },
  {
    opacity: 1,
    x: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".projects-heading",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
)

gsap.fromTo(
  ".project-card",
  { opacity: 0, y: 50, scale: 0.95 },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
)

// Project card hover animations
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -15,
      boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      duration: 0.3,
    })
  })
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
    })
  })
})

// Skills scroll animation
gsap.fromTo(
  ".skills-heading",
  { opacity: 0, x: 50 },
  {
    opacity: 1,
    x: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: ".skills-heading",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
)

gsap.fromTo(
  ".skill-card",
  { opacity: 0, y: 40 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  },
)

// Skill card hover animations
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      y: -15,
      boxShadow: "0 20px 40px rgba(179, 102, 255, 0.15)",
      duration: 0.3,
    })
  })
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      y: 0,
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      duration: 0.3,
    })
  })
})

// Skill item hover animations
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      x: 5,
      duration: 0.2,
    })
  })
  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      x: 0,
      duration: 0.2,
    })
  })
})

// Contact scroll animation
const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact-heading",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
})

contactTl
  .fromTo(".contact-heading", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
  .fromTo(".contact-description", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
  .fromTo(".contact-form", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.3")
  .fromTo(".contact-info", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.6")

// Social icon hover animations
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.2,
      rotate: 5,
      duration: 0.3,
    })
  })
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
    })
  })
})

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  }
  console.log("Form submitted:", formData)
  e.target.reset()
  alert("Thanks for reaching out! I'll get back to you soon.")
})

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear()
