import subprocess
import openai

openai.api_key = "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"

def ogg2wav(ofn):
    subprocess.run(['ffmpeg', '-i', ofn, 'audio.wav', '-y'])