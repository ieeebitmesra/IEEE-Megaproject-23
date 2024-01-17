from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/apply_filter', methods=['POST'])
def apply_filter():
    subprocess.run(['python3', 'apply_filter.py'])
    return "Filter applied successfully!"

if __name__ == '__main__':
    app.run(debug=True)
