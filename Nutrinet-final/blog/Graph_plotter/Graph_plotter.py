import plotly.graph_objects as go
import pandas as pd


def g_plotter():
    df = pd.read_csv('bpm.csv')
    fig = go.Figure([go.Scatter(x=df['Time'], y=df['Value'])])
    fig.show()

g_plotter()