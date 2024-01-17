====
MEGA PROJECT
====

Idea -> Making an automated video news system

Working
=====

Firstly getting the news title, content and metadata from a news API, then summarizing it to have a certain amount of words (in order to reduce video runtime)
Using elevenlabs text-to-speech to get an audio version of the news

Implementing Wav2Lip lip-sync by the response audio received from tts

Final video generated will be uploaded to YT using Data API v3 and GCP auth

Since the entire pipeline requires each task to be resolved before being completed
and due to various API monetary restrictions, we'll upload videos at timely intervals to avoid these issues