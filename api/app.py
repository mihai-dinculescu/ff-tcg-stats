from flask import Flask, abort, jsonify, Response, request, redirect

from match_parser import MatchParser

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 4 * 1024 * 1024

def get_file(request_ref, file_ext):
    file_key = 'file_' + file_ext

    if file_key not in request_ref.files:
        raise Exception('File part missing.')

    file = request_ref.files[file_key]

    if file.filename == '':
        raise Exception('No selected file.')

    if file.filename.rsplit('.', 1)[1].lower() != file_ext:
        raise Exception('Unexpected file extension.')

    return file

@app.route('/process-game-files', methods=['GET', 'POST'])
def process_game_files():
    try:
        file_o8h = get_file(request, 'o8h')
        file_o8l = get_file(request, 'o8l')

        match_parser = MatchParser(file_o8h, file_o8l)

        return jsonify({
            'games': match_parser.games
        })

        return MatchParser(file_o8h, file_o8l)
    except Exception as e:
        return abort(Response(str(e)))
