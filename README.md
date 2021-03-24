# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Nathaniel Wong**

Time spent: **4** hours spent in total

Link to project: https://glitch.com/edit/#!/excessive-equable-milk

## Required Functionality

The following **required** functionality is complete:

* [ x ] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [ x ] "Start" button toggles between "Start" and "Stop" when clicked. 
* [ x ] Game buttons each light up and play a sound when clicked. 
* [ x ] Computer plays back sequence of clues including sound and visual cue for each button
* [ x ] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [ x ] User wins the game after guessing a complete pattern
* [ x ] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [ x ] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ x ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ x ] More than 4 functional game buttons
* [ x ] Playback speeds up on each turn
* [ x ] Computer picks a different pattern each time the game is played
* [ x ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ x ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ x ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ x ] List anything else that you can get done to improve the app!
- [ x ] Round indicator
- [ x ] Cannot inturrupt sequence while it is playing by clicking
- [ x ] Difficulty levels


## Video Walkthrough

Here's a walkthrough of implemented user stories:

![ x ] Basic Functionality: https://media.giphy.com/media/FHAod364oZZCjnZJmb/giphy.gif

![ x ] Extra Functionality: https://media.giphy.com/media/a8b0orqXUxnmyIh3Jz/giphy.gif

![ x ] Timer Functionality: https://media.giphy.com/media/UY4z5j6vGzazUus79O/giphy.gif


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

Finding colors for buttons: https://www.w3schools.com/colors/colors_names.asp

Choosing frequencies: https://ux1.eiu.edu/~cfadd/3050/Adventures/chapter_12/ch12_4.htm

Figuring out Math.random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

Pictures source: https://sites.google.com/a/mun.ca/the-zen-of-avatar-the-last-airbender/air-nomads-and-buddhism/the-elements

Reading up on setInterval: https://www.w3schools.com/jsref/met_win_setinterval.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
I had an issue with getting the Start/Stop switching on click functionality to work, so I put in a few console.log messages in each function to see if what was going on. Noticing that the messages I had included were appearing, I was a little lost before noticing that there was an error that showed up in the browser console. A red TypeError appeared with the description “document.getElementByID is not a function” led me to believe I had misspelled something, and indeed I had! I just simply fixed the error (changed the case of the last letter in the function to lowercase) and everything worked like a charm.
I also found trouble when implementing the timer correctly, particularly when figuring out how to start and stop the timer. At first, there was the issue of only having the timer count down after the pattern played; if the pattern went on long enough, the player might not even have time to repeat the pattern before losing the round. I managed to solve this by taking into account the total delay from each note playing, which was conveniently already provided. After, a particular issue was coming up where I could no longer stop the timer after having it delayed. I figured that I was stopping the timer incorrectly, so at first, I tried to assign the setInterval return value to a global variable to keep track of it. This yielded to nothing, so after more digging, I found that I was actually storing the setTimeout return value, which is why the clearInterval did not stop the timer. I therefore had a workaround where setTimeout would call a custom function, which would store the value of setInterval to a global variable to be cleared later and then set the countdown timer, and thus, I was able to resolve my issue.


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
After completing my submission, I have a lot of questions as to what other tools are available for web development. This project went over the basic implementation of buttons, images, text, styling, and code execution, but I would like to see what else can be done with these tools and how they can work together with other features of HTML/CSS/JavaScript to create some truly amazing projects and websites. I’m also curious as to what the coding standards/best practices  are for the languages we used for web development; I went about implement functions and variables relatively haphazardly, and towards the end found it a little difficult to remember where certain variables or functions were or what they did, and I’m sure that the practices out there would help me code more efficiently. I’m also excited to learn what the extents of web development are, from the powerful functionalities it can produce to the stunning graphics and styling each page can have.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
I would spend some time cleaning up my code (there are a lot of unnecessary comments for things that I ended up not using/might use in the future) and add additional features! Some other features I would incorporate include a scoreboard, a visual indication to show when you clicked the wrong button, the ability for users to customize their own difficulty levels, and the ability for users to change the number of squares.
For cleaning up my code, I would get rid of unnecessary comments and functions that I did not end up using, rename and reorganize variables and functions into sections based on their usage, and refactor functions to have them fit the game flow more smoothly.
For the scoreboard, I might look up ways to persist data (at least locally if possibly on Glitch) and generate a point system based on difficulty, time taken per round, and number of mistakes made.
For the visual indication of clicking the wrong button, I would add an image to each button and hide them by default, only showing them when a guess was incorrect.
For the custom difficulty levels, I would have input fields for maximum number of lives, time per round, and total rounds (and maybe how fast the game speeds up—which is by default cut down by 15% each round).
For the ability to customize the number of squares, I would perhaps allow up to a maximum number and create the appropriate sounds/colors/pictures for them, only populating the screen when the user has selected up to that number.
From there, I would polish the game by changing fonts/selecting a more cohesive color scheme, and organizing the text and buttons into a more intuitive user interface.



## License

    Copyright Nathaniel Wong

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.