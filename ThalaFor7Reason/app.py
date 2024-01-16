from final import final
from flask import Flask, render_template, request, jsonify

import io
from PIL import Image
import torchvision.transforms as transforms

app = Flask(__name__)

app.config['DEBUG'] = True
app.config['ENV'] = 'development'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def home():
    return render_template('caption.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Check if the request contains the 'image' field
        if 'image' not in request.files:
            return jsonify({'error': 'No file sent'})

        file = request.files['image']

        # Check if the file has an allowed extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not supported'})

        try:
            # Check if the file is empty
            if file.filename == '':
                return jsonify({'error': 'Empty file'})

            img_bytes = file.read()
            img = Image.open(io.BytesIO(img_bytes))

            # Apply transforms
            transform = transforms.Compose([
                transforms.Resize((299, 299)),
                transforms.ToTensor(),
                transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
            ])

            img = transform(img).unsqueeze(0)
            caption = final(img)
            return jsonify({'caption': caption})

        except IOError as e:
            return jsonify({'error': f'Error reading the image: {str(e)}'})
        except Exception as e:
            return jsonify({'error': f'Error during processing file: {str(e)}'})

    return jsonify({'res': 1})

if __name__ == '__main__':
    app.run(debug=True)
