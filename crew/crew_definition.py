from crewai import Crew
from crew.tasks import (
    read_task,
    score_task,
    summary_task,
    email_task
)

from agents.lead_reader import LeadReaderAgent
from agents.scoring_agent import ScoringAgentLLM
from agents.summary_agent import SummaryAgent
from agents.email_agent import EmailAgent
import pandas as pd
import os
CSV_FILE = "leads_data.csv"

def run_pipeline(new_lead_data):
    """
    Called from /submit_lead.
    Handles:
      - check if lead exists
      - update or insert new
      - run scoring/summarizing/email for new leads
    """

    # Create Crew object (not strictly required since you run steps manually)
    crew = Crew(
        agents=[
            read_task.agent,
            score_task.agent,
            summary_task.agent,
            email_task.agent
        ],
        tasks=[
            read_task,
            score_task,
            summary_task,
            email_task
        ]
    )

    # Load existing leads
    reader = LeadReaderAgent()
    all_leads_df = reader.load_leads()

    # Check if user already exists
    email = new_lead_data["Email"]
    existing_lead = all_leads_df[all_leads_df["Email"] == email]

    if not existing_lead.empty:
        # Existing user → update data
        all_leads_df.loc[
            all_leads_df["Email"] == email,
            ["Name", "Education", "Attended Webinar", "Downloaded Brochure"]
        ] = [
            new_lead_data["Name"],
            new_lead_data["Education"],
            new_lead_data.get("Attended Webinar", "No"),
            new_lead_data.get("Downloaded Brochure", "No"),
        ]
        all_leads_df.to_csv(CSV_FILE, index=False)

        # Run scoring and send email again
        lead_dict = all_leads_df[all_leads_df["Email"] == email].iloc[0].to_dict()
        score, summary = _run_scoring_summary_email(lead_dict)

        return {
            "message": "Lead already existed and data updated.",
            "score": score,
            "summary": summary
        }

    else:
        # New user → run full pipeline
        score, summary = _run_scoring_summary_email(new_lead_data)

        all_leads_df = pd.concat([
            all_leads_df,
            pd.DataFrame([new_lead_data])
        ], ignore_index=True)

        all_leads_df.to_csv(CSV_FILE, index=False)

        return {
            "message": "New lead saved and email sent.",
            "score": score,
            "summary": summary
        }


def update_existing_lead_pipeline(email, updates):
    """
    Called from /update_lead
    Handles partial updates like:
      {
        "email": "abc@example.com",
        "update": {
          "Attended Webinar": "Yes"
        }
      }
    """

    # Load existing leads
    reader = LeadReaderAgent()
    all_leads_df = reader.load_leads()

    if email not in all_leads_df["Email"].values:
        return {"error": "Lead not found."}

    # Apply updates
    for col, value in updates.items():
        if col in all_leads_df.columns:
            all_leads_df.loc[
                all_leads_df["Email"] == email, col
            ] = value

    all_leads_df.to_csv(CSV_FILE, index=False)

    # Fetch updated lead
    updated_lead = all_leads_df[all_leads_df["Email"] == email].iloc[0].to_dict()

    # Run scoring, summary, email again
    score, summary = _run_scoring_summary_email(updated_lead)

    return {
        "message": "Lead updated and email sent successfully.",
        "score": score,
        "summary": summary
    }


def _run_scoring_summary_email(lead_data):
    """
    Shared logic for scoring, summarizing, and emailing a single lead.
    """

    scorer = ScoringAgentLLM()
    summary_gen = SummaryAgent()
    emailer = EmailAgent(
        smtp_server="smtp.gmail.com",
        smtp_port=587,
        smtp_username="akhilchowdarydevarapu@gmail.com",
        smtp_password="wwai uqba qrkm vrfg",
        test_mode=False
    )

    # Run scoring
    score = scorer.score_lead(lead_data)

    # NEW: Unpack tuple from generate_summary
    summary_text, category = summary_gen.generate_summary(lead_data, score)

    # Send email using the summary text only
    emailer.send_email(
        recipient_email=lead_data["Email"],
        lead_name=lead_data["Name"],
        score=score,
        summary=summary_text
    )

    # Return the score and the summary text
    return score, summary_text
