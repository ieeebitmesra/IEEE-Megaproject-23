#main.py
#importing libs
import dash
from dash import dcc, html
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import yfinance as yf
import datetime as dt
import plotly.express as px
from model import get_stock_data, forecast_stock_prices

#start app
app = dash.Dash(__name__)

#App layout using dash html
app.layout = html.Div([
    html.Div([html.H1("Stock Price Visualization"),
        ],className='heading'),
    html.Div([
    html.Div([
        html.Div([    
          html.Label("Enter Stock Code:"),
          dcc.Input(id='stock-input', type='text', value='MSFT'),
          html.Button('Search', id='search-button', n_clicks=0,className='search-button')
        ],className='search_stock'),
        html.Div([
          html.Label("Select Date Range:"),
          dcc.DatePickerRange(
              id='date-picker',
              start_date=dt.date(2023, 1, 1),
              end_date=dt.date.today(),
              display_format='YYYY-MM-DD'
          ),
            html.Button('PLOT GRAPH', id='plot-button', n_clicks=0,className='plotgraph-button'),
        ],className='datepicker'),
        html.Div([
            html.Label("Number of days to predict"),
            dcc.Input(id='forecast-input',type='number',value='10'),
            html.Button('Forecast',id='forecast-button', n_clicks=0,className='forecast-button')
        ],className='forecast'),
    ],className='inputpart'),
   #item 2
    html.Div([
        html.Div([
            html.Div([
                html.Img(id='company-logo',src=''),
                html.H1(id='name')
            ],className='header'),
            html.Div(
                id="description", className='description_ticker'),
        ]),
        html.Div([
            dcc.Graph(id='stock-plot'),
            dcc.Graph(id='forecast-output')
        ]),
        ],className='visualpart')
    ],className='boxcontainer')
])

#Function to fetch company info based on stock code
def get_company_info(selected_stock):
    try:
        company_info = yf.Ticker(selected_stock)
        company_logo_url = company_info.info.get('logo_url', '')
        company_name = company_info.info.get('longName', '')
        company_description = company_info.info.get('longBusinessSummary', '')
        return company_logo_url, company_name, company_description
    except Exception as e:
        company_description = "Enter valid stock code. Refer https://www.advfn.com/nasdaq/nasdaq.asp    "
        return '', '', company_description


@app.callback(
    [Output('company-logo', 'src'),
     Output('name', 'children'),
     Output('description', 'children')],
    [Input('search-button', 'n_clicks')],
    [State('stock-input', 'value')]
)

#Function to update empty html divisions with fetched company info
def update_company_info(n_clicks, selected_stock):
    if n_clicks > 0:
        company_logo_url, company_name, company_description = get_company_info(selected_stock)
        print(f"Company Logo URL: {company_name}")
        return company_logo_url, company_name, company_description
    # If the button has not been clicked, return default values
    return '', '', ''

#Function to fetch stock prices from yfinance
def get_stock_data(ticker, start_date, end_date):
    try:
        stock_data = yf.download(ticker, start=start_date, end=end_date)
        return stock_data
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None

@app.callback(
    Output('stock-plot', 'figure'),
    [Input('plot-button', 'n_clicks')],
    [State('stock-input', 'value'),
     State('date-picker', 'start_date'),
     State('date-picker', 'end_date')]
)

#Function to plot a graph using fetched stock data
def update_plot(n_clicks, selected_stock, start_date, end_date):
    if n_clicks > 0:
        stock_data = get_stock_data(selected_stock, start_date, end_date)
        if stock_data is not None:
            fig = px.line(stock_data, x=stock_data.index, y='Close',
                          labels={'x': 'Date', 'y': 'Closing Price'},
                          title=f'{selected_stock} Stock Price Over Time')
            return fig
    # If the button has not been clicked or an error occurred, return an empty graph
    return px.line()

@app.callback(
    Output('forecast-output', 'figure'),
    [Input('forecast-button', 'n_clicks')],
    [State('stock-input', 'value'),
     State('date-picker', 'end_date'),
     State('forecast-input', 'value')]
)

#Function to plot a forecasted values onto the graph
def update_forecast(n_clicks, selected_stock, end_date, forecast_days):
    if n_clicks > 0:
        stock_data = get_stock_data(selected_stock, start_date=dt.date(2023, 1, 1), end_date=end_date)
        fig = forecast_stock_prices(stock_data, int(forecast_days))
        return fig
    # If the button has not been clicked or an error occurred, return an empty graph
    return px.line()

#Run the app
if __name__ == '__main__':
    app.run_server(debug=True)
