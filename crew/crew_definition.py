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

    # Load existing leads
    reader = LeadReaderAgent()
    all_leads = reader.load_leads()

    # Check if user already exists
    email = new_lead_data["Email"]
    existing_lead = None
    
    for lead in all_leads:
        if lead.get("Email") == email:
            existing_lead = lead
            break

    if existing_lead:
        # Existing user → update data
        existing_lead.update({
            "Name": new_lead_data["Name"],
            "Education": new_lead_data["Education"],
            "Attended Webinar": new_lead_data.get("Attended Webinar", "No"),
            "Downloaded Brochure": new_lead_data.get("Downloaded Brochure", "No"),
        })
        reader.save_leads(all_leads)

        # Run scoring and send email again
        score, summary = _run_scoring_summary_email(existing_lead)

        return {
            "message": "Lead already existed and data updated.",
            "score": score,
            "summary": summary
        }

    else:
        # New user → run full pipeline
        score, summary = _run_scoring_summary_email(new_lead_data)

        # Add new lead
        reader.add_lead(new_lead_data)

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
    all_leads = reader.load_leads()

    # Check if lead exists
    lead_exists = any(lead.get("Email") == email for lead in all_leads)
    if not lead_exists:
        return {"error": "Lead not found."}

    # Update the lead
    updated_lead = reader.update_lead(email, updates)
    if not updated_lead:
        return {"error": "Failed to update lead."}

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
    
    # Check if email credentials are configured
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    test_mode = not (smtp_username and smtp_password)
    
    emailer = EmailAgent(
        smtp_server=os.getenv("SMTP_SERVER", "smtp.gmail.com"),
        smtp_port=int(os.getenv("SMTP_PORT", 587)),
        smtp_username=smtp_username,
        smtp_password=smtp_password,
        test_mode=test_mode
    )

    # Run scoring
    score = scorer.score_lead(lead_data)

    # Unpack tuple from generate_summary
    summary_text, category = summary_gen.generate_summary(lead_data, score)

    # Send email using the summary text only
    email_result = emailer.send_email(
        recipient_email=lead_data["Email"],
        lead_name=lead_data["Name"],
        score=score,
        summary=summary_text
    )

    # Return the score and the summary text
    return score, summary_text
