from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
from crew.crew_definition import run_pipeline, update_existing_lead_pipeline
import os

app = Flask(__name__)
CORS(app, origins=["*"])  # Allow all origins for production

@app.route("/submit_lead", methods=["POST"])
def submit_lead():
    try:
        data = request.json
        
        # Prepare lead data for CrewAI pipeline
        lead_data = {
            "Name": data["name"],
            "Email": data["email"],
            "Education": data["education"],
            "Attended Webinar": data.get("attended_webinar", "No"),
            "Downloaded Brochure": data.get("downloaded_brochure", "No")
        }

        # Run the CrewAI pipeline
        result = run_pipeline(lead_data)
        
        return jsonify(result)
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/update_lead", methods=["PATCH"])
def update_lead():
    try:
        data = request.json
        email = data.get("email")
        updates = data.get("update")

        if not email:
            return jsonify({"error": "Email is required"}), 400

        if not updates:
            return jsonify({"error": "No updates provided"}), 400

        # Run the CrewAI update pipeline
        result = update_existing_lead_pipeline(email, updates)
        
        if "error" in result:
            return jsonify(result), 404
            
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
