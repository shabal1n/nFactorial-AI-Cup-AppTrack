import openai
openai.api_key = "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"

text = '''Tell me about main problems in bullet points:
Dear Diary, my day was hard, I was really tired at work. I've burned out, everything seems  so terryfing. By the way, I've moved out to another city for my master's degree and I'm afraid that I'll lose connection with my friends. I don't want to make new friends, because I will return back home. I'm afraid of lonelines and that I might lose my friends.'''
def get_text_summary(text):
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": text}
    ]
    )

    bullet_points = completion.choices[0].message.content.split('- ')
    final_bullet_points = [x.strip() for x in bullet_points if x != '']
    print(final_bullet_points)
    return final_bullet_points

get_text_summary(text)