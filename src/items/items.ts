import { RoomName } from '../rooms/rooms';
import { Item, ItemName, ItemsCollection } from '../components/Game/types';
import flowers from './flowers.png';
import pile from './pile.png';
import tree from './tree.png';
import blanket from './blanket.png';

export const items: ItemsCollection = {
    [ItemName.letter]: {
        id: ItemName.letter,
        isActive: false,
        isVisible: true,
        collectable: true,
    },
    [ItemName.tree]: {
        id: ItemName.tree,
        isActive: false,
        isVisible: true,
        collectable: false,
        room: RoomName.yard,
        description: 'An old tree my father and I planted when I was 6',
        sprite: tree,
        roomPosition: {
            shiftX: 97 - 480 - 87 - 30 - 10,
            shiftY: 945 - 1230,
        },
        size: {
            width: 764,
            height: 496,
        },
    },
    [ItemName.dirtPile]: {
        id: ItemName.dirtPile,
        isActive: false,
        isVisible: true,
        collectable: false,
        room: RoomName.yard,
        description: 'A pile of dirt',
        sprite: pile,
        roomPosition: {
            shiftX: -20,
            shiftY: 130,
        },
        size: {
            width: 130,
            height: 100,
        },
    },
    [ItemName.chest]: {
        id: ItemName.chest,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.basement,
        roomPosition: {
            shiftX: 0,
            shiftY: 0,
        },
    },
    [ItemName.table]: {
        id: ItemName.table,
        isActive: false,
        isVisible: true,
        collectable: false,
        room: RoomName.living,
    },
    [ItemName.cabinet]: {
        id: ItemName.cabinet,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.living,
        roomPosition: {
            shiftX: 250,
            shiftY: -40,
        },
    },
    [ItemName.flowers]: {
        id: ItemName.flowers,
        isActive: false,
        isVisible: true,
        collectable: false,
        sprite: flowers,
        room: RoomName.yard,
        roomPosition: {
            shiftX: 210,
            shiftY: 70,
        },
        size: {
            width: 100,
            height: 100,
        },
    },
    [ItemName.blanket]: {
        id: ItemName.blanket,
        isActive: false,
        isVisible: false,
        collectable: false,
        sprite: blanket,
        room: RoomName.living,
        roomPosition: {
            shiftX: -260   ,
            shiftY: 70 - 46,
        },
        size: {
            width: 100,
            height: 100,
        },
    },
    [ItemName.recordPlayer]: {
        id: ItemName.recordPlayer,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.bedroom,
    },
    [ItemName.secretButton]: {
        id: ItemName.secretButton,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.bedroom,
    },
    [ItemName.secretButton]: {
        id: ItemName.secretButton,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.bedroom,
    },
    [ItemName.sacrificeCircle]: {
        id: ItemName.sacrificeCircle,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.basement,
    },
    [ItemName.paperPile]: {
        id: ItemName.paperPile,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.attick,
    },
    [ItemName.knife]: {
        id: ItemName.knife,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.attick,
    },
    [ItemName.desk]: {
        id: ItemName.desk,
        isActive: false,
        isVisible: false,
        collectable: false,
        room: RoomName.attick,
    },
};
