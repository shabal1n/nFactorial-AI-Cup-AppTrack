import logging
from telegram import Update
from utils import ogg2wav
from SpeechToText import speech_to_text
from DiaryToImage import diary_to_images
from telegram.ext import (
    filters,
    MessageHandler,
    ApplicationBuilder,
    CommandHandler,
    ContextTypes,
)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_message(
        chat_id=update.effective_chat.id,
        text="I'm your diary bot, you can tell me about your feelings and thoughts, I can generate images based on your diary notes, generate insights and help you!",
    )


async def generate_image(update: Update, context: ContextTypes.DEFAULT_TYPE):
    urls = diary_to_images(str(update.message.text))
    for i in urls:
        await context.bot.send_message(chat_id=update.effective_chat.id, text=i)

async def voice_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    file_id = update.message.voice.file_id
    file = await context.bot.get_file(str(file_id))

    file_size = file.file_size
    if int(file_size) >= 715000:
        context.bot.send_message(update.message.chat.id, 'Upload file size is too large.')
    else:
        download_file = await file.download_as_bytearray()
        with open('audio.ogg', 'wb') as file:
            file.write(download_file)
        ogg2wav('audio.ogg')
        text = speech_to_text('audio.wav')
        urls = diary_to_images(str(text))
        for i in urls:
            await context.bot.send_message(chat_id=update.effective_chat.id, text=i)



if __name__ == "__main__":
    application = (
        ApplicationBuilder()
        .token("6041907767:AAHwzeFmubA161ecpX5pUDMtHpBa0YfguqU")
        .build()
    )

    start_handler = CommandHandler("start", start)
    application.add_handler(start_handler)

    echo_handler = MessageHandler(filters.TEXT & (~filters.COMMAND), generate_image)
    application.add_handler(echo_handler)

    speech_handler = MessageHandler(filters.VOICE, voice_handler)
    application.add_handler(speech_handler)

    application.run_polling()
