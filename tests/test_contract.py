import unittest
from unittest.mock import patch
import studio
class EpisodeContract(unittest.TestCase):
    def test_rejects_path_traversal(self):
        for value in ['../private','/tmp','a/b','a\\b','', '..']:
            with self.subTest(value=value),self.assertRaises(ValueError):studio.episode(value)
    def test_rejects_external_asset(self):
        data={'id':'demo','duration':44.8,'fps':30,'voice':'../../secret.wav','phrases':'x','visual':'y'}
        with patch('pathlib.Path.read_text',return_value=studio.json.dumps(data)),self.assertRaises(ValueError):studio.episode('demo')
    def test_rejects_invalid_duration(self):
        for duration in [0,-1,91]:
            data={'id':'demo','duration':duration,'fps':30}
            with self.subTest(duration=duration),patch('pathlib.Path.read_text',return_value=studio.json.dumps(data)),self.assertRaises(ValueError):studio.episode('demo')
if __name__=='__main__':unittest.main()
