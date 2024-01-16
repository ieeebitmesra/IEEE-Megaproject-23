from flask import Flask, redirect, url_for, request, jsonify
import json
import route

app = Flask(__name__)
 
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/',methods=['GET', 'POST'])
def hello_world():
    data  = request.get_json()
    name = data['schoolName']
    del data['schoolName']
    x = data.values()
    y = [round(float(i),2) for i in x]
    pred,price = route.run(y,name)
    return jsonify(route_id=str(pred[0]),amount = price)

# main driver function
if __name__ =='__main__':
    app.run()
