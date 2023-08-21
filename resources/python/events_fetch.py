# encoding=utf8
''' Before executing
 Install -
 1) pip install bs4
 2) pip install requests
 3) pip install selenium
'''

from bs4 import BeautifulSoup
import requests
import csv
import calendar
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import re
from datetime import date

chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome()

today = date.today()

# Function to create a BeautifulSoup object from a URL
def getSoup(r):
  r = requests.get(r)
  soup = BeautifulSoup(r.content,features="html.parser")
  return soup
  
# Function to extract selected data from the temple page
def get_sel_data(id):
  sel_data = {}
  driver.get('https://www.keralatourism.org/theyyamcalendar/temple.php?id=' + str(id))
  map_loc = driver.find_element(By.CSS_SELECTOR, 'iframe').get_attribute('src')
  sel_data['map_loc'] =  map_loc
  urls = list()
  for i in driver.find_elements(By.CSS_SELECTOR, '.fancybox-media'):
    urls.append(i.get_attribute('href'))
  sel_data['urls'] = urls
  contact_info = driver.find_element(By.CSS_SELECTOR, '.mb-4').find_elements(By.CSS_SELECTOR, 'p')
  sel_data['contact_info'] = contact_info[2:-1]
  return sel_data
  
# Function to get event data based on temple id
def get_event_dict(id): 
  global today
  event_data = {}
  event_soup = getSoup('https://www.keralatourism.org/theyyamcalendar/temple.php?id=' + str(id))

  # Populate basic event data
  event_data['attribution_link(Additional items)'] = 'https://www.keralatourism.org/theyyamcalendar/temple.php?id=' + str(id)
  event_data['official_url(Additional items)'] = '{"url":"https://www.keralatourism.org/theyyamcalendar/temple.php?id=' + id + '","title":""}'
  event_data['Date'] = today
  event_data['Category'] = 'Events'
  event_data['Title'] = event_soup.find('h1').text
  paras = event_soup.find_all('p')
  event_data['description(Additional items)'] = paras[1].text.strip()
  date = event_soup.find('strong').text.strip()
  date_split = date.split(' ')
  if len(date_split) == 5:
    month = str(list(calendar.month_abbr).index(date_split[3][0:3]))
    if len(month) == 1:
      month ='0'+month
    date_from = date_split[0]
    if len(date_from) == 1:
      date_from ='0'+date_from
    date_to = date_split[2]
    if len(date_to) == 1:
        date_to ='0'+date_to
    event_data['start_dt(Additional items)'] = date_split[4]+'-'+month+'-'+date_from
    event_data['end_dt(Additional items)'] = date_split[4]+'-'+month+'-'+date_to
  elif len(date_split) == 3:
    month = str(list(calendar.month_abbr).index(date_split[1][0:3]))
    if len(month) == 1:
      month ='0'+month
    date_same = date_split[0]
    if len(date_same) == 1:
      date_same='0'+date_same
    event_data['start_dt(Additional items)'] = event_data['end_dt(Additional items)'] = date_split[2]+'-'+month+'-'+date_same
  else:
    month_from = str(list(calendar.month_abbr).index(date_split[1][0:3]))
    if len(month_from) == 1:
      month_from = '0'+month_from
    month_to = str(list(calendar.month_abbr).index(date_split[4][0:3]))
    if len(month_to) == 1:
            month_to = '0'+month_to
    date_from = date_split[0]
    if len(date_from) == 1:
            date_from ='0'+date_from
    date_to = date_split[3]
    if len(date_to) == 1:
        date_to ='0'+date_to
        event_data['start_dt(Additional items)'] = date_split[5]+'-'+month_from+'-'+date_from
        event_data['end_dt(Additional items)'] = date_split[5]+'-'+month_to+'-'+date_to
  event_data['performers(Additional items)'] = paras[2].text
  event_data['malayalam_calendar(Additional items)'] = event_soup.find_all('span')[1].text
  event_data['venue_name(Additional items)'] = ''
  event_data['venue_address(Additional items)'] = paras[3].text
  event_data['venue_direction_notes(Additional items)'] = paras[6].text
  sel_data = get_sel_data(id)
  map_loc = sel_data['map_loc'].split('?q=')[1].split('&')[0].split(',')
  event_data['venue_lat(Additional items)'] = map_loc[0]
  event_data['venue_long(Additional items)'] = map_loc[1]
  videos = sel_data['urls']
  event_data['videos_path_1(Additional items)'] = '{"url":"' + videos[0] + '","title":""}'
  event_data['videos_path_2(Additional items)'] = '{"url":"' + videos[1] + '","title":""}'
  event_data['videos_path_3(Additional items)'] = '{"url":"' + videos[2] + '","title":""}'
  event_data['photos_path(Additional items)']   = '{"url":"https://www.keralatourism.org/theyyamcalendar/'+event_soup.find_all("img")[1]["src"] + '","title":""}'
  contact_direction_p = event_soup.find('div',{'class':'mb-4'}).find_all('p')
  event_data['venue_direction_notes(Additional items)'] = contact_direction_p[len(contact_direction_p)-1].text
  
  # Process to populate contact details with Kuroco content grouping structure
  __RCMS_CONTENT_BOUNDARY__ = '__RCMS_CONTENT_BOUNDARY__'
  contact_values = {
    'name': [],
    'designation': [],
    'details': []
   }
  contact_detail_arrays = [[] for _ in range(4)]
  for val in sel_data['contact_info']:
    curr_info_total = val.text.splitlines()
    name, designation, current_contact_details = None, None, []
    for curr_info in curr_info_total:
        if 'Name:' in curr_info:
            name = curr_info.split(': ')[1]
        if 'Designation:' in curr_info:
            designation = curr_info.split(': ')[1]
        if 'Contact no:' in curr_info:
            current_contact_details.extend(curr_info.split(': ')[1].split(','))
    if name:
        contact_values['name'].append(name)
    if designation:
        contact_values['designation'].append(designation)
    if current_contact_details:
        for i, contact_detail in enumerate(current_contact_details):
            contact_detail_arrays[i].append(contact_detail)
            
    # Process and concatenate values for each field in contact_values and store in event data.
    for field, values in contact_values.items():
        if field == 'details':
            for i, details_array in enumerate(contact_detail_arrays):
                concatenated_details = [detail.replace(',', __RCMS_CONTENT_BOUNDARY__) for detail in details_array]
                concatenated_value = __RCMS_CONTENT_BOUNDARY__.join(concatenated_details)
                event_data[f'contact_details_{i+1}(Additional items)'] = concatenated_value
        else:
            concatenated_value = __RCMS_CONTENT_BOUNDARY__.join(values)
            event_data[f'contact_{field}(Additional items)'] = concatenated_value
  return event_data

# Store events fields in CSV.        
with open('events.csv', 'w') as csvfile:
  fields = ['official_url(Additional items)', 'Date', 'Category', 'Title','description(Additional items)','start_dt(Additional items)','end_dt(Additional items)','performers(Additional items)','malayalam_calendar(Additional items)','venue_name(Additional items)','venue_address(Additional items)','venue_direction_notes(Additional items)','venue_lat(Additional items)','venue_long(Additional items)','videos_path_1(Additional items)','videos_path_2(Additional items)','videos_path_3(Additional items)','photos_path(Additional items)','contact_name(Additional items)','contact_designation(Additional items)','contact_details_1(Additional items)','contact_details_2(Additional items)','contact_details_3(Additional items)','contact_details_4(Additional items)','attribution_link(Additional items)']
  writer = csv.DictWriter(csvfile, fieldnames=fields)
  writer.writeheader()  
  
  # Main process to load each page until page exists, and get event data
  i = 1
  while True: 
    try:
        event_data = get_event_dict(str(i))
        print(f"Fetching data for event {i} - Title: {event_data['Title']}")
        writer.writerow(event_data)
        i += 1
    except Exception as e:
        print(e)
        print("No more events. Exiting loop.")
        break
driver.quit()