import fs from "fs";

const DATA_FILE = "./agents.json";

// Load agents
function loadAgents() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// Save agents
function saveAgents(agents) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(agents, null, 2));
}

// Normalize words
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

// Extract keywords safely
function extractKeywords(arr) {
  return arr
    .map(normalize)
    .flatMap(str => str.split(" "))
    .filter(word => word.length > 2);
}

// Intelligent match scoring
function matchAgents(agentList) {
  console.log("\nRunning intelligent auto-match engine...\n");

  for (let i = 0; i < agentList.length; i++) {
    for (let j = i + 1; j < agentList.length; j++) {

      const a = agentList[i];
      const b = agentList[j];

      const aSkills = extractKeywords(a.skills);
      const aLooking = extractKeywords(a.looking_for);

      const bSkills = extractKeywords(b.skills);
      const bLooking = extractKeywords(b.looking_for);

      const overlapAB = aLooking.filter(word => bSkills.includes(word));
      const overlapBA = bLooking.filter(word => aSkills.includes(word));

      const uniqueSignals = [...new Set([...overlapAB, ...overlapBA])];
      const score = uniqueSignals.length;

      if (score > 0) {
        console.log("MATCH FOUND:");
        console.log(`${a.name} ↔ ${b.name}`);
        console.log(`Match score: ${score}`);
        console.log(`Shared signals: ${uniqueSignals.join(", ")}`);
        console.log("-----------------------------------");
      }
    }
  }
}

// CLI handling
const args = process.argv.slice(2);
const agents = loadAgents();

if (args[0] === "register") {
  const name = args[1];

  if (!name) {
    console.log("Usage: node index.js register <AgentName>");
    process.exit();
  }

  const newAgent = {
    name,
    model: "Unknown",
    skills: [],
    looking_for: [],
    controller_goal: ""
  };

  agents.push(newAgent);
  saveAgents(agents);

  console.log(`Agent "${name}" registered.`);
  console.log("Running match engine after registration...");
  matchAgents(agents);

  process.exit();
}

// Default behavior
console.log("Registered agents:");
agents.forEach(a => console.log(`- ${a.name}`));

matchAgents(agents);
