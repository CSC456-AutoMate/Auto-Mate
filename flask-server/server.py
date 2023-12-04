from flask import Flask, jsonify, request, json
from flask_cors import CORS
import asyncio
from azure.identity.aio import ClientSecretCredential
from msgraph import GraphServiceClient
from msgraph.generated.models.user import User
from msgraph.generated.models.password_profile import PasswordProfile
from msgraph.generated.models.reference_create import ReferenceCreate


app = Flask(__name__)
CORS(app)

# Azure Setup Info
TENANT_ID = "<tenant_id>"
CLIENT_ID = "<client_id>"
CLIENT_SECRET = "<client_secret>"
GROUP_ID = "<group_id>"

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

# get user id
async def get_user_id(principalName):
    user = await client.users.by_user_id(f'{principalName}@<domain_name>').get()
    return user.id

# Add User to a group in Azure
async def add_user_to_group(principalName):
    user_id = await get_user_id(principalName)
    print(user_id)
    request_body = ReferenceCreate(
        odata_id = f"https://graph.microsoft.com/v1.0/directoryObjects/{user_id}"
    )
    result = await client.groups.by_group_id(GROUP_ID).members.ref.post(request_body)
    print("User Added to Group")
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

@app.route('/group', methods=['GET', 'POST'])
async def add_user_to_group_azure():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        await add_user_to_group(data['user_principal_name'])
        return "User Added to Group"
    return "Executing"


if __name__ == "__main__":
    app.run(debug=True)
