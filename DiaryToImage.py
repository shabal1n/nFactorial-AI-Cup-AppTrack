from TextSummary import get_text_summary
from ImageGenerator import get_image_generation

async def diary_to_images(text):
    text_summary = await get_text_summary(text)
    urls = await get_image_generation(text_summary)
    return urls