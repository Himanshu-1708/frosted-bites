FROM python:3.11-slim

WORKDIR /app/project

COPY gateway/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

COPY . /app/project

EXPOSE 8000

CMD ["python", "gateway/app.py"]

