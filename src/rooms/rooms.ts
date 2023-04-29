import living from './living.png';
import kids from './kids.png';
import pantry from './pantry.png';
import library from './library.png';
import bedroom from './bedroom.png';
import kitchen from './kitchen.png';
import yard from './yard.png';
import basement from './basement.png';
import attick from './attick.png';

export const scale = 1.2;

export const shiftX = 160;
export const shiftY = 220;

const gap = 4;

export enum RoomName {
    attic = 'attic',
    toilet = 'toilet',
    cabinet = 'cabinet',
    library = 'library',
    yard = 'yard',
    kitchen = 'kitchen',
    bedroom = 'bedroom',
    pantry = 'pantry',
    living = 'living',
    basement = 'basement',
    attick = 'attick'
}

const H = 95;
export const rooms = {

    [RoomName.library]: {
        img: library,
        left: -gap,
        top: -gap,
        width: H * 4 / 3,
        height: H
    },
    [RoomName.living]: {
        img: living,
        left: -gap,
        top: H,
        width: H * 4 / 3,
        height: H
    },

    [RoomName.bedroom]: {
        img: bedroom,
        left: H * 4 / 3,
        top: -gap,
        width: H * 2,
        height: H
    },
    [RoomName.yard]: {
        img: yard,
        left: -H * 2 - gap*2,
        top: H,
        width: H * 2,
        height: H
    },
    [RoomName.kitchen]: {
        img: kitchen,
        left: H * 4 / 3,
        top: H,
        width: H * 2,
        height: H
    },
    [RoomName.basement]: {
        img: basement,
        left: H * 4 / 3 - H / 2,
        top: H * 2 + gap,
        width: H * 2,
        height: H
    },
    [RoomName.attick]: {
        img: attick,
        left: H * 4 / 3 - H / 2,
        top: -H - gap*2,
        width: H * 2,
        height: H
    },
};

Object.keys(rooms).forEach(roomName => {
    const room = rooms[roomName];
    room.left = room.left * scale + shiftX;
    room.top = room.top * scale + shiftY;
    room.width = room.width * scale;
    room.height = room.height * scale;
});
