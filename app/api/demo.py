import requests
import json


url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk"

querystring = {"ids":"1,7,21,100"}

headers = {
    'x-rapidapi-key': "4c38145d88msh7b11e871a39cba1p17ec75jsne332ac0db2d3",
    'x-rapidapi-host': "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }

response = requests.request("GET", url, headers=headers, params=querystring)


with open('response.text', 'w') as outfile:
    json.dump(response, outfile)

    print("json created")