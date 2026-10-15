from flask import Flask, render_template, jsonify
app = Flask(__name__)
@app.get("/")
def index():
    return render_template("index.html")
@app.get("/api/health")
def health():
    return jsonify(status="ok", project="MyStudio 3D Podcast")
if __name__ == "__main__":
    app.run(debug=True, port=5000)
