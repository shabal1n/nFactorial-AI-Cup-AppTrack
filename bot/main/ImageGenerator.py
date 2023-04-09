import openai
from main.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def get_image_generation(text_list):
  urls = []
  counter = 0
  for text in text_list:
    if counter < 3:
      response = openai.Image.create(
        prompt=text,
        n=1,
        size="256x256"
      )
      urls.append(response.__dict__['_previous']['data'][0]['url'])
      counter += 1
  # print(urls)
  return urls