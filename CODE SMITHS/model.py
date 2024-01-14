# model.py
#importing libs
import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import numpy as np
import plotly.graph_objects as plt

#Function to download stock prices
def get_stock_data(ticker, start_date, end_date):
    try:
        stock_data = yf.download(ticker, start=start_date, end=end_date)
        return stock_data
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return None
#Function to train and plot the graph
def forecast_stock_prices(stock_data, forecast_days):
    if stock_data is None or len(stock_data) == 0:
        return None

    # Feature engineering: Use 'days' as a feature
    stock_data['days'] = (stock_data.index - stock_data.index[0]).days

    # Prepare features (X) and target (y)
    X = stock_data[['days']]
    y = stock_data['Close']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

    # Create and fit the model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Generate future dates for prediction
    future_days = range(stock_data['days'].max() + 1, stock_data['days'].max() + 1 + forecast_days)
    future_df = pd.DataFrame({'days': future_days})

    # Make predictions for future dates
    predictions = model.predict(future_df)

    # Add some randomness to the predictions
    randomness = np.random.normal(0, 3, size=len(predictions))
    predictions += randomness

    # Plot the forecast using Plotly
    fig = plt.Figure()

    # Plot historical data for the past 60 days
    last_60_days_data = stock_data.iloc[-60:]
    fig.add_trace(plt.Scatter(x=last_60_days_data['days'], y=last_60_days_data['Close'], mode='lines', name='Historical Data (Last 60 days)'))


    # Plot forecasted data
    fig.add_trace(plt.Scatter(x=future_df['days'], y=predictions, mode='lines', name='Forecast'))

    # Customize layout
    fig.update_layout(
        xaxis_title='Days',
        yaxis_title='Closing Price',
        title='Stock Price Forecast',
        showlegend=True,
        grid=dict(rows=1, columns=1),
    )

    return fig
