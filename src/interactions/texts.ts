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
  "4": "Sister: I'm so excited about the today's event, you will be the star of the show",
  // vase without flowers
  "5": `Mother loves to put garden flowers in this vase, I should give her a bouquet`,
  // Tree
  "6": `I don't remember this tree being here. It must have been planted after I left`,
  // Ma without letter
  "7": `Mother: Your uncle is upstairs preparing for the special occasion. I can't believe I'm boiling liver today`,

  // Act 2

  // Covered bird
  "10": "Bird: NO, RUN, IT'S A TRAP, RUN KID!",
  "11": "Met father on the way from the bedroom – he was rushing to check on his bird",
  // Father about books
  "12": `Father: boy don't touch my books, they are older than you`,
  // Got book
  "13": "There is a key inside the book! I wonder what room it opens",
  // Dig under tree
  "14": `Oh, there's something under the tree!`,
  // Skull found
  "15": `OMG, there is a small skull, yikes!`,
  // Put skull on the altar
  "16": `You put the skull on the altar. Something is happening...`,

  // talk to ghost
  "19": "Ghost: James! You don't recognize me, do you? We don't have much time, come upstairs",

  SHIT_SISTER_SAYS_act_2_1:
    "Sister: Father is probably upstairs playing with his bird. Stupid bird screams all night, can't sleep because of that",
  SHIT_SISTER_SAYS_act_2_2:
    "Sister: I just do what uncle says. He cares about us. Right?",
  SHIT_PA_SAYS_act_2_1:
    "Father: What did I say to you last time, boy? Never come back to this house. Such a waste",
  SHIT_PA_SAYS_act_2_2: "Father: Never. Never. NEVER touch the bird!",

  // Act 3
  // exit Basement After Meeting Ghost
  "20": "I'm gonna learn a lot today...", //?
  // Talk to ghost
  "21": "Ghost: I would help you, find the memory of me",
  // Sister in living room
  "22": "Sister: Uncle said you can't leave now. You must spend quality time with the Family. ",

  // Show photo to the ghost
  "24": "Ghost: You found it! Photo of us before the ritual in the attic. Let me show you the way, upstairs",
  // You mixing a poison with bourbon
  "25": "Ghost: Yes, yes! Old drunkard wouldn't resist. Gift him with eternal sleep, before it's too late. ",
  // Ghost says when uncle follows
  GHOST_UNCLE_FOLLOW_SAYS: "Uncle... I still feel the pain, stop him",
  GHOST_UNCLE_DEAD_SAYS:
    "Ghost: Ohhh, you did it James! Now your'd be able to remember all what happened...",
  SECRET_COMES_TRUE:
    "Suddenly all the details come together... The family feast, talking about de-livering, what ghost tries to remind you of – things that are slipping from your memory... You need to fixate them somehow",
  GO_TO_ATTICK:
    "You have seen ghost going back to the attic. Now when uncle is dead you can finally talk to it there",
  // Give cocktail to uncle
  "28": "Uncle: Give me the glass, James. One sip before we start! Khh, this shit is strong... I need to sit down. Khhr",
  // Sit and write a letter
  BAD_END:
    "Afraid of loosing memory again, you sit down and write a letter to yourself to come to the house as soon as possible. Then you suddenly black out...",

  SHIT_UNCLE_SAYS_INITIAL:
    "Uncle: Look who decided to show up unannounced. The family didn't expect you that early, but we're incredibly happy that you came by yourself. Don't worry, we'll make sure you feel right at home... whether you like it or not",
  SHIT_UNCLE_SAYS_1:
    "Uncle: Whole Family can't wait to de-liver you... on the table",
  SHIT_UNCLE_SAYS_2:
    "Uncle: If you have any ideas of wandering away from the Family, think again. We won't tolerate any disobedience. Believe me, you won't like what happens to those who defy us",
  SHIT_UNCLE_SAYS_3:
    "Uncle: We all must eat to survive... You know, we must be willing to make sacrifices for the greater good of the family. And sometimes, those sacrifices can be... significant.",
  SHIT_UNCLE_SAYS_4:
    "Your dear mother shall soon be cooking, and you must be ready for her demented culinary concoctions. Family's love for meat is not for the faint of heart",

  SHIT_PA_SAYS_act_3_1:
    "Father: Leave me alone, boy. You knew the drill when you came here",
  SHIT_PA_SAYS_act_3_2:
    "Father: Just... Boy, I don't have other choice. You know what happens when you messes up with uncle",
  SHIT_MA_SAYS_act_3_1:
    "Mother: There are so many to feed. So much trouble with these Family holidays, huh, honey?",
  SHIT_MA_SAYS_act_3_2:
    "Mother: I'm so proud of my Family, all together. Like it was last time, ten years ago",

  UNCLE_SAYS_NO:
    "Uncle: Why are you wasting time writing? Trust me, you wouldn't want to keep the family waiting. They can be... impatient. So, let's get moving before it's too late",

  NO_SCISSORS: "I can't cut these flowers without some tool",
  NO_BLANKET: "This bird looks anxious, maybe put something on the cage",
  NO_SHOVEL: "Beautiful tree",
  NO_SKULL: "If this is a place for sacrifices, I need to bring something",
  NO_BOURBON: "Where would I put this?",

  GHOST_AFTER_OPENING: "Look, there is a door to the attic upstairs",
  GHOST_IN_THE_BASEMENT:
    "Uncle is afraid of me, so he does not go downstairs. And you should be afraid of him!",
};

export const getText = (id: string) => {
  return texts[id] || "NO TEXT FOUND: " + id + "";
};
