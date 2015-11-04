					README
AUTHOR: Daniel Navon
LAST MODIFIED: 11/3/2015
DESCRIPTION: A webpage that uses the jquery and localStorage to keep a log in order of messages by a user.
IMPLEMENTATION: Jquery watches the document for a keypress of the return button and then upon that keypress it adds the message to the div with the id "log". The keys for each message in local storage is set as a Date (although stored as a string) and is printed next to each message. On load of the document all the messages in local storage are loaded. 
TIME SPENT: 2 hours
AWKNOWLEDGEMENTS: The code to look listen from the return key is an almagation of the answers I found whilst googling around. 