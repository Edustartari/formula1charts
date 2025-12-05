### FRONTEND BUILD STAGE
FROM node:24.1.0 AS frontend

# Set working directory
WORKDIR /app

# Copy frontend source files required for build
COPY package.json ./
COPY webpack.config.js ./
COPY src ./src

# Install dependencies and build frontend
RUN npm install && npm run build

### BACKEND BUILD STAGE
FROM python:3.9-slim AS backend

# Install system dependencies
RUN apt-get update && \
    apt-get install -y build-essential libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN python3.9 -m pip install --upgrade pip && \
    python3.9 -m pip install --no-cache-dir -r requirements.txt && \
    python3.9 -m pip install gunicorn

# Copy backend application code
COPY . .

# Copy built frontend assets from frontend stage
COPY --from=frontend /app/static ./static

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=formula1charts.settings

# Collect static files (optional, if using Django staticfiles)
RUN python3.9 manage.py collectstatic --noinput || true

# Run migrations
RUN python3.9 manage.py migrate || true

# Expose port for Gunicorn
EXPOSE 8000

# Start Gunicorn server for production
CMD ["gunicorn", "formula1charts.wsgi:application", "--bind", "0.0.0.0:8000"]