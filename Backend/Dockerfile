FROM python:3.12

WORKDIR /app

RUN pwd && ls -la   # 👈 debug

COPY requirements.txt .

RUN ls -la          # 👈 debug

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]