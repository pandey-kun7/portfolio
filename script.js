const navLinks = [...document.querySelectorAll(".mode-link")];
const activePage = document.body.dataset.page;

if (activePage) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute("aria-current") === "page" ||
      (activePage === "professional" && link.getAttribute("href") === "index.html") ||
      (activePage === "personal" && link.getAttribute("href") === "personal.html");
    link.classList.toggle("active", isActive);
  });
} else {
  const sections = [...document.querySelectorAll("#professional, #personal")];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === visible.target.id);
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, .25, .5, .75, 1] });

  sections.forEach(section => observer.observe(section));
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".contact-form").forEach(form => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = (data.get("email") || "").toString().trim();
    const subject = (data.get("subject") || "").toString().trim();
    const body = (data.get("body") || "").toString().trim();
    if (!email || !subject || !body) return;
    const fullBody = body + "\n\n—\nFrom: " + email;
    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=10c.kunalpandey@gmail.com" +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(fullBody);
    window.open(url, "_blank", "noopener");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
const graphYear = document.getElementById("graph-year");
if (graphYear) graphYear.textContent = new Date().getFullYear();

const graphCells = document.getElementById("graph-cells");
const graphMonths = document.getElementById("graph-months");
const graphTotal = document.getElementById("graph-total");
const graphColors = ["#ebedf0", "#9ecbff", "#6aa9f5", "#2f81f7", "#0a3069"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

if (graphCells) {
  const thisYear = new Date().getFullYear();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renderGraph = (byDate, totalText) => {
      const contributions = [];
      const cursor = new Date(thisYear, 0, 1);
      while (cursor.getTime() <= today.getTime()) {
        const iso = cursor.getFullYear() + "-" + String(cursor.getMonth() + 1).padStart(2, "0") + "-" + String(cursor.getDate()).padStart(2, "0");
        contributions.push({ date: iso, count: (byDate[iso] && byDate[iso].count) || 0, level: (byDate[iso] && byDate[iso].level) || 0 });
        cursor.setDate(cursor.getDate() + 1);
      }
      if (graphTotal) graphTotal.textContent = totalText;

      const weeks = [];
      let currentWeek = [];
      contributions.forEach((day, index) => {
        if (index === 0) {
          const firstWeekday = (new Date(day.date).getDay() + 6) % 7;
          for (let i = 0; i < firstWeekday; i++) currentWeek.push(null);
        }
        currentWeek.push(day);
        if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
      });
      if (currentWeek.length) {
        while (currentWeek.length < 7) currentWeek.push(null);
        weeks.push(currentWeek);
      }

      weeks.forEach(week => {
        week.forEach(day => {
          const cell = document.createElement("i");
          if (day) {
            cell.style.background = graphColors[Math.min(day.level, 4)];
            cell.title = day.count + " contribution" + (day.count === 1 ? "" : "s") + " on " + day.date;
          } else {
            cell.style.background = "transparent";
            cell.style.borderColor = "transparent";
            cell.setAttribute("aria-hidden", "true");
          }
          graphCells.appendChild(cell);
        });
      });

      if (graphMonths) {
        graphMonths.innerHTML = "";
        let lastMonth = -1;
        weeks.forEach(week => {
          const firstDay = week.find(d => d);
          const label = document.createElement("span");
          if (firstDay) {
            const dt = new Date(firstDay.date + "T00:00:00");
            const month = dt.getMonth();
            if (month !== lastMonth && dt.getDate() <= 7) {
              label.textContent = monthNames[month];
              lastMonth = month;
            }
          }
          graphMonths.appendChild(label);
        });
      }
  };

  fetch("https://github-contributions-api.jogruber.de/v4/pandey-kun7?y=" + thisYear)
    .then(res => res.json())
    .then(data => {
      const byDate = {};
      (data.contributions || []).forEach(d => { byDate[d.date] = { count: d.count, level: d.level }; });
      const total = (data.contributions || []).reduce((s, d) => s + (d.count || 0), 0);
      renderGraph(byDate, total + " contributions in " + thisYear);
    })
    .catch(() => {
      renderGraph({}, "Contribution graph unavailable offline");
    });
}
