export const texts = {
  // Act 1
  "0": "You have arrived to your parents house, this is not how you remember it",
  // Ma with letter
  "1": "Mother: Hello my dear, we haven't been waiting for you. What letter? I don't know what you are talking about",
  // Sister with letter
  "2": "Sister: Hi, you are early. What letter!? Give it to me, go to the yard and find some flowers for the event",
  // Ma with flowers
  "3": "Mother: Thanks my dear, your self-sacrifice... Mother went to put flowers in the vase",
  // Talk to sister without letter
  "4": "Sister: I'm so excited about the todays event, you will a star of the show.",
  // vase without flowers
  "5": `Flowers from the garden would look good in this vase`,
  // Tree
  "6": `Can't remember this tree being here`,
  // Ma without letter
  "7": `Mother: your uncle is preparing for the ritual. Can't believe I'm boiling liver today`,

  // Act 2

  // Covered bird
  "10": "Bird: NO, RUN, IT'S A TRAP, RUN KID!",
  "11": "Met father on the way from bedroom – he was rushing to check his bird",
  // Father about books
  "12": `Father: don't touch my books, they are older than you`,
  // Got book
  "13": "There is a key inside the book! Probably I can go to some new location now",
  // Dig under tree
  "14": `Oh, there's something under the tree!`,
  // Skull found
  "15": `OMG, there is a small skull, yikes!`,
  // Put skull on the altar
  "16": `You put the skull on the altar, it glows and ghost appears`,

  // talk to ghost
  "19": "Ghost: there is a dark secret I'm gonna show you\"",

  // Act 3
  // exit Basement After Meeting Ghost
  "20": "I'm gonna lear a lot today...",
  // Talk to ghost
  "21": "Ghost: I would help you",
  // Sister in living room
  "22": "Sister: You can't leave, you must spend quality time with the family, go talk to dad",

  // Show photo to the ghost
  "24": "Ghost: You found memories they hide from you, photo of us before the ritual on the attic. Let me show you the way upstairs",
  // Give cocktail to uncle
  "28": "Uncle: Give me the glass, I need it before we start! Oh gosh is strong... I feel dizzy, I need to sit down...",
  // Sit and write a letter
  "29": "You sit down and write a letter to J. and ask him to come to the house as soon as possible",

  "101": "This is default text uncle says before killed",
  "102": "This is what we say when click on table when uncle is alive",
};

export const getText = (id: string) => {
  return texts[id] || "NO TEXT FOUND: " + id + "";
};
