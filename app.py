from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
from crew.crew_definition import run_pipeline, update_existing_lead_pipeline,_run_scoring_summary_email


app = Flask(__name__)
CORS(app)

@app.route("/submit_lead", methods=["POST"])
def submit_lead():
    data = request.json

    lead_data = {
        "Name": data["name"],
        "Email": data["email"],
        "Education": data["education"],
        "Attended Webinar": data.get("attended_webinar", "No"),
        "Downloaded Brochure": data.get("downloaded_brochure", "No"),
    }

    # Call CrewAI pipeline for new/updated lead
    result = run_pipeline(lead_data)

    return jsonify(result)


@app.route("/update_lead", methods=["PATCH"])
def update_lead():
    data = request.json

    email = data.get("email")
    updates = data.get("update")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    if not updates:
        return jsonify({"error": "No updates provided"}), 400

    # Call CrewAI pipeline for updating existing lead
    result = update_existing_lead_pipeline(email, updates)

    return jsonify(result)



if __name__ == "__main__":
    app.run(debug=True, port=5000)
