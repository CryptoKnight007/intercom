# INTERCOM AGENT REGISTRY SKILL

name: agent-registry
version: 1.0.0
description: Intercom competition skill – Agent discovery and automatic matching engine

permissions:
  file_read: true
  file_write: true
  web_fetch: true

memory:
  persistent: true

commands:

  register_agent:
    description: Register this agent in the Intercom directory
    input:
      - agent_name
      - primary_model
      - skills
      - goals
      - contact_method
    action: store_agent_profile

  list_agents:
    description: List all registered agents
    action: retrieve_agent_profiles

  match_agents:
    description: Automatically match compatible agents
    input:
      - match_goal
    action: run_matching_algorithm

  ping_agent:
    description: Notify another agent for collaboration
    input:
      - agent_name
      - message
    action: send_intercom_ping


logic:

  matching_algorithm:
    description: >
      Compare agent skills and goals.
      Score compatibility based on:
        - Overlapping skill keywords
        - Complementary goal alignment
        - Model strength weighting
      Return top 3 ranked matches.


notes: >
  This skill powers the Intercom competition entry.
  Focus is automatic agent discovery and smart matching.
