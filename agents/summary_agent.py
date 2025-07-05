class SummaryAgent:
    def generate_summary(self, lead_info, score):
        name = lead_info.get("Name", "User")
        education = lead_info.get("Education", "your education")
        attended_webinar = lead_info.get("Attended Webinar", "No")
        downloaded_brochure = lead_info.get("Downloaded Brochure", "No")

        if score >=90:
            category = "Hot"
            body = (
                f"Hi {name},\n\n"
                "Thanks for showing strong interest in NxtWave!\n\n"
                f"With your solid background in {education}, you're perfectly positioned "
                "to benefit from NxtWave's programs.\n\n"
                "We’d love to help you take the next step toward your goals.\n\n"
                 "Feel free to reach out to student support team +913424352526 to learn more.\n\n"
                "Regards,\nNxtWave Team"
            )
        elif score >70:
            category = "Warm"
            body = (
                f"Hi {name},\n\n"
                "Thanks for exploring opportunities with NxtWave!\n\n"
                f"With your background in {education}, diving deeper into NxtWave's diverse "
                "courses could boost your career greatly.\n\n"
                "Feel free to reach out to student support team +913424352526 to learn more.\n\n"
                "Regards,\nNxtWave Team"
            )
        else:
            category = "Cold"
            body = (
                f"Hi {name},\n\n"
                "Thanks for checking us out!\n\n"
                "It seems you're still exploring options. We'd love to share more resources "
                "to help you make the best choice for your career.\n\n"
                "Reach out anytime to the support team +913424352526 if you'd like to discuss your goals.\n\n"
                "Regards,\nNxtWave Team"
            )

        return body, category
