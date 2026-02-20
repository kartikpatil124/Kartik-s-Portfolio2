// ======================
// API Base URL
// ======================
const API_BASE = "http://localhost:10000/api";

// ======================
// Global State
// ======================
let projects = [];

// ======================
// Initialize
// ======================
document.addEventListener("DOMContentLoaded", () => {
  showLoadingSkeleton();
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
// Loading Skeleton
// ======================
function showLoadingSkeleton() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return;

  const skeletonCard = `
    <div class="col-lg-4 col-md-6">
      <div class="project-card skeleton-card" style="overflow:hidden;">
        <div style="width:100%;height:200px;background:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:12px 12px 0 0;"></div>
        <div class="project-content" style="padding:1.2rem;">
          <div style="width:60%;height:14px;background:rgba(255,255,255,0.06);border-radius:8px;margin-bottom:12px;animation:shimmer 1.5s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 75%);"></div>
          <div style="width:80%;height:20px;background:rgba(255,255,255,0.06);border-radius:8px;margin-bottom:10px;animation:shimmer 1.5s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 75%);"></div>
          <div style="width:100%;height:14px;background:rgba(255,255,255,0.04);border-radius:8px;margin-bottom:6px;animation:shimmer 1.5s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 75%);"></div>
          <div style="width:70%;height:14px;background:rgba(255,255,255,0.04);border-radius:8px;animation:shimmer 1.5s infinite;background-size:200% 100%;background-image:linear-gradient(90deg,rgba(255,255,255,0.03) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.03) 75%);"></div>
        </div>
      </div>
    </div>`;

  projectsGrid.innerHTML = skeletonCard.repeat(6);

  // Inject shimmer animation if not already present
  if (!document.getElementById("shimmer-style")) {
    const style = document.createElement("style");
    style.id = "shimmer-style";
    style.textContent = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`;
    document.head.appendChild(style);
  }
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
    const projectsGrid = document.getElementById("projectsGrid");
    if (projectsGrid) {
      projectsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <h4 class="no-projects-text" style="color:#ff5050;">Failed to load projects</h4>
          <p class="no-projects-text">Please check if the backend server is running.</p>
          <button onclick="showLoadingSkeleton();loadProjects();" class="btn btn-outline-light mt-3">Retry</button>
        </div>
      `;
    }
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
                  class="project-image" loading="lazy"
                  onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Found'">

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
