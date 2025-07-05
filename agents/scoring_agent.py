class ScoringAgentLLM:
    def score_lead(self, lead_info):
        education = str(lead_info.get("Education", "")).strip().lower()
        score = 50

        if "b.tech" in education:
            score += 20
        elif "bsc" in education:
            score += 10

        if lead_info.get("Attended Webinar") == "Yes":
            score += 10
        if lead_info.get("Downloaded Brochure") == "Yes":
            score += 10

        return min(score, 100)
