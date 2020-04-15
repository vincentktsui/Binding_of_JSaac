const roomWidth = 'roomWidth';
const roomHeight = 'roomHeight';
const tilesToWidth = 'tilesToWidth';
const tilesToHeight = 'tilesToHeight';
const spriteWidth = 'spriteWidth';
const spriteHeight = 'spriteHeight';
const numRooms = 'numRooms';
const fps = 'fps'
const tileWidth = 'tileWidth';
const tileHeight = 'tileHeight';
const innerRoomWidth = 'innerRoomWidth';
const innerRoomHeight = 'innerRoomHeight';
const innerTilesToWidth = 'innerTilesToWidth';
const innerTilesToHeight = 'innerTilesToHeight';
const maxWidth = 'maxWidth';
const maxHeight = 'maxHeight';
const minWidth = 'minWidth';
const minHeight = 'minHeight';
const verticalDoorTop = 'verticalDoorTop';
const verticalDoorBottom = 'verticalDoorBottom';
const horizontalDoorLeft = 'horizontalDoorLeft';
const horizontalDoorRight = 'horizontalDoorRight';

// new variables
const gameVariables = {
    roomWidth: 773,
    roomHeight: 500,
    tilesToWidth: 17,
    tilesToHeight: 11,
    spriteWidth: 48,
    spriteHeight: 82,
    numRooms: 16,
    fps: 1000 / 30,
};

// derived variables
//tiles
gameVariables[tileWidth] = gameVariables[roomWidth] / gameVariables[tilesToWidth];
gameVariables[tileHeight] = gameVariables[roomWidth] / gameVariables[tilesToHeight];

// room interior (without walls)
gameVariables[innerRoomWidth] = gameVariables[roomWidth] - (gameVariables[tileWidth] * 2);
gameVariables[innerRoomHeight] = gameVariables[roomHeight] - (gameVariables[tileHeight] * 2);
gameVariables[innerTilesToWidth] = gameVariables[tilesToWidth] - 2;
gameVariables[innerTilesToHeight] = gameVariables[tilesToHeight] - 2;

// max width-height
gameVariables[maxWidth] = gameVariables[tileWidth] * (gameVariables[tilesToWidth] - 1)
gameVariables[maxHeight] = gameVariables[tileHeight] * (gameVariables[tilesToHeight] - 1)

// min width-height
gameVariables[minWidth] = gameVariables[tileWidth];
gameVariables[minHeight] = gameVariables[tileHeight]

// door locations
gameVariables[verticalDoorTop] = gameVariables[roomHeight] - (5 * gameVariables[tileHeight]);
gameVariables[verticalDoorBottom] = gameVariables[verticalDoorTop] - gameVariables[tileHeight];
gameVariables[horizontalDoorLeft] = gameVariables[roomWidth] - (8 * gameVariables[tileWidth]);
gameVariables[horizontalDoorRight] = gameVariables[horizontalDoorLeft] - gameVariables[tileWidth];

export default gameVariables;

// old variables
// tiles are 64 x 64
// rooms 15x9, 960 x 576
// rooms 17x11 with walls, 1088 x 704
// min width-height = 64 x 64
// max width-height = 1024 x 640
// character sprite 48 x 82