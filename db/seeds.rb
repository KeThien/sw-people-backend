require 'json'
require 'rest-client'
require 'open-uri'
require 'nokogiri'

people = []
species = []

puts "-----------------"
puts " Begin parsing..."
puts "-----------------"

for i in 1..9 do
  (people << JSON.parse(RestClient.get("https://swapi.co/api/people/?page=#{i}"))["results"]).flatten!
end
puts JSON.pretty_generate(people)

for i in 1..37 do
  (species << JSON.parse(RestClient.get("https://swapi.co/api/species/#{i}"))["name"]).flatten!
end
puts "--------------"
puts " Parsing done."
puts "--------------"
puts ""
puts "-----------------"
puts " List of species"
puts "-----------------"

species.each do |sp|
  new_species = Species.new(
  name: sp
  )
  puts sp
  new_species.save
end
puts ""
puts "-----------------"
puts " Begin seeding..."
puts "-----------------"

#  Use wikia wookieepedia API to fin the page of the character and scrap the image avatar
def search_wikia(name)
  return JSON.parse(RestClient.get("https://starwars.fandom.com/api/v1/Search/List?query=#{URI.encode(name)}&limit=1&minArticleQuality=1&batch=1&namespaces=0%2C14"))["items"].first["url"]
end

people.each do |person|
  
  new_species = person["species"].first.nil? ? "" : JSON.parse(RestClient.get(person["species"].first))["name"]
  
  new_homeworld = person["homeworld"].nil? ? "" : JSON.parse(RestClient.get(person["homeworld"]))["name"]
  
  # Exception for Ackbar because the first Ackbar was Ackbar Slash spaceship
  if person["name"] == 'Ackbar'
    person["name"] = 'Ackbar Gial'
  end

  puts person["name"]

  #  Block: where the search wikia need to have 2 search words because didn't find it properly with 3 words
  personName = person["name"].split
  if personName.length >= 3
    personName = personName.values_at(0, -1)
  end
  personName = personName.join("+")
  character_page_url = search_wikia(personName)
  # ------------------------------------------------------

  # fetch the photo of the wikia page
  if character_page_url != nil
    html_doc = Nokogiri::HTML(open(character_page_url))
    photo_url = html_doc.search('.pi-image-thumbnail').first.attribute('src').value
  else
    photo_url = ""
  end
# Create new Person in table People
  new_person = Person.new(
    name: person["name"].strip,
    height: person["height"].strip,
    mass: person["mass"].strip,
    hair_color: person["hair_color"].strip,
    skin_color: person["skin_color"].strip,
    eye_color: person["eye_color"].strip,
    birth_year: person["birth_year"].strip,
    gender: person["gender"].strip,
    homeworld: new_homeworld.strip,
    photo_url: photo_url
  )
  new_person.species =  Species.find_by(name: new_species)
  new_person.save
end
puts ""
puts "--------------"
puts " seeding done."
puts "--------------"
