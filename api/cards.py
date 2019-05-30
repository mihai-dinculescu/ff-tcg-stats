from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
import os
import requests
import json
import pandas as pd

Base = declarative_base()

class Card(Base):
    __tablename__ = "cards"

    card_id = Column(Integer, primary_key=True)
    octgn_id = Column(String(26), index=True, unique=True)
    name = Column(String(100))
    serial_number = Column(String(12))
    category = Column(String(12))
    is_ex_burst = Column(Boolean)
    element = Column(String(8))
    type = Column(String(8))

    def __init__(self, name):
        self.name = name

class CardReader():
    def __init__(self):
        self.engine = create_engine('sqlite:///' + os.path.join(os.getcwd(), 'cards.db'), echo=True)

    def update_db(self):
        Base.metadata.create_all(self.engine)

        url = 'https://ffdecks.com/api/cards/basic'

        resp = requests.get(url=url)
        data = json.loads(resp.text)

        self.engine.execute(
            Card.__table__.insert(),
                [
                    {
                        'octgn_id': c['octgn_id'],
                        'name': c['name'],
                        'serial_number': c['serial_number'],
                        'category': c['category'],
                        'is_ex_burst': c['is_ex_burst'],
                        'element': c['element'],
                        'type': c['type'],
                    } for c in data['cards']]
        )
    
    def get_cards(self):
        return pd.read_sql('SELECT * FROM cards', self.engine, index_col='octgn_id')
