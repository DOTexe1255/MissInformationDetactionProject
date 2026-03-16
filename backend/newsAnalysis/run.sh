#!/bin/bash
set -e

# Start both services with Streamlit
streamlit run app.py --server.port 8501 --server.address 0.0.0.0 &
streamlit run verify_app.py --server.port 8502 --server.address 0.0.0.0 &

# Wait for both to exit (or current to fail)
wait
