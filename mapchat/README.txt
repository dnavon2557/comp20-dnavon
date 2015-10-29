					README
AUTHOR: Daniel Navon
LAST MODIFIED: 10/29/2015
DESCRIPTION: A webpage that uses the Google Maps javascript api to display a 
map of comp20 students. The map has a unique marker for the user and all other
students display an info window containing their login, a person message, and
the distance from user when clicked. 
IMPLEMENTATION: The google maps api is linked as a script in the html file. 
The script.js file takes advantage of the methods int he api to display a map. 
Using HTTP POST, the script sends a login, location coords, and a message to 
the datastore provided in the assignment. The datastore response text contains 
JSON data holding this information for a users in the datastore. The data is 
parsed and then looped through to create a marker with the correct data at the 
correct location for each user. The "Distance from me" data is taken from the 
havershine forumla off of stackoverflow. The loop skips over the data with the 
same login as the user. The marker for the user is created in a seperate 
function and simply displays their message and "This is you!" next to the 
login. The map automatically pans to the user.
TIME SPENT: 3-4 hours
AWKNOWLEDGEMENTS: The havershine forumla was taken from the stackoverflow on 
the assignment page. Some of the code was originally taken  from the example 
provided by Ming although it is now heavily altered. 