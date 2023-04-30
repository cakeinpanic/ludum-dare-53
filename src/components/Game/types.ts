import { RoomName } from '../../rooms/rooms';

export interface AvailableWays {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
}

export enum CharacterName {
    main = 'main',
    ma = 'ma',
    pa = 'pa',
    uncle = 'uncle',
    sister = 'sister',
    ghost = 'ghost',
}

export interface Character {
    name: CharacterName;
    room: RoomName;
    sprite?: string;
    roomPosition?: {
        // maybe just , left , right , center?
        shiftX: number;
        shiftY: number;
    };
}

export type ItemsCollection = { [key: ItemName]: Item };

export type CharactersCollection = { [key: CharacterName]: Character };

export enum ItemName {
    mailbox = 'mailbox',
    letter = 'letter',
    glass = 'glass',
    atticKey = 'atticKey',
    basementKey = 'basementKey',
    tree = 'tree',
    table = 'table',
    cabinet = 'cabinet',
    book = 'book',
    secretButton = 'secretButton',
    recordPlayer = 'recordPlayer',
    birdCage = 'birdCage',
    bar = 'bar',
    handcuffs = 'handcuffs',
    chest = 'chest',
    sacrificeCircle = 'sacrificeCircle',
}

export interface Item {
    id: ItemName;
    isActive: boolean;
    isVisible: boolean;
    collectable: boolean;
    room?: RoomName;
    sprite?: string;
    roomPosition?: {
        // maybe just , left , right , center
        shiftX: number;
        shiftY: number;
    };
}

export interface Game {
    act: 1 | 2 | 3;
    currentRoom: RoomName;
    status: {
        upstairsIsBlockedByMa: boolean;
        atticIsHidden: boolean;
        basementIsLocked: boolean;
    };
    helpText: string;
}
