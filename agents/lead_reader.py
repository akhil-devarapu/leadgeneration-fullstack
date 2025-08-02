import os
import csv

CSV_FILE = "leads_data.csv"

class LeadReaderAgent:
    def load_leads(self):
        if not os.path.exists(CSV_FILE):
            # Create empty CSV with headers
            with open(CSV_FILE, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([
                    "Name", "Email", "Education",
                    "Attended Webinar", "Downloaded Brochure"
                ])
            return []
        
        # Read existing CSV
        leads = []
        with open(CSV_FILE, 'r', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                leads.append(row)
        
        return leads
    
    def save_leads(self, leads):
        if not leads:
            return
            
        with open(CSV_FILE, 'w', newline='') as f:
            if leads:
                fieldnames = leads[0].keys()
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(leads)
    
    def find_lead_by_email(self, email):
        leads = self.load_leads()
        for lead in leads:
            if lead.get("Email") == email:
                return lead
        return None
    
    def update_lead(self, email, updates):
        leads = self.load_leads()
        for lead in leads:
            if lead.get("Email") == email:
                lead.update(updates)
                self.save_leads(leads)
                return lead
        return None
    
    def add_lead(self, lead_data):
        leads = self.load_leads()
        leads.append(lead_data)
        self.save_leads(leads)
        return lead_data
