# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'
require 'rest-client'
require 'open-uri'
require 'nokogiri'

people = JSON.parse(RestClient.get("https://swapi.co/api/people"))["results"]

puts "begin seeding..."

puts 

people.take(10).each do |person|
  new_species = JSON.parse(RestClient.get(person["species"].first))["name"]
  new_homeworld = JSON.parse(RestClient.get(person["homeworld"]))["name"]
  
  personName = person["name"].gsub(" ", "+")
  puts person["name"]
  character_page_url = JSON.parse(RestClient.get("https://starwars.fandom.com/api/v1/Search/List?query=#{personName}&limit=1&minArticleQuality=1&batch=1&namespaces=0%2C14"))["items"].first["url"]

  html_doc = Nokogiri::HTML(open(character_page_url))
  photo_url = html_doc.search('.pi-image-thumbnail').first.attribute('src').value
  new_person = Person.new(
    name: person["name"],
    height: person["height"],
    mass: person["mass"],
    hair_color: person["hair_color"],
    skin_color: person["skin_color"],
    eye_color: person["eye_color"],
    birth_year: person["birth_year"],
    gender: person["gender"],
    species: new_species,
    homeworld: new_homeworld,
    photo_url: photo_url
  )
  new_person.save
  # puts person
end
puts "seeding done."