from flask import Flask, jsonify, request, json
from flask_cors import CORS
import asyncio
from azure.identity.aio import ClientSecretCredential
from msgraph import GraphServiceClient


app = Flask(__name__)
CORS(app)

# Azure Setup Info
TENANT_ID = "<tenant_id>"
CLIENT_ID = "<client_id>"
CLIENT_SECRET = "<client_secret>"

# Initialize a GraphServiceClient object
credential = ClientSecretCredential(
        tenant_id=TENANT_ID,
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET
    )

scopes = ['https://graph.microsoft.com/.default']
client = GraphServiceClient(credentials=credential, scopes=scopes)




# routes
@app.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({
        'username': 'Leo',
        'email': 'leo@test.com'
    })


if __name__ == "__main__":
    app.run(debug=True)
