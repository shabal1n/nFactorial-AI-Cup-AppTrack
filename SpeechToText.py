import openai
import codecs

from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def speech_to_text(audio_file):
    audio_file = open("audio.wav", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    print(u'{0}'.format(transcript.text))
    return transcript