const internships = [
  {id:1,title:"Frontend Developer Intern",company:"PixelNest Studio",domain:"Technology",mode:"Remote",location:"India",duration:"3 months",stipend:"Unpaid",initials:"PN",description:"Build accessible, responsive interfaces and work with a product team."},
  {id:2,title:"Python Developer Intern",company:"CodeHarbor Labs",domain:"Technology",mode:"Hybrid",location:"Pune, India",duration:"2 months",stipend:"₹5,000 / month",initials:"CH",description:"Write Python scripts, test features and contribute to small automation tools."},
  {id:3,title:"UI/UX Design Intern",company:"Form & Function",domain:"Design",mode:"Remote",location:"India",duration:"3 months",stipend:"Unpaid",initials:"FF",description:"Create wireframes, prototypes and thoughtful user experiences."},
  {id:4,title:"Data Analyst Intern",company:"MetricMint",domain:"Data",mode:"Hybrid",location:"Mumbai, India",duration:"3 months",stipend:"₹8,000 / month",initials:"MM",description:"Explore datasets, create reports and communicate useful insights."},
  {id:5,title:"Social Media Intern",company:"Goodfolk Creative",domain:"Marketing",mode:"Remote",location:"India",duration:"2 months",stipend:"Unpaid",initials:"GF",description:"Plan content calendars and help grow an online community."},
  {id:6,title:"Business Research Intern",company:"Northstar Ventures",domain:"Business",mode:"On-site",location:"Nagpur, India",duration:"6 weeks",stipend:"₹4,000 / month",initials:"NV",description:"Research markets, organise findings and prepare concise summaries."},
  {id:7,title:"Machine Learning Intern",company:"NeuralSpring",domain:"Data",mode:"Remote",location:"India",duration:"4 months",stipend:"₹10,000 / month",initials:"NS",description:"Assist with data preparation, experiments and model evaluation."},
  {id:8,title:"Content Writing Intern",company:"Wordloom Media",domain:"Content",mode:"Remote",location:"India",duration:"2 months",stipend:"Unpaid",initials:"WM",description:"Research topics and write clear articles for digital audiences."},
  {id:9,title:"JavaScript Developer Intern",company:"BrightStack",domain:"Technology",mode:"Hybrid",location:"Bengaluru, India",duration:"3 months",stipend:"₹7,000 / month",initials:"BS",description:"Build and improve interactive web features with JavaScript."},
  {id:10,title:"Graphic Design Intern",company:"Mango Creative Co.",domain:"Design",mode:"On-site",location:"Pune, India",duration:"2 months",stipend:"₹3,500 / month",initials:"MC",description:"Design campaign assets and collaborate on brand visuals."},
  {id:11,title:"Growth Marketing Intern",company:"OrbitLearn",domain:"Marketing",mode:"Hybrid",location:"India",duration:"3 months",stipend:"₹6,000 / month",initials:"OL",description:"Support experiments, campaign tracking and audience research."},
  {id:12,title:"Operations Intern",company:"Everyday Works",domain:"Business",mode:"On-site",location:"Nagpur, India",duration:"2 months",stipend:"Unpaid",initials:"EW",description:"Help streamline day-to-day processes and maintain team records."}
];

const grid = document.getElementById("internship-grid");
const searchInput = document.getElementById("search");
const domainSelect = document.getElementById("domain");
const modeSelect = document.getElementById("mode");
const resultNumber = document.getElementById("result-number");
const heroCount = document.getElementById("hero-count");
const emptyState = document.getElementById("empty-state");
const activeFilters = document.getElementById("active-filters");

function createCard(item) {
  const article = document.createElement("article");
  article.className = "internship-card";
  const top = document.createElement("div");
  top.className = "card-top";
  const icon = document.createElement("span");
  icon.className = "company-icon";
  icon.textContent = item.initials;
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = item.domain;
  top.append(icon, tag);

  const title = document.createElement("h3");
  title.textContent = item.title;
  const company = document.createElement("p");
  company.className = "company";
  company.textContent = item.company;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  [item.location, item.duration, item.stipend].forEach(value => {
    const span = document.createElement("span");
    span.textContent = value;
    meta.appendChild(span);
  });

  const bottom = document.createElement("div");
  bottom.className = "card-bottom";
  const workMode = document.createElement("span");
  workMode.className = "work-mode";
  workMode.textContent = item.mode;
  const apply = document.createElement("a");
  apply.className = "apply-link";
  apply.href = "mailto:careers@example.com?subject=" + encodeURIComponent("Internship enquiry: " + item.title);
  apply.setAttribute("aria-label", "Enquire about " + item.title + " at " + item.company);
  apply.append(document.createTextNode("View details "), Object.assign(document.createElement("span"), {textContent:"↗"}));
  bottom.append(workMode, apply);
  article.append(top, title, company, meta, bottom);
  return article;
}

function renderInternships() {
  try {
    const query = searchInput.value.trim().toLowerCase();
    const domain = domainSelect.value;
    const mode = modeSelect.value;
    const filtered = internships.filter(item => {
      const searchable = [item.title, item.company, item.domain, item.location, item.description, item.mode].join(" ").toLowerCase();
      return searchable.includes(query) && (!domain || item.domain === domain) && (!mode || item.mode === mode);
    });

    grid.replaceChildren();
    filtered.forEach(item => grid.appendChild(createCard(item)));
    resultNumber.textContent = filtered.length;
    heroCount.textContent = internships.length;
    emptyState.hidden = filtered.length !== 0;

    activeFilters.replaceChildren();
    [query ? "Search: " + searchInput.value.trim() : "", domain, mode].filter(Boolean).forEach(label => {
      const chip = document.createElement("span");
      chip.className = "filter-chip";
      chip.textContent = label;
      activeFilters.appendChild(chip);
    });
  } catch (error) {
    document.getElementById("error-state").hidden = false;
    console.error("Could not render internship listings:", error);
  }
}

[searchInput, domainSelect, modeSelect].forEach(control => control.addEventListener("input", renderInternships));
document.getElementById("clear").addEventListener("click", clearFilters);
document.getElementById("reset-empty").addEventListener("click", clearFilters);
function clearFilters() {
  searchInput.value = "";
  domainSelect.value = "";
  modeSelect.value = "";
  renderInternships();
  searchInput.focus();
}
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});
renderInternships();
