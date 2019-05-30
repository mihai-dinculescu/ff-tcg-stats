import json
import re
import operator
from dateutil.parser import parse

import cards

df_cards = cards.CardReader().get_cards()

class GameReport:
    def __init__(self):
        self.player1_name = None
        self.player1_deck = None
        self.player1_damage_received = 0
        
        self.player2_name = None
        self.player2_deck = None
        self.player2_damage_received = 0

        self.winner = None
        self.first_gg = None
        self.first_gg_line = None
        
        self.date = None
        
    def __repr__(self):
        return r'{} - {} [{}] ({}) / {} [{}] ({}). Winner: {}. First gg line: {}.'.format(
            self.date,
            self.player1_name, self.player1_deck, self.player1_damage_received,
            self.player2_name, self.player2_deck, self.player2_damage_received,
            self.winner, self.first_gg_line
        )

class MatchParser:
    def __init__(self, data_o8h, data_o8l):
        self.data_o8h = data_o8h
        self.data_o8l = data_o8l
        
        self.__process()
        
    def __process(self):
        try:
            match_state = self.__parse_match_state(json.loads(self.data_o8h))
            games_data = self.__split_games(self.data_o8l)

            games_reports = [self.__parse_game(game_data, match_state['decks'], match_state['date'].isoformat()) for game_data in games_data]
            games_reports = [r for r in games_reports if r is not None]

            self.games = games_reports
        except:
            raise Exception('Unexpected error while parsing.')

    def __parse_match_state(self, data):
        decks = {}
        players_cards = self.__parse_players_cards(data)

        for player_name in players_cards:
            player_cards = players_cards[player_name]
            player_cards_elements = [df_cards.loc[c]['element'] for c in player_cards if c in df_cards.index]
            player_elements = set(player_cards_elements)
            player_elements_count = {e: player_cards_elements.count(e) for e in player_elements if player_cards_elements.count(e) >= 5}
            player_elements_count = sorted(player_elements_count.items(), key=operator.itemgetter(0), reverse=False)

            if len(player_elements_count) >= 2:
                player_deck = '/'.join([e for e, v in player_elements_count])
            elif len(player_elements_count) >= 1:
                player_deck = 'Mono ' + player_elements_count[0][0]
            else:
                player_deck = 'Unknown'

            decks[player_name] = player_deck

        return {'date': parse(data['DateSaved']), 'decks': decks}

    def __parse_players_cards(self, data):
        result = {}

        for player in data['State']['Players']:
            player_id = player['Id']
            player_name = player['Nickname']
            group_cards = [c['Type'] for group in player['Groups'] for c in group['Cards']]
            table_cards = [c['Type'] for c in data['State']['Table']['Cards'] if c['Owner'] == player_id and c['DeleteWhenLeavesGroup'] == False]

            result[player_name] = group_cards + table_cards

        return result

    def __split_games(self, data):
        games = re.split("(?:[\w]+) reset the game", data)
        return games

    def __parse_game(self, data, decks, created_dtm):
        player_names = list(self.__parse_player_name(data))

        if (len(player_names) == 2):    
            game = GameReport()

            game.date = created_dtm

            game.player1_name = player_names[0]
            game.player2_name = player_names[1]

            game.player1_deck = decks[game.player1_name] if game.player1_name in decks else 'Unknown'
            game.player2_deck = decks[game.player2_name] if game.player2_name in decks else 'Unknown'

            game.player1_damage_received = sum(list(self.__parse_player_damage(game.player1_name, data)))
            game.player2_damage_received = sum(list(self.__parse_player_damage(game.player2_name, data)))

            game.first_gg_line, game.first_gg = self.__parse_first_gg(game.player1_name, game.player2_name, data)

            if game.player1_damage_received >= 7 and game.player2_damage_received < 7:
                game.winner = game.player2_name
            elif game.player2_damage_received >= 7 and game.player1_damage_received < 7:
                game.winner = game.player1_name
            elif game.first_gg == game.player1_name:
                game.winner = game.player2_name
            elif game.first_gg == game.player2_name:
                game.winner = game.player1_name
            elif game.player1_damage_received < game.player2_damage_received:
                game.winner = game.player1_name
            elif game.player2_damage_received < game.player1_damage_received:
                game.winner = game.player2_name

            return game
        else:
            return None

    def __parse_player_name(self, data):
        for name in re.findall("Turn (?:[1|2]):  ([\w-]+)", data):
            yield name
            
    def __parse_player_damage(self, player_name, data):
        for damage_point in re.findall(player_name + " takes ([\d]+) damage", data):
            yield int(damage_point)
            
    def __parse_first_gg(self, player1_name, player2_name, data):
        index = re.search("<(" + player1_name + "|" + player2_name + ")> (.*)(\sgg|gg\s)", data, re.IGNORECASE)

        if index is not None:
            return index.group(0), index.group(1)

        return (None, None)