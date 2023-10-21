from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
from io import BytesIO
import json
import subprocess
from reportlab.pdfgen import canvas

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def generate_pdf(res):
    c = canvas.Canvas("sample.pdf")
    c.drawString(100, 750, json.dumps( res ))
    c.showPage()
    c.save()
    print('PDF saved successfully')

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# Read the configuration from the JSON file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)
r_script_path = config.get('r_script_path', '')

@app.route('/', methods=['GET'])
def success():
    print('Yay!!')
    return 'welcome'

@app.route('/get-pdf/', methods=['GET', 'OPTIONS'])
def get_pdf(pdf_filename="sample.pdf"):
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    return _corsify_actual_response( send_file(pdf_filename, as_attachment=True) )

@app.route('/birthdate', methods=['POST', 'OPTIONS'])
def calculate_birthdate_info():
    if request.method == "OPTIONS": # CORS preflight
        return _build_cors_preflight_response()
    elif request.method == "POST":
        app.logger.info(f'Incoming Request Data: {request.__dict__}')
        try:
            birthdate = request.json['dateOfBirth']

            # Execute the external R script with the provided birthdate
            r_command = f"Rscript {r_script_path} {birthdate}"
            result = subprocess.check_output(r_command, shell=True, text=True)

            # Process the result as needed
            #age, day_of_week = result.strip().split('\n')
            response = {
                    'age': result[0], 
                    'day_of_week': result[1]
                    }
            pdf_file = generate_pdf(response)
            return _corsify_actual_response(jsonify(response))
        except Exception as e:
            return _corsify_actual_response(jsonify({'error': str(e)}))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

