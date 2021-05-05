const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are locked in Mary Kings Close. All the boys and girls of the city are to be locked in here forever. There is a sign, with 2 buttons, answer the question and press the button to escape. What Street are you on?',
    options: [
      {
        text: 'Royal Mile',
        setState: { royalMile: true },
        nextText: 2
      },
      {
        text: 'The Mound',
        nextText: 5
      }
    ]
  },
  {
    id: 2,
    text: 'You are now in the catacombes of St Giles Cathedral. There are 2 rusty rings. One says Ruth Davidson-First Minister. The other says Nicola Sturgeon-First Minister. you can only pull one, do it now, quick, hurry up!',
    options: [
      {
        text: 'Select Nicola Sturgeon',
        requiredState: (currentState) => currentState.royalMile,
        setState: { royalMile: false, Sturgeon: true },
        nextText: 3
      },
      {
        text: 'Select Ruth Davidson',
        requiredState: (currentState) => currentState.royalMile,
        setState: { royalMile: false, Davidson: true },
        nextText: 4
      },
      ]
  },
  {
    id: 3,
    text: 'Well done, you are a clever bunny. You have made it to the City Chambers, who knows, maybe you shall live. What is the largest City in Scotland?',
    options: [
      {
        text: 'Glasgow',
        nextText: 6
      },
      {
        text: 'Edinburgh',
        nextText: 8
      },
      {
        text: 'Aberdeen',
        nextText: 9
      }
    ]
  },
  {
    id: 4,
    text: 'Oh dear,you are such a fool,time to die a horrible death. A large crusher will squish you flatter than the thinnest pancake. Only one way to escape, what is the name of the Scottish flag?',
    options: [
      {
        text: 'Saltire',
        nextText: 3
      },
	  {
        text: 'Maltire',
        nextText: -1
	  }
    ]
  },
  {
    id: 5,
    text: 'Haha now you die, you will rot here in Mary Kings Close forever. You shall lie and watch the flesh rot from your bones.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Well done. A chip off the old block, my wee weegie pal :). You are now in the museum on the mound',
    options: [
      {
        text: 'Knock on the door',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You enter the museum and behind the door is the child catcher. He will lock you away back in Mary Kings Close. What do you do?',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Kick him between the legs',
        nextText: 12
      },
      {
        text: 'Beg to be let go',
        nextText: 11
      },
     
    ]
  },
  {
    id: 8,
    text: 'Oh dear, is there a village missing an idiot? He is an adult, you cannot outrun him. Are you that idiot? Edinburgh is the capital, however, not the largest City.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Aberdeen!! My goodness, if you had another brain cell it would be a space invader! Aberdeen is the third largest!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The child catcher laughed as he threw his net over you and dragged you away, he will eat you later, no-one will know.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'What were you thinking, he does not care for you, he will flay you alive!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'Well done you are brave and have escaped.He had the key to Mary Kings Close and you can now free all the boys and girls!',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
	  
    ]
  }
]

startGame()