from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin
dining_hall_arr = ["berkshire", "worcester", "franklin", "hampshire"]
#client = MongoClient("mongodb+srv://bahadurshrey:!Moose415@cluster0.td44qgp.mongodb.net")
url="mongodb+srv://bahadurshrey:Moose415@cluster0.td44qgp.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(url, server_api=ServerApi('1'))
# try:
#    client.admin.command('ping')
#    print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#    print(e)
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = "mongodb+srv://bahadurshrey:Moose415@cluster0.td44qgp.mongodb.net/?retryWrites=true&w=majority"
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.get_database("HackUmass2023")
collection = db.get_collection("dinings")
test=collection.find()
print(test)
collection.delete_many({})
for i in dining_hall_arr:
   url = f"https://umassdining.com/locations-menus/{i}/menu"
   response = requests.get(url)
   soup = BeautifulSoup(response.content, "html.parser")
   meal_lunch = soup.find("div",{"id":"lunch_menu"}).find_all("li")
   meal_dinner = soup.find("div",{"id":"dinner_menu"}).find_all("li")
   meal_latenight = soup.find("div",{"id":"latenight_menu"})
   lunch_arr = []
   dinner_arr = []
   latenight_arr = []
   if(meal_latenight != None):
     meal_latenight = meal_latenight.find_all("li")
   for x in meal_lunch:
     lunch_arr.append(x.find_next("a").string)
   for x in meal_dinner:
     dinner_arr.append(x.find_next("a").string)
   if meal_latenight != None:
     for x in meal_latenight:
       latenight_arr.append(x.find_next("a").string)
   post = {
     "dining hall": i,
     "Lunch": lunch_arr,
     "Dinner": dinner_arr,
     "Late Night": latenight_arr,
   }
   collection.insert_one(post)
client.close()