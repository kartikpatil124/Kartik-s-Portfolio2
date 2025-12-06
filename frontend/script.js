// API Base URL
const API_BASE = "https://portfolio-backend1-0061.onrender.com/api";



// DOM Elements
let projects = []

// Bootstrap Modal
const bootstrap = window.bootstrap

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadProjects()
  setupEventListeners()
})

document.addEventListener('DOMContentLoaded', function() {
    loadAdminProjects();
    loadContactMessages();
});

// Setup event listeners
function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Category filters
  const filterButtons = document.querySelectorAll("[data-category]")
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const category = this.getAttribute("data-category")
      filterProjects(category)
    })
  })
}

// Load projects from backend
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE}/projects`)
    projects = await response.json()
    displayProjects(projects)
  } catch (error) {
    console.error("Error loading projects:", error)
  }
}

// Utility: render multiple category badges
function renderCategoryBadges(category) {
  const cats = Array.isArray(category) ? category : category ? [category] : []
  return cats.map((c) => `<span class="project-category me-1">${getCategoryDisplayName(c)}</span>`).join("")
}

// Display projects in the grid
function displayProjects(projectsToShow) {
  const projectsGrid = document.getElementById("projectsGrid")

if (projectsToShow.length === 0) {
  projectsGrid.innerHTML = `
    <div class="col-12 text-center py-5">
      <h4 class="no-projects-text">No projects found</h4>
      <p class="no-projects-text">Projects will appear here once added by the admin.</p>
    </div>
  `;
  return;
  }
  

  projectsGrid.innerHTML = projectsToShow
    .map((project) => {
      const cats = Array.isArray(project.category) ? project.category : project.category ? [project.category] : []
      const githubBtn = project.githubLink
        ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="project-link ms-2">GitHub</a>`
        : ""
      return `
        <div class="col-lg-4 col-md-6" data-category="${cats.join(",")}">
            <div class="project-card">
                <img src="${project.imageUrl || "https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image"}" 
                     alt="${project.title}" 
                     class="project-image">
                <div class="project-content">
                    <div class="mb-2">
                        ${renderCategoryBadges(project.category)}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <!-- Show both Live and GitHub links -->
                    <div class="d-flex align-items-center">
                      <a href="${project.projectLink}" target="_blank" rel="noopener noreferrer" class="project-link">
                        View Project
                      </a>
                      ${githubBtn}
                    </div>
                </div>
            </div>
        </div>
    `
    })
    .join("")
}

// Filter projects by category
function filterProjects(category) {
  if (category === "all") {
    displayProjects(projects)
  } else {
    // Include a project if any of its categories match the filter
    const filteredProjects = projects.filter((project) => {
      const cats = Array.isArray(project.category) ? project.category : project.category ? [project.category] : []
      return cats.includes(category)
    })
    displayProjects(filteredProjects)
  }
}

// Handle login form submission
async function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const loginError = document.getElementById("loginError")

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.success) {
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"))
      modal.hide()

      // Redirect to admin page
      window.location.href = "admin.html"
    } else {
      loginError.textContent = data.message
      loginError.classList.remove("d-none")
    }
  } catch (error) {
    console.error("Login error:", error)
    loginError.textContent = "Network error. Please try again."
    loginError.classList.remove("d-none")
  }
}

// Get display name for category
function getCategoryDisplayName(category) {
  const categoryMap = {
    html: "HTML",
    css: "CSS & Bootstrap",
    javascript: "JavaScript",
    react: "ReactJS",
    node: "Node.JS",
  }
  return categoryMap[category] || category
}




// Display projects in the grid
function displayProjects(projectsToShow) {
  const projectsGrid = document.getElementById("projectsGrid")

if (projectsToShow.length === 0) {
  projectsGrid.innerHTML = `
    <div class="col-12 text-center py-5">
      <h4 class="no-projects-text">No projects found</h4>
      <p class="no-projects-text">Projects will appear here once added by the admin.</p>
    </div>
  `;
  return;
  }

  projectsGrid.innerHTML = projectsToShow
    .map((project) => {
      const cats = Array.isArray(project.category) ? project.category : project.category ? [project.category] : []
      
      // Create GitHub button only if githubLink exists and is not empty
      const githubBtn = project.githubLink && project.githubLink.trim() !== '' 
        ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="project-link github-link">
             <i class="fab fa-github"></i> GitHub
           </a>`
        : ""

      // Create project link button
      const projectLinkBtn = project.projectLink && project.projectLink.trim() !== ''
        ? `<a href="${project.projectLink}" target="_blank" rel="noopener noreferrer" class="project-link view-link">
             <i class="fas fa-external-link-alt"></i> View Project
           </a>`
        : ""

      return `
        <div class="col-lg-4 col-md-6" data-category="${cats.join(",")}">
            <div class="project-card">
                <img src="${project.imageUrl || "https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image"}" 
                     alt="${project.title}" 
                     class="project-image">
                <div class="project-content">
                    <div class="mb-2">
                        ${renderCategoryBadges(project.category)}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <!-- Show both Live and GitHub links -->
                    <div class="project-links">
                      ${projectLinkBtn}
                      ${githubBtn}
                    </div>
                </div>
            </div>
        </div>
    `
    })
    .join("")
}