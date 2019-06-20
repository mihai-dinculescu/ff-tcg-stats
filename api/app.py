from flask import Flask, abort, jsonify, Response, request
from flask_cors import CORS

from match_parser import MatchParser

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 4 * 1024 * 1024

if app.debug:
    cors = CORS(app, resources={r"/*": {"origins": "http://ff-tcg-stats.local:8080"}})

def get_file(request_ref, file_ext):
    file_key = 'file_' + file_ext

    if file_key not in request_ref.files:
        raise Exception('File part missing.')

    file = request_ref.files[file_key]

    if file.filename == '':
        raise Exception('No selected file.')

    if file.filename.rsplit('.', 1)[1].lower() != file_ext:
        raise Exception('Unexpected file extension.')

    data = file.stream.read().decode('utf-8')
    return data

@app.route('/api/process-match-files', methods=['POST'])
def process_match_files():
    try:
        file_o8h = get_file(request, 'o8h')
        file_o8l = get_file(request, 'o8l')

        match_parser = MatchParser(file_o8h, file_o8l)
        games = [g.__dict__ for g in match_parser.games]

        return jsonify({
            'games': games
        })
    except Exception as e:
        return abort(Response(str(e), status=400))
