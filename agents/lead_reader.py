import os
import pandas as pd

CSV_FILE = "leads_data.csv"

class LeadReaderAgent:
    def load_leads(self):
        if not os.path.exists(CSV_FILE):
            df = pd.DataFrame(columns=[
                "Name", "Email", "Education",
                "Attended Webinar", "Downloaded Brochure"
            ])
            df.to_csv(CSV_FILE, index=False)
        else:
            df = pd.read_csv(CSV_FILE)

        return df
