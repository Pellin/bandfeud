# Bandfeud

<strong><em>Bandname-dropping browser game built with React and Node.js</em></strong>

Uses the <a href="https://www.discogs.com/developers"><strong>Discogs API</strong></a> to validate user input and fetch new bands

Uses <a href="https://www.mongodb.com/cloud/atlas"><strong>Mongodb</strong></a> to store highscores and a band database

## How to play

### Your turn
Type in a band or an artist <strong>beginning with the letter visible under the input field</strong>.

Band or artist names must contain at least two letters or numbers. It must begin and end with a letter between <strong>a</strong> and <strong>z</strong> or a <strong>number</strong>.

Wait while the app checks if the name exists in the Discogs database.

If the name exists, your score increases. The longer the band name, the more points you get.
Extra points are awarded for certain first letters (or numbers). Q, X, Y and Z, for example, gets you 5 extra points.

#### Special name rules
Some special rules for name submissions:
<ul>
<li>For artist names, it's the <em>first letter of the first name</em> that counts
<li>For bands beginning with 'the', it's the <em>first letter after 'the'</em> that counts
<li>If the last character of the last band name is a number, you can <em>choose between the number and the corresponding letter</em>, e.g. '3' or 'E'.
</ul>

### App turn
Next, the app will present a band or an artist. 
You now need to submit a band or artist name that begins with the last letter of the name the app presented

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

### A note on correct answers
The Discogs database contains more than 5 million artists. In order to narrow down the number of possible correct answers a little, the game will only accept the names of artists or bands that have a <strong>profile picture on their Discogs page</strong>. 
This usually means that they have probably released at least one album and that somebody cares about them enough to have uploaded a profile pic for their page.
If you submit the name of your favourite band or artist and the answer is deemed incorrect, don't throw a fit. Just log into your Discogs account and add a profile picture for them on their page.