import pandas as pd
import psycopg2
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
import googlemaps
import requests
from bs4 import BeautifulSoup
import os
import urllib.parse as up

up.uses_netloc.append("postgres")
url = up.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect(database=url.path[1:],
user=url.username,
password=url.password,
host=url.hostname,
port=url.port
)
api_key = os.environ["API_KEY"]

def run(coords,name):
    conn = psycopg2.connect("dbname=Transport-easy user=postgres password=Mayuyu@18")
    curr = conn.cursor()
    curr.execute('SELECT * FROM busroutes WHERE route_name=%s', (name,))
    x = curr.fetchall()

    final = []
    for i in range(0,len(x)):
        l=x[i][4]
        for j in l:
            t = j.split(",")
            temp = [eval(k) for k in t]
            temp.append(x[i][0])
            final.append(temp)
    #curr.close()
    db = pd.DataFrame(final, columns=["lat","lng","id"])

    X = db.drop('id',axis= 1)
    Y = db['id']

    pipe = make_pipeline(StandardScaler(),KNeighborsClassifier(n_neighbors = 1))
    pipe.fit(X,Y)
    test = []
    test.append(coords)
    pred = pipe.predict(pd.DataFrame(test,columns=["lat","lng"]))
    #print(pred)
    curr.execute('SELECT destination FROM busroutes WHERE route_id=%s'%(pred[0]))
    x= curr.fetchone()
    x = x[0].split(',')
    curr.close()
    gmaps = googlemaps.Client(key=api_key)
    directions_result = gmaps.directions(coords, x, mode="driving")
    distance = 0
    legs = directions_result[0].get("legs")
    for leg in legs:
        distance = distance + leg.get("distance").get("value")

    r = requests.get("https://www.mypetrolprice.com/31/Diesel-price-in-Ranchi")
    htmldata = r.content
    soup = BeautifulSoup(htmldata, 'html.parser')
    result = soup.find("div", {"class" : "fnt27"})
    price = int(float(result.text[2:])*(distance/5000)*7)
    #print(result.text)  
    return pred,price


