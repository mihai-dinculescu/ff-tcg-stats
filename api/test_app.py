import os
import tempfile
import json
from io import BytesIO

import pytest

from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()

    yield client

def test_empty(client):
    rv = client.post('/process-match-files')
    assert b'File part missing.' in rv.data

def test_missing_filename_o8h(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(None, ''),
        )
    )
    assert b'No selected file.' in rv.data

def test_wrong_extension_o8h(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(None, 'match1.doc'),
        )
    )
    assert b'Unexpected file extension.' in rv.data

def test_missing_o8l(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(None, 'match1.o8h'),
        )
    )
    assert b'File part missing.' in rv.data

def test_missing_filename_o8l(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(None, 'match1.o8h'),
            file_o8l=(None, ''),
        )
    )
    assert b'No selected file.' in rv.data

def test_wrong_extension_o8l(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(None, 'match1.o8h'),
            file_o8l=(None, 'match1.doc'),
        )
    )
    assert b'Unexpected file extension.' in rv.data

def test_proper_files_with_empty_content(client):
    rv = client.post(
        '/process-match-files',
        data=dict(
            file_o8h=(BytesIO(b'{ "State": { "Players": [] }, "DateSaved": "1900-01-01" }'), 'match1.o8h'),
            file_o8l=(BytesIO(b''), 'match1.o8l'),
        )
    )

    data = json.loads(rv.data)
    assert data['games'] == []
