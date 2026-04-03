document.documentElement.classList.add("js");

const siteHeader = document.querySelector("[data-site-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navWrap = document.querySelector("[data-nav-wrap]");
const bookingCalendar = document.querySelector("[data-booking-calendar]");
const revealItems = document.querySelectorAll("[data-reveal]");

if (navToggle && siteHeader && navWrap) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navWrap.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

if (bookingCalendar) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const createDayLabel = (date, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "booking-date";
    input.value = date.toISOString().split("T")[0];
    input.checked = index === 0;

    const content = document.createElement("span");
    const [weekday, monthDay] = formatter.format(date).split(", ");
    const helper = document.createElement("small");
    helper.textContent = index === 0 ? "Earliest opening" : "Preferred day";
    content.textContent = `${weekday} ${monthDay}`;
    content.appendChild(helper);

    const label = document.createElement("label");
    label.className = "calendar-day";
    label.appendChild(input);
    label.appendChild(content);
    return label;
  };

  const upcomingDays = [];
  const current = new Date();
  current.setHours(12, 0, 0, 0);

  while (upcomingDays.length < 6) {
    current.setDate(current.getDate() + 1);
    const weekday = current.getDay();
    if (weekday !== 0) {
      upcomingDays.push(new Date(current));
    }
  }

  upcomingDays.forEach((day, index) => {
    bookingCalendar.appendChild(createDayLabel(day, index));
  });
}

if (revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
