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
    roomPosition: {
        // maybe just , left , right , center?
        x: number;
        y: number;
    };
}

export enum ItemName {
    mailbox = 'mailbox', letter = 'letter', glass = 'glass', atticKey = 'atticKey', basementKey = 'basementKey'
}

export interface Item {
    id: ItemName;
    isActive: boolean;
    isVisible: boolean;
    room: RoomName;
    sprite?: string;
    roomPosition: {
        // maybe just , left , right , center
        x: number;
        y: number;
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
