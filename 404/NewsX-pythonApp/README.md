# News X Project

## Overview

The News X Project is an ambitious endeavor that automates the transformation of news articles into engaging video content. It leverages cutting-edge technologies, including web news APIs, BERT Extractive Summarizer for text summarization, Elevenlabs API for text to speech, and Wav2Lip for avatar lipsyncing. The result is a dynamic and visually compelling news presentation that combines natural language processing with AI-generated visuals.

## Components

### 1. Web News API
   - Collects news articles from news site API in order to get the entire content of an article.

### 2. BERT Extractizer Summarization (Text Summarization)
   - Generates concise summaries for the articles. This tool utilizes the HuggingFace Pytorch transformers library to run extractive summarizations.

### 4. Video Creation
   - Combines summarized text and lipsynced avatars using Wav2Lip to create engaging videos.

### 5. YouTube API Integration
   - Automatically uploads the generated videos to a specified YouTube channel.

## Getting Started

### Prerequisites
- Python
- Elevenlabs API key
- YouTube Developer API key

### Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/AbhirajSinha179/PythonNewsX.git
   cd news-x-project
