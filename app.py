from flask import Flask, render_template, request
import os
import requests

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "fallback-secret")


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/health")
def health():
    return "OK", 200


@app.route("/send-message", methods=["POST"])
def send_message():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    api_key = os.environ.get("BREVO_API_KEY")
    sender_email = os.environ.get("SENDER_EMAIL")

    if not api_key or not sender_email:
        return {"status": "error", "message": "Missing environment variables"}

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": api_key,
        "content-type": "application/json"
    }

    data = {
        "sender": {
            "name": "Portfolio Contact",
            "email": sender_email
        },
        "to": [
            {
                "email": sender_email,
                "name": "Krish"
            }
        ],
        "subject": f"New Portfolio Message from {name}",
        "htmlContent": f"""
        <h3>New Contact Message 🚀</h3>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Message:</strong><br>{message}</p>
        """,
        "replyTo": {
            "email": email
        }
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        print(response.status_code, response.text)

        if response.status_code == 201:
            return {"status": "success"}
        else:
            return {"status": "error", "details": response.text}

    except Exception as e:
        print("Brevo API error:", e)
        return {"status": "error"}
    

if __name__ == "__main__":
    app.run(debug=True)
