# The game

Tic-Tac-Toe is a 3-in-a-row game. Match your token across any row to win.

## The tech

This SPA page was written with Javascript, jQuery, SCSS, HTML5, and CSS Styling through Bootstrap.

## With the user in mind
- 'As a user I can sign up to log in and store my progress'
- 'As a user I can give up if I know I will lose.'
- 'As a user I can log in any time to go back to my game.'
- 'As a user I can change my password.'

## The planning
### The start
Planning for the game started with the outline of where everything should go. Navbar, game board and styling was put in place to lay the expectations for the backend.
### The back end
Back end development started with user authentication, after all, we can't play if we aren't known. Authentication design redefined our front end to make logins more interactive.

Once logging in was available, creating games began. Game creation through the backend games API showed how to update the board: on response. No way to cheat since the game board is set by the API.

This API-enforced board update immediately allowed getting old games to reset the board. Once the GET request returned the board, the tiles were reset and the game can continue.

After getting single games was available, getting all games for statistics was made. At the same time, listing still open games was created so you can join any game from the game list modal.

### Multi-Player
Multiplayer from the Get and Patch API was created, but automatic updates to the board came later. First, the join other game was made, followed by playing the computer. After losing several games to the computer, the watcher funtion was put in place.

With the watcher in place, and the invite to game added, multiplayer against a person was a reality.

## Future development
Future desired updates include
1. An email user link, rather than game ID sharing.
2. Using the local machine to stay logged in as well as
  1. Custom Icons
  2. Style customizations
3. Game ready notifications in the page for the games you are still playing and are waiting for you.




## Wireframe
![Wireframe](https://github.com/BrianLM/tic-tac-toe/blob/master/wireframe/wireframe.001.png)
