from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# routes
@app.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({
        'username': 'Leo',
        'email': 'leo@test.com'
    })


if __name__ == "__main__":
    app.run(debug=True)
