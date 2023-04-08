from TextSummary import get_text_summary
from ImageGenerator import get_image_generation

def diary_to_images(text):
    text_summary = get_text_summary(text)
    urls = get_image_generation(text_summary)
    return urls