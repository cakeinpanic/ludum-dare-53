export const texts = {
  // Act 1
  "0": "You have arrived to your parent's house, this is not how you remember it",
  // Ma with letter
  "1": "Mother: Hello my dear, we weren't waiting for you. A letter? I don't know what you're talking about",
  // Sister with letter
  "2": "Sister: Hi, you are early. What letter!? It's probably someones joke. Give it to me. Here are the scissors, find some flowers for the event",
  // Ma with flowers
  "3": "Mother: Thanks, my dear, your self-sacrifice... I told others that you were here; Mother went to put flowers in the vase",
  // Talk to sister without letter
  "4": "Sister: I'm so excited about the todays event, you will be the star of the show",
  // vase without flowers
  "5": `Mother loves to put garden flowers in this vase`,
  // Tree
  "6": `I don't remember this tree being here. It must have been planted after I left`,
  // Ma without letter
  "7": `Mother: Your uncle is upstairs preparing for the special occasion. Can't believe I'm boiling liver today`,

  // Act 2

  // Covered bird
  "10": "Bird: NO, RUN, IT'S A TRAP, RUN KID!",
  "11": "Met father on the way from bedroom – he was rushing to check his bird",
  // Father about books
  "12": `Father: boy don't touch my books, they are older than you`,
  // Got book
  "13": "There is a key inside the book! I wonder what room it opens",
  // Dig under tree
  "14": `Oh, there's something under the tree!`,
  // Skull found
  "15": `OMG, there is a small skull, yikes!`,
  // Put skull on the altar
  "16": `You put the skull on the altar, something is happening...`,

  // talk to ghost
  "19": "Ghost: James! You can't remember me, aren't you? We don't have much time, come upstairs",

  SHIT_SISTER_SAYS_act_2_1:
    "Father upstairs, probably playing with his bird. Stupid bird scream all night, can't sleep because of that",
  SHIT_SISTER_SAYS_act_2_2:
    "I just do what uncle says. He care about us. Right?",
  SHIT_PA_SAYS_act_2_1:
    "What did I say to you last time boy? Never come back to this house. Such a waste",

  // Act 3
  // exit Basement After Meeting Ghost
  "20": "I'm gonna learn a lot today...", //?
  // Talk to ghost
  "21": "Ghost: I would help you, find the memory of me",
  // Sister in living room
  "22": "Sister: uncle said you can't leave now, you must spend quality time with the Family",

  // Show photo to the ghost
  "24": "Ghost: You found it! Photo of us before the ritual in the attic. Let me show you the way, upstairs",
  // You mixing a poison with burbon
  "25": "Ghost: Yes, yes! Old drunkard wouldn't resist. Gift him with eternal sleep, before it's too late",
  // Ghost says when uncle follows
  GHOST_UNCLE_FOLLOW_SAYS: "Uncle... I still feel the pain, stop him",
  GHOST_UNCLE_DEAD_SAYS:
    "Ohhh, you did it James. Find a way to remember what happened here",
  // Give cocktail to uncle
  "28": "Uncle: Give me the glass James, one sip before we start! Khh, this shit is strong... I need to sit down. Khhr",
  // Sit and write a letter
  BAD_END:
    "Afraid of loosing memory again you sit down and write a letter to yourself to come to the house as soon as possible. Then you suddenly black out...",

  SHIT_UNCLE_SAYS_INITIAL:
    "Uncle: Hey, the Family didn't expect you that early, but we're incredibly happy that you came by yourself",
  SHIT_UNCLE_SAYS_1:
    "Uncle: Whole Family can't wait to de-liver you... on the table",
  SHIT_UNCLE_SAYS_2:
    "Uncle: Almost everything is ready for the ritual, don't go far from the Family",
  SHIT_UNCLE_SAYS_3:
    "Uncle: We must remember our family responsibilities and be ready to sacrifice everything for the sake of the family",

  SHIT_PA_SAYS_act_3_1:
    "Father: Leave me alone, boy. You knew the drill when you came here",
  SHIT_PA_SAYS_act_3_2:
    "Father: Just... Boy, I don't have other choice. You know what happens when you messes up with uncle",
  SHIT_MA_SAYS_act_3_1:
    "Mother: There are so many to feed. So much trouble with these Family holidays, huh, honey?",
  SHIT_MA_SAYS_act_3_2:
    "Mother: I'm so proud of my Family, all together. Like it was last time, ten years ago",

  UNCLE_SAYS_NO:
    "Uncle: Don't make your family wait, we have things to prepare",

  NO_SCISSORS: "I can't cut these flowers without some tool",
  NO_BLANKET: "This bird looks anxious, maybe put something on the cage",
  NO_SHOVEL: "Beautiful tree",
  NO_SKULL:
    "If this is a place for human sacrifices, I need to bring something",
  NO_BOURBON: "Where would I put this?",

  GHOST_AFTER_OPENING: "Look, there is a door to the attic upstairs",
  GHOST_IN_THE_BASEMENT:
    "Uncle is afraid of me, so he does not go downstairs. And you should be afraid of him!",
};

export const getText = (id: string) => {
  return texts[id] || "NO TEXT FOUND: " + id + "";
};
