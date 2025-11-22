window.addEventListener("load", () => {
  const body = document.querySelector("body");
  const navbar = document.querySelector(".navbar");
  const boxes = document.querySelectorAll(".box1, .box2, .box3, .box4, .box5, .box6");

  // Hide everything initially
  navbar.classList.add("hidden");
  boxes.forEach(box => box.classList.add("hidden"));

  // After 2s, animate box2
  setTimeout(() => {
    const box2 = document.querySelector(".box2");
    box2.classList.remove("hidden");
    box2.classList.add("box2-animate");

    // After box2 finishes (2s), fade in everything else
    setTimeout(() => {
      navbar.classList.remove("hidden");
      navbar.classList.add("fade-in");

      boxes.forEach(box => {
        if (!box.classList.contains("box2")) {
          box.classList.remove("hidden");
          box.classList.add("fade-in");
        }
      });
    }, 1000);
  }, 1000);
});



document.addEventListener('DOMContentLoaded', function() {
        // Hide loading screen after 2 seconds
        setTimeout(function() {
          document.querySelector('.loading-screen').style.opacity = '0';
          document.body.classList.remove('loading');
          
          setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
          }, 500);
        }, 1000);
      });
