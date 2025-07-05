from crewai import Agent

lead_reader_agent = Agent(
    role="Data Retriever",
    goal="Read leads from CSV and provide them as dictionaries.",
    backstory="A specialist in reading data from files.",
)

scoring_agent = Agent(
    role="Evaluator",
    goal="Calculate a score for a given lead based on details like education and engagement.",
    backstory="An expert in evaluating the quality of leads."
)

summary_agent = Agent(
    role="Summarizer",
    goal="Generate a friendly summary for a lead with their score and information.",
    backstory="An expert writer who crafts email-friendly summaries."
)

email_agent = Agent(
    role="Communicator",
    goal="Send an email to a lead with their score and summary.",
    backstory="An expert email sender."
)
