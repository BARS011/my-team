from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path

ROOT = Path(__file__).parent
RITUALS = {
    "sokin": "Telefonni chetga qo'ying. Deraza yoniga boring va uchta narsani - yorug'lik, tovush, haroratni - sekin nomlang.",
    "to'lqin": "Kaftingizni ko'ksingizga qo'ying. Nafasni o'zgartirmang, faqat uning kelib-ketishini bir daqiqa kuzating.",
    "izlanish": "Bugun sizni qiziqtirgan savolni yozing. Javob izlamang. Uni yoningizda olib yuring - ba'zi fikrlar yurib keladi.",
}


class TafakkurHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path == "/api/rituals":
            payload = json.dumps({"rituals": RITUALS}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8000), TafakkurHandler)
    print("Tafakkur is running at http://localhost:8000")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
        server.server_close()
