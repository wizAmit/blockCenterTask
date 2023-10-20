from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import subprocess
from reportlab.pdfgen import canvas


app = Flask(__name__)
CORS(app)

def generate_pdf(res):
    c = canvas.Canvas("sample.pdf")
    c.drawString(100, 750, res)
    c.showPage()
    c.save()

# Read the configuration from the JSON file
with open('config.json', 'r') as config_file:
    config = json.load(config_file)
r_script_path = config.get('r_script_path', '')

@app.route('/', methods=['GET'])
def success():
    print('Yay!!')
    return 'welcome'

@app.route('/get-pdf/<pdf_filename>')
def get_pdf(pdf_filename='sample.pdf'):
        return send_file(pdf_filename, as_attachment=True)

@app.route('/birthdate', methods=['POST'])
def calculate_birthdate_info():
    try:
        birthdate = request.json['birthdate']

        # Execute the external R script with the provided birthdate
        r_command = f"Rscript {r_script_path} {birthdate}"
        result = subprocess.check_output(r_command, shell=True, text=True)

        # Process the result as needed
        #age, day_of_week = result.strip().split('\n')
        response = {
                'age': result[0], 
                'day_of_week': result[1]
                }
        generate_pdf(response)
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

