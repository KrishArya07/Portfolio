from flask import Flask, render_template, request, redirect, flash
import smtplib
from email.mime.text import MIMEText
import threading
import os

app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY", "fallback-secret")

def send_email_async(msg, sender_email, sender_password):
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print("Email error:", e)




@app.route("/")
def home():
    return render_template("home.html")


@app.route("/send-message", methods=["POST"])
def send_message():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")


    # -------- EMAIL CONFIG --------
    sender_email = os.environ.get("SENDER_EMAIL")      #tumhara gmail
    sender_password = os.environ.get("EMAIL_PASS"  )   #gmail app password 
    receiver_email = os.environ.get("RECEIVER_EMAIL")  #jahan mail aayega

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

    # try:
    #     server = smtplib.SMTP("smtp.gmail.com", 587)
    #     server.starttls()
    #     server.login(sender_email, sender_password)
    #     server.send_message(msg)
    #     server.quit()
    #     return {"status": "success"}

    #     flash("Message sent successfully! 🚀")
        
    # except Exception as e:
    #      return {"status": "error"}

    threading.Thread(
        target=send_email_async,
        args=(msg, sender_email, sender_password)
    ).start()

    return {"status": "success"}



if __name__ == "__main__":
    app.run(debug=True)
