from bs4 import BeautifulSoup
from urllib2 import urlopen
import re

url = "https://www.youtube.com/watch?v=Ad-pxjmlpds"

def get_time_comments(section_url):
    regexp = re.compile(\d?\d:\d\d)
    html = urlopen(section_url).read()
    soup = BeautifulSoup(html, "lxml")
    boccat = soup.find("dive", "comment-text-content")
    comments = x.string for x in boccat if regexp.search(x) is not None
    return comment