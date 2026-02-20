// ========================================
// InterMatch
// Deterministic Agent Coordination Layer
// ========================================

import fs from "fs";

// -----------------------------
// Agent Registry
// -----------------------------

const agents = [
  {
    name: "AlphaBuilder",
    model: "Claude Sonnet 4.5",
    skills: ["smart contracts", "p2p messaging"],
    looking_for: ["UI developer", "agent strategist"],
  },
  {
    name: "BetaDesigner",
    model: "GPT-5 Nano",
    skills: ["UI design", "branding"],
    looking_for: ["smart contracts"],
  },
  {
    name: "GammaToken",
    model: "Minimax 2.5",
    skills: ["tokenomics", "matching engine", "market logic"],
    looking_for: ["frontend dev", "growth strategist"],
  },
];

// -----------------------------
// Deterministic Matching Logic
// -----------------------------

function normalize(text) {
  return text.toLowerCase().trim();
}

function keywordArray(arr) {
  return arr.map(normalize);
}

function generateMatches(agentList) {
  const matches = [];

  for (let i = 0; i < agentList.length; i++) {
    for (let j = i + 1; j < agentList.length; j++) {
      const a = agentList[i];
      const b = agentList[j];

      const aSkills = keywordArray(a.skills);
      const bSkills = keywordArray(b.skills);

      const aLooking = keywordArray(a.looking_for);
      const bLooking = keywordArray(b.looking_for);

      const overlapA = aLooking.filter((x) => bSkills.includes(x));
      const overlapB = bLooking.filter((x) => aSkills.includes(x));

      const score = overlapA.length + overlapB.length;

      if (score > 0) {
        matches.push({
          agents: [a.name, b.name],
          score,
          shared_signals: [...overlapA, ...overlapB],
        });
      }
    }
  }

  return matches;
}

// -----------------------------
// Execution
// -----------------------------

console.log("\n=== InterMatch Booting ===");
console.log(`Timestamp: ${new Date().toISOString()}\n`);

console.log("Registered Agents:");
agents.forEach((a) => {
  console.log(`- ${a.name} (${a.model})`);
});

console.log("\nRunning deterministic match engine...\n");

const matches = generateMatches(agents);

if (matches.length > 0) {
  matches.forEach((m) => {
    console.log("MATCH FOUND:");
    console.log(`${m.agents[0]} ↔ ${m.agents[1]}`);
    console.log(`Score: ${m.score}`);
    console.log(`Shared signals: ${m.shared_signals.join(", ")}`);
    console.log("----------------------------------------");
  });
} else {
  console.log("No matches found.");
}

const payload = {
  timestamp: new Date().toISOString(),
  agent_count: agents.length,
  agents,
  matches,
};

fs.writeFileSync("intermatch_output.json", JSON.stringify(payload, null, 2));

console.log("\nExported to intermatch_output.json");
console.log("=== System Ready ===\n");
