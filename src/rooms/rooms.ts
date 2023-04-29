import living from './living.png';
import kids from './kids.png';
import pantry from './pantry.png';

export const scale = .8;

export const shiftX = 80;
export const shiftY = 200;

export enum RoomName {
    attic = 'attic',
    toilet = 'toilet',
    cabinet = 'cabinet',
    kids = 'kids',
    pantry = 'pantry',
    living = 'living'
}

export const rooms = {
    [RoomName.living]: {
        img: living,
        left: 0 + shiftX,
        top: 143 + 5 + shiftY,
        width: 350,
        height: 350 * 9 / 16
    },
    [RoomName.pantry]: {
        img: pantry,
        left: 425 - 72 + shiftX,
        top: 143 + 5 + shiftY,
        width: 200 * 9 / 16,
        height: 200
    },

    [RoomName.kids]: {
        img: kids,
        left: 0 + shiftX,
        top: 0 + shiftY,
        width: 455,
        height: 258 * 9 / 16,
    },
};

Object.keys(rooms).forEach(roomName => {
    const room = rooms[roomName];
    room.left = room.left * scale;
    room.top = room.top * scale;
    room.width = room.width * scale;
    room.height = room.height * scale;
});
