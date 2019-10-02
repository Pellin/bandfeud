# Bandfeud

<strong><em>Bandname-dropping game built with React and Node.js</em></strong>

Uses the <a href="https://www.discogs.com/developers"><strong>Discogs API</strong></a> to validate user input and fetch new bands

Uses <a href="https://www.mongodb.com/cloud/atlas"><strong>Mongodb Atlas</strong></a> to store highscores and a backup bands database

## How to play

### Your turn
Type in a band or an artist <strong>beginning with the letter visible under the input field</strong>

Band or artist names must contain at least two letters or numbers. It must begin and end with a letter between a and z or a number

Wait while the app checks if the name exists in the Discogs database.

If the name exists, your score increases. The longer the band name, the more points you get.
Extra points are awarded for certain first letters. Q, X, Y and Z, for example, gets you 5 extra points

### App turn
Next, the app will present a band or an artist. 
You now need to submit a band or artist name that begins with the last letter of the name the app presented.

### Difficulty
Later in the game, the available time decreases, first to 15 seconds, then to 10 seconds and finally to 5 seconds. At these stages, the points awarded will also increase.

### Game Over
<strong>The game is over if:</strong>
<ul>
  <li>the counter reaches 0 
  <li>your submitted band or artist name is not in the Discogs database
  <li>your submitted band name begins with the wrong letter
  <li>your submitted band or artist name has already been used in the current round 
</ul>

### Highscores
If your score is among the top 20, you get a <strong>highscore</strong>.<br> 
The highscore list consists of player name, score and date for each of the highscores and, as you click on each row, the full lists of bands and artists from the corresponding rounds. 