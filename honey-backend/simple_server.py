import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

class CORSHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        super().end_headers()

if __name__ == '__main__':
    # Set the directory to serve
    os.chdir(os.path.join(os.path.dirname(__file__), 'src', 'static'))
    
    # Create the server
    server = HTTPServer(('localhost', 5000), CORSHTTPRequestHandler)
    print("Simple server running at http://localhost:5000")
    print("Serving static files from:", os.getcwd())
    server.serve_forever()
