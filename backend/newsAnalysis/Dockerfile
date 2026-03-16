# backend/newsAnalysis/Dockerfile

FROM python:3.12-slim
WORKDIR /app

# system packages for pip wheel builds and Flask
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY run.sh ./
RUN chmod +x run.sh
EXPOSE 5000 5001
CMD ["./run.sh"]
