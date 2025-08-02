import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

class EmailAgent:
    def __init__(self, smtp_server, smtp_port, smtp_username, smtp_password, test_mode=True):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.smtp_username = smtp_username
        self.smtp_password = smtp_password
        self.test_mode = test_mode

    def send_email(self, recipient_email, lead_name, score, summary):
        """Send personalized email based on lead score (score is for internal use only)"""
        try:
            if self.test_mode:
                print(f"[TEST MODE] Email to {recipient_email}:")
                print(f"Subject: Welcome to NxtWave!")
                print(f"Recipient: {recipient_email}")
                print(f"Content:\n{summary}")
                print(f"[INTERNAL] Lead Score: {score}/100")
                return "Email simulated in test mode."

            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_username
            msg['To'] = recipient_email
            msg['Subject'] = "Welcome to NxtWave!"

            # Set email body (summary only, no score)
            msg.attach(MIMEText(summary, 'plain'))

            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                text = msg.as_string()
                server.sendmail(self.smtp_username, recipient_email, text)

            print(f"✅ Email sent successfully to {recipient_email} (Score: {score}/100 - Internal)")
            return "Email sent successfully."

        except Exception as e:
            error_msg = f"Error sending email: {str(e)}"
            print(f"❌ {error_msg}")
            return error_msg
