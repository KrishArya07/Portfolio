from flask import Flask, render_template, request, redirect, flash
import smtplib
from email.mime.text import MIMEText
import os

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


    # -------- EMAIL CONFIG --------
    sender_email = os.environ.get("SENDER_EMAIL")      #tumhara gmail
    sender_password = os.environ.get("BREVO_SMTP_KEY")   #gmail app password 
    receiver_email = sender_email  #jahan mail aayega

    body = f"""
    New Contact Message 🚀

    Name: {name}
    Email: {email}

    Message:
    {message}
    """

    msg = MIMEText(body)
    msg["Subject"] = f"New Portfolio Message from {name}"
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Reply-To"] = email

    try:
         server = smtplib.SMTP("smtp-relay.brevo.com", 587)
         server.starttls()
         server.login(sender_email, sender_password)
         server.send_message(msg)
         server.quit()
         return {"status": "success"}
    
    except Exception as e:
        print("Brevo error:", e)
        return {"status": "error"}


if __name__ == "__main__":
    app.run(debug=True)
