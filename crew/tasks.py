from crewai import Task
from crew.agents import (
    lead_reader_agent,
    scoring_agent,
    summary_agent,
    email_agent
)

read_task = Task(
    description="Load leads from CSV into a list of dictionaries.",
    expected_output="List of leads as dicts.",
    agent=lead_reader_agent,
)

score_task = Task(
    description="Calculate a score for a single lead.",
    expected_output="A numeric score.",
    agent=scoring_agent
)

summary_task = Task(
    description="Generate an email-friendly summary for the lead.",
    expected_output="One-paragraph summary string.",
    agent=summary_agent,
)

email_task = Task(
    description="Send an email to the lead with name, email, score, and summary.",
    expected_output="Confirmation that email was sent.",
    agent=email_agent,
)
