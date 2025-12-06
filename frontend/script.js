// ======================
// API Base URL
// ======================
const API_BASE = "https://portfolio-backend1-0061.onrender.com/api";

// ======================
// Global State
// ======================
let projects = [];

// ======================
// Initialize
// ======================
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  setupEventListeners();
});

// ======================
// Event Listeners
// ======================
function setupEventListeners() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const filterButtons = document.querySelectorAll("[data-category]");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      filterProjects(this.getAttribute("data-category"));
    });
  });
}

// ======================
// Load Projects (FIXED)
// ======================
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE}/projects`);
    projects = await response.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

// ======================
// Display Projects
// ======================
function displayProjects(projectsToShow) {
  const projectsGrid = document.getElementById("projectsGrid");

  if (!projectsToShow.length) {
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
      const cats = Array.isArray(project.category)
        ? project.category
        : [project.category];

      return `
        <div class="col-lg-4 col-md-6" data-category="${cats.join(",")}">
          <div class="project-card">
              <img src="${project.imageUrl || "https://via.placeholder.com/400x250"}"
                  class="project-image">

              <div class="project-content">
                  <div class="mb-2">${renderCategoryBadges(project.category)}</div>

                  <h3 class="project-title">${project.title}</h3>
                  <p class="project-description">${project.description}</p>

                  <div class="project-links">
                      ${project.projectLink ? `<a href="${project.projectLink}" target="_blank" class="project-link">View Project</a>` : ""}
                      ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link github-link">GitHub</a>` : ""}
                  </div>
              </div>
          </div>
        </div>
      `;
    })
    .join("");
}

// ======================
// Filter Projects
// ======================
function filterProjects(category) {
  if (category === "all") {
    displayProjects(projects);
    return;
  }

  const filtered = projects.filter((p) => {
    const cats = Array.isArray(p.category) ? p.category : [p.category];
    return cats.includes(category);
  });

  displayProjects(filtered);
}

// ======================
// Login
// ======================
async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("loginError");

  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = "admin.html";
    } else {
      loginError.textContent = data.message;
      loginError.classList.remove("d-none");
    }
  } catch (error) {
    loginError.textContent = "Network error.";
    loginError.classList.remove("d-none");
  }
}

// ======================
// Badges
// ======================
function renderCategoryBadges(category) {
  const cats = Array.isArray(category) ? category : [category];

  const names = {
    html: "HTML",
    css: "CSS & Bootstrap",
    javascript: "JavaScript",
    react: "ReactJS",
    node: "Node.JS",
  };

  return cats
    .map((c) => `<span class="project-category me-1">${names[c] || c}</span>`)
    .join("");
}
