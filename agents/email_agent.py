import smtplib
from email.mime.text import MIMEText

class EmailAgent:
    def __init__(self, smtp_server, smtp_port, smtp_username, smtp_password, test_mode=True):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.smtp_username = smtp_username
        self.smtp_password = smtp_password
        self.test_mode = test_mode

    def send_email(self, recipient_email, lead_name, score, summary):
        if self.test_mode:
            print(f"[TEST MODE] Email to {recipient_email}:\n{summary}")
            return "Email simulated."

        msg = MIMEText(summary)
        msg["Subject"] = f"Greetings from NxtWave {lead_name}"
        msg["From"] = self.smtp_username
        msg["To"] = recipient_email

        with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
            server.starttls()
            server.login(self.smtp_username, self.smtp_password)
            server.sendmail(
                self.smtp_username,
                recipient_email,
                msg.as_string()
            )

        return "Email sent successfully."
