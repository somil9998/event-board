function renderEvents(events) {
  const eventList = document.querySelector("#event-list");
  const eventSearch = document.querySelector("#event-search");
  const eventSummary = document.getElementById("event-summary");
  eventList.replaceChildren();
  eventSummary.replaceChildren();
  const eventDateFormatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const eventMonthFormatter = new Intl.DateTimeFormat("en", {
    month: "long",
    timeZone: "UTC",
  });

  function formatEvent(ev) {
    const date = eventDateFormatter.format(new Date(`${ev.date}T00:00:00Z`));
    const location = ev.online ? "Online" : ev.venue;

    return `${date} · ${location}`;
  }

  const displayEvents = events.map((ev) => ({
    ...ev,
    formattedDetails: formatEvent(ev),
  }));

  for (const event of displayEvents) {
    const listItem = document.createElement("li");
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const details = document.createElement("p");
    const price = document.createElement("p");
    const seatStatus = document.createElement("mark");
    const registration = document.createElement("p");
    const registrationStatus = document.createElement("mark");
    const rsvpButton = document.createElement("button");
    const link = document.createElement("a");
    const searchableText = [
      event.title,
      event.description,
      event.date,
      event.venue,
    ]
      .join(" ")
      .toLowerCase();

    let availability;
    if (event.seats === 0) {
      availability = "Full";
    } else if (event.seats < 5) {
      availability = "Few left";
    } else {
      availability = "Open";
    }

    article.classList.add("event-card");
    article.classList.toggle("full", event.seats === 0);
    article.classList.toggle("online", event.online);
    listItem.dataset.eventId = event.id;
    seatStatus.classList.add("event-seat-status");
    seatStatus.classList.toggle("full", event.seats === 0);
    seatStatus.classList.toggle("few-left", event.seats > 0 && event.seats < 5);
    seatStatus.setAttribute(
      "aria-label",
      `${availability}: ${event.seats} seats left`,
    );
    seatStatus.setAttribute(
      "data-availability",
      availability.toLowerCase().replace(" ", "-"),
    );
    seatStatus.style.color =
      event.seats === 0
        ? "var(--link-active)"
        : event.seats < 5
          ? "var(--accent-strong)"
          : "var(--brand)";

    title.textContent = event.title;
    description.textContent = event.description;
    details.textContent = event.formattedDetails;
    price.textContent = event.free ? "Free entry" : "Paid entry";
    seatStatus.textContent = `${availability} — ${event.seats} seats left`;
    registrationStatus.textContent = event.registrationOpen
      ? "Registration open"
      : "Registration opens soon";
    registration.appendChild(registrationStatus);
    rsvpButton.type = "button";
    rsvpButton.classList.add("rsvp-button");
    rsvpButton.setAttribute("aria-pressed", "false");
    rsvpButton.textContent = "RSVP";
    link.href = event.href;
    link.textContent = "View event";

    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(details);
    article.appendChild(price);
    article.appendChild(seatStatus);
    article.appendChild(registration);
    article.appendChild(rsvpButton);
    article.appendChild(link);
    listItem.appendChild(article);
    listItem.dataset.searchText = searchableText;
    eventList.appendChild(listItem);

    const summaryRow = document.createElement("tr");
    const summaryTitle = document.createElement("td");
    const summaryMonth = document.createElement("td");

    summaryTitle.textContent = event.title;
    summaryMonth.textContent = eventMonthFormatter.format(
      new Date(`${event.date}T00:00:00Z`),
    );
    summaryRow.appendChild(summaryTitle);
    summaryRow.appendChild(summaryMonth);
    eventSummary.appendChild(summaryRow);
  }

  eventList.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".rsvp-button");
    if (!clickedButton || !eventList.contains(clickedButton)) return;

    const isRsvped = clickedButton.classList.toggle("is-rsvped");
    clickedButton.setAttribute("aria-pressed", String(isRsvped));
    clickedButton.textContent = isRsvped ? "RSVP'd" : "RSVP";
    const eventTitle = clickedButton
      .closest(".event-card")
      .querySelector("h3").textContent;
    console.log(
      `RSVP handler: ${eventTitle} — ${isRsvped ? "joined" : "cancelled"}`,
    );
  });

  function filterEvents() {
    const searchTerm = eventSearch.value.trim().toLowerCase();

    eventList.querySelectorAll("li").forEach((listItem) => {
      listItem.hidden = !listItem.dataset.searchText.includes(searchTerm);
    });
    const visibleEvents = [
      ...eventList.querySelectorAll("li:not([hidden]) h3"),
    ].map((heading) => heading.textContent);
    console.log(
      `Search handler: "${searchTerm}" — visible: ${visibleEvents.join(", ") || "none"}`,
    );
  }

  eventSearch.addEventListener("input", filterEvents);
  eventSearch.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      eventSearch.value = "";
      filterEvents();
    }
  });
  filterEvents();
}

function setupMobileNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNavigation = document.querySelector("#primary-navigation");
  const navigationLinks = document.querySelectorAll("#primary-navigation a");

  function closeNavigation() {
    navToggle.setAttribute("aria-expanded", "false");
    primaryNavigation.classList.remove("is-open");
  }

  navToggle.addEventListener("click", () => {
    const isExpanded = primaryNavigation.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isExpanded));
    console.log(`Navigation handler: ${isExpanded ? "opened" : "closed"}`);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

function setupJoinForm() {
  const joinForm = document.querySelector("#join-form");
  const nameInput = document.querySelector("#name");
  const formMessage = document.querySelector("#form-message");

  function validateName() {
    nameInput.setCustomValidity(
      nameInput.value.trim().length < 2
        ? "Please enter a name with at least two characters."
        : "",
    );
  }

  nameInput.addEventListener("input", validateName);

  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validateName();
    const isValid = joinForm.checkValidity();
    console.log(`Join form submit handler: ${isValid ? "valid" : "invalid"}`);

    if (!isValid) {
      formMessage.textContent = "Please correct the highlighted fields.";
      joinForm.reportValidity();
      return;
    }

    formMessage.textContent = "Thanks! Your details are ready to be sent.";
  });
}

function showEventMessage(message) {
  const eventList = document.querySelector("#event-list");
  const eventSummary = document.getElementById("event-summary");
  const messageItem = document.createElement("li");

  messageItem.textContent = message;
  messageItem.setAttribute("role", "status");
  eventList.replaceChildren(messageItem);
  eventSummary.replaceChildren();
}

async function loadEvents() {
  showEventMessage("Loading…");

  try {
    let sourceText;
    if (window.location.protocol === "file:") {
      const embeddedEvents = document.querySelector("#embedded-events");
      if (!embeddedEvents) {
        throw new Error("Embedded event data is missing.");
      }
      sourceText = embeddedEvents.textContent;
    } else {
      const response = await fetch("events.json");
      if (!response.ok) {
        throw new Error(`Failed to load events: ${response.status}`);
      }
      sourceText = await response.text();
    }

    const events = JSON.parse(sourceText);
    if (!Array.isArray(events)) {
      throw new Error("The events data must be an array.");
    }
    if (events.length === 0) {
      throw new Error("The events data must contain at least one event.");
    }

    const serializedEvents = JSON.stringify(events);
    console.log("JSON.stringify(events):", serializedEvents);
    const roundTrippedEvents = JSON.parse(serializedEvents);
    const matchesSource =
      JSON.stringify(roundTrippedEvents) ===
      JSON.stringify(JSON.parse(sourceText));
    console.log(
      `Round-trip matches ${window.location.protocol === "file:" ? "embedded event data" : "events.json"}:`,
      matchesSource,
    );
    if (!matchesSource) {
      throw new Error("The JSON round-trip does not match the source data.");
    }

    console.log("First event title:", events[0].title);
    console.log("Last event seats:", events[events.length - 1].seats);
    console.log(
      `Loaded ${events.length} events: ${events.map((event) => event.title).join(", ")}`,
    );
    renderEvents(events);
  } catch (error) {
    console.error("Unable to load event data.", error);
    if (window.location.protocol === "file:") {
      showEventMessage("We couldn't load the embedded events data.");
    } else {
      showEventMessage(
        "We couldn't load events right now. Please check your connection and try again.",
      );
    }
  }
}

async function loadFirstXmlEventTitle() {
  const titleMessage = document.querySelector("#xml-event-title");

  try {
    if (window.location.protocol === "file:") {
      throw new Error("Open this page through a local web server to load events.xml.");
    }

    const response = await fetch("events.xml");
    if (!response.ok) {
      throw new Error(`Failed to load events.xml: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDocument = new DOMParser().parseFromString(
      xmlText,
      "application/xml",
    );
    if (xmlDocument.querySelector("parsererror")) {
      throw new Error("events.xml contains invalid XML.");
    }

    const titles = xmlDocument.getElementsByTagName("title");
    if (titles.length === 0 || !titles[0].textContent.trim()) {
      throw new Error("events.xml does not contain an event title.");
    }

    titleMessage.textContent = `First event from XML: ${titles[0].textContent.trim()}`;
  } catch (error) {
    console.error("Unable to load the first XML event title.", error);
    titleMessage.textContent =
      window.location.protocol === "file:"
        ? "Run this folder through a local web server to load the first event from events.xml."
        : "The first event title could not be loaded from events.xml.";
  }
}

console.log(
  "Event board initialized. Event data will load from events.json.",
);
loadEvents();
loadFirstXmlEventTitle();
setupMobileNavigation();
setupJoinForm();
