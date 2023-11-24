from flask import Flask, jsonify, request, json
from flask_cors import CORS
import asyncio
from azure.identity.aio import ClientSecretCredential
from msgraph import GraphServiceClient
from msgraph.generated.models.user import User
from msgraph.generated.models.password_profile import PasswordProfile


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


# Create User in Azure Active Directory
async def create_user(display_name, mail_nickname, user_principal_name, password):
    request_body = User(
        account_enabled = True,
        display_name = display_name,
        mail_nickname = mail_nickname,
        user_principal_name = f"{user_principal_name}@<domain_name>",
        password_profile = PasswordProfile(
            force_change_password_next_sign_in = True,
            password = password,
            )
        )
    result = await client.users.post(request_body)
    print("User Created")
    return result

# routes
@app.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({
        'username': 'Leo',
        'email': 'leo@test.com'
    })

@app.route('/', methods=['GET','POST'])
async def create_azure_user():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        await create_user(data['display_name'], data['mail_nickname'], data['user_principal_name'], data['password'])
        return "User Created"
    return "Executing"

if __name__ == "__main__":
    app.run(debug=True)
