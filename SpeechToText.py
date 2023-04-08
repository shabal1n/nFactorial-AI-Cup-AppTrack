import openai
import codecs

openai.api_key = "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"

def speech_to_text(audio_file):
    audio_file = open("audio.wav", "rb")
    transcript = openai.Audio.transcribe("whisper-1", audio_file)
    print(u'{0}'.format(transcript.text))
    return transcript