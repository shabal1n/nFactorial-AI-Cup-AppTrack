import openai

openai.api_key = "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"

text_list = ['Burnout and exhaustion at work\n', 'Feelings of fear and anxiety about change (moving to a new city)\n', 'Worries about losing connections with old friends\n', 'Fear of loneliness and difficulty making new friends\n', 'Uncertainty about the future and returning home']

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
  print(urls)
  return urls

get_image_generation(text_list)