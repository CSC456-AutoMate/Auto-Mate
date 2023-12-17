import json
import pytest
from app import app


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_test_route(client):
    response = client.get('/test')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == {'username': 'Leo', 'email': 'leo@test.com'}


@pytest.mark.asyncio
async def test_create_azure_user(client):
    data = {
        'display_name': 'John Doe',
        'mail_nickname': 'john.doe',
        'user_principal_name': 'john.doe',
        'password': 'securepassword'
    }

    response = client.post('/',
                           data=json.dumps(data),
                           content_type='application/json')
    assert response.status_code == 200
    assert b"User Created" in response.data


@pytest.mark.asyncio
async def test_add_user_to_group_azure(client):
    data = {'user_principal_name': 'john.doe'}

    response = client.post('/group',
                           data=json.dumps(data),
                           content_type='application/json')
    assert response.status_code == 200
    assert b"User Added to Group" in response.data
