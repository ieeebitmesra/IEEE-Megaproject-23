# NewsX
#
# Firstly getting the news title, content and metadata from a news API,
# then summarizing it to have a certain amount of words (in order to reduce video runtime)
# Using elevenlabs text-to-speech to get an audio version of the news
#
# Implementing Wav2Lip lip-sync by the response audio received from tts
#
# Final video generated will be uploaded to YT using Data API v3 and GCP auth
#
# Since the entire pipeline requires each task to be resolved before being completed
# and due to various API monetary restrictions, we'll upload videos


# imports
import requests
import os
from dotenv import load_dotenv
import json
from summarizer import Summarizer
# youtube upload api
from youtube_upload.client import YoutubeUploader
load_dotenv()

CHUNK_SIZE=1024
# Text-to-speech, audio saved to output.mp3 at root level of the directory,, to be used for text-to-avatar
def make_audio(summarizedcontent):

    key = os.getenv("ELEVENLABS_API_KEY")
    # voice ID of american ground news reporter
    voice_id = "5Q0t7uMcjvnagumLfvZi"
    url = "https://api.elevenlabs.io/v1/text-to-speech/"+voice_id

    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": key
    }
    # for hindi news switch to multilingual model, check if v1 or v2 works better
    data = {
        "text": summarizedcontent,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }

    response = requests.post(url, json=data, headers=headers)
    with open('output.mp3', 'wb') as f:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                f.write(chunk)


# Summarizing text
def summarized_news(text):
    # bert model summarizer
    model = Summarizer()
    # need to make sure ratio is not getting neglected,
    # if so, use num_sentences=10 so that lapses in words do not occur
    result = model(text, ratio=0.2)
    full = ''.join(result)
    return full


# calling news API and getting the content of a sample news article (ex: on blockchain)
def get_news():
    key = os.getenv("NEWS_API_KEY")
    url = "https://newsdata.io/api/1/news?"

    # latest news from past 24 hours from US for testing (to get english articles)
    # look to get indian news / hindi articles as well
    params = {
        "country": "us",
        "timeframe": "24"
    }

    headers = {
        "X-ACCESS-KEY": key,
        "Content-Type": "application/json"
    }
    # Make a get request with the parameters.
    response = requests.get(url, params=params, headers=headers)

    data = response.text
    convert_json = json.loads(data)
    articles = convert_json['results']

    # returning the articles dict
    return articles

def upload_video(file_path, title= "Automated video upload", description="Uploading videos to YT automatedly"):

    uploader = YoutubeUploader(secrets_file_path="./client_secret_610949113764-emvq9t18ac0sg7qr614dou9d9tng000l.apps.googleusercontent.com.json")
    uploader.authenticate() # use access token and refresh token here in parameters
    # Video options
    options = {
        "title": title,  # Video title
        "description": description,  # Video description
        "tags": ["news", "india", "recent"],
        "categoryId": "22",
        "privacyStatus": "public",  # Video privacy. Can either be "public", "private", or "unlisted"
        "kids": False,  # Specifies if the Video if for kids or not. Defaults to False.
        # "thumbnailLink": "https://cdn.havecamerawilltravel.com/photographer/files/2020/01/youtube-logo-new-1068x510.jpg"
        # Optional. Specifies video thumbnail.
    }

    # upload video
    uploader.upload(file_path, options)

def main():
    # get the dict of articles
    news_articles = get_news()

    # summarizing topmost article
    summ = summarized_news(news_articles[0]['content'])

    # text to speech audio generated
    # make_audio(summ)

    # video creation
    
    # video upload
    file_path = "./sample_vid.mp4"
    upload_video(file_path)

if __name__ == '__main__':
    main()

