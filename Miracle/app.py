from flask import Flask,render_template,request
import pickle
import random
import numpy as np
app=Flask(__name__)
model=pickle.load(open('model.pkl','rb'))
scale=pickle.load(open('scale.pkl','rb'))
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/corporate.html')
def corporate():
    return render_template('corporate.html')
@app.route('/d.html')
def d():
    return render_template('d.html')
@app.route('/h.html')
def h():
    return render_template('h.html')
@app.route('/cure.html')
def cure():
    return render_template('cure.html')
@app.route('/heart.html')
def heart():
    return render_template('heart.html')
@app.route('/diabetes.html')
def diabetes():
    return render_template('diabetes.html')
@app.route('/predict',methods=['POST','GET'])
def predict():
    features=[]
    features.append(request.form.get("Age"))
    features.append(request.form.get("sex"))
    features.append(request.form.get("bp"))
    features.append(request.form.get("cholestrol"))
    features.append(request.form.get("sugar"))
    features.append(request.form.get("heart"))
    final=[np.array(features)]
    result=model.predict(scale.transform(final))
    print(result)
    if(result[0]==0):
        x=random.randint(20,40)
        return render_template('name.html',pred=request.form.get("name"),percent=x)
    else:
        y=random.randint(70,100)
        return render_template('name.html',pred=request.form.get("name"),percent=y)
if __name__=='__main__':
    app.run(debug=True)