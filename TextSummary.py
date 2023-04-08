import openai

openai.api_key = "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"


def get_text_summary(text):
    text = "Tell me about main events and emotions in bullet points: " + text
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": text}]
    )

    bullet_points = completion.choices[0].message.content.split("\n")
    final_bullet_points = [x.strip() for x in bullet_points if x != ""]
    # print("Summ: ", final_bullet_points)
    return final_bullet_points
