import { RoomName } from '../rooms/rooms';
import { CharacterName, CharactersCollection } from '../components/Game/types';
import character from './character.png';
import mama from './mama.png';
import sister from './sister.png';
import father from './father.png';
import uncle from './uncle.png';

export const characters: CharactersCollection = {
    [CharacterName.ma]: {
        name: CharacterName.ma,
        room: RoomName.living,
        sprite: mama,
        description: 'mother, she looks nervous and tired',
        roomPosition: {
            shiftX: -150,
            shiftY: -30,
        },
        size: {
            height: 250,
            width: 140,
        },
    },
    [CharacterName.uncle]: {
        name: CharacterName.uncle,
        room: RoomName.attick,
        sprite: uncle,
        roomPosition: {
            shiftX: -170,
            shiftY: -50,
        },
        size: {
            height: 300,
            width: 190,
        },
    },
    [CharacterName.sister]: {
        name: CharacterName.sister,
        room: RoomName.kitchen,
        sprite: sister,
        description: 'Elder sister, her haughty grin never leaves her face',
        roomPosition: {
            shiftX: -300,
            shiftY: 0,
        },
    },
    [CharacterName.pa]: {
        name: CharacterName.pa,
        room: RoomName.library,
        sprite: father,
        description: 'Father, always in his thoughts',
        roomPosition: {
            shiftX: -200,
            shiftY: -100,
        },
        size: {
            height: 300,
            width: 140,
        },
    },
    [CharacterName.ghost]: {
        name: CharacterName.ghost,
        room: null,
        description: 'WTF',
        roomPosition: {
            shiftX: -200,
            shiftY: 0,
        },
    },
    [CharacterName.main]: {
        name: CharacterName.main,
        sprite: character,
        description: `It's me, James`,
    },
};
