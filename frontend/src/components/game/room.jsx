import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import RoomSelector from './room_selector';
import * as TrapsHelper from './traps.js'
import DisplayMonsters from './monsters.js';
import DisplayCharacters from './characters.js';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        let currentCharacter;
        let otherCharacter;
        let roomImg;
        const { locations } = this.props;
        let characters = Object.values(this.props.characters);
        for (let i = 0; i < characters.length; i++) {
            if (characters[i]._id === localStorage.lobbycharacter) {
                currentCharacter = characters[i];
            }
            else {
                otherCharacter = characters[i];
            }
        }
        currentCharacter = Object.assign(currentCharacter, locations[currentCharacter._id])
        currentCharacter.frames = 0;
        currentCharacter.animation = "runningRight";
        currentCharacter.xPixel = currentCharacter.xPos * 64;
        currentCharacter.yPixel = currentCharacter.yPos * 64;
        currentCharacter.left = currentCharacter.xPixel + 48;
        currentCharacter.right = currentCharacter.xPixel + 96;
        currentCharacter.top = currentCharacter.yPixel + 40;
        currentCharacter.bottom = currentCharacter.yPixel + 80;
        delete currentCharacter.character;
        currentCharacter.invincible = false;

        if (otherCharacter) {
            otherCharacter = Object.assign(otherCharacter, locations[otherCharacter._id])
            otherCharacter.frames = 0;
            otherCharacter.animation = "runningRight";
            otherCharacter.xPixel = otherCharacter.xPos * 64;
            otherCharacter.yPixel = otherCharacter.yPos * 64;
            otherCharacter.left = otherCharacter.xPixel + 48;
            otherCharacter.right = otherCharacter.xPixel + 96;
            otherCharacter.top = otherCharacter.yPixel + 40;
            otherCharacter.bottom = otherCharacter.yPixel + 80;
            delete otherCharacter.character;
        }
        this.state = { currentCharacter, otherCharacter, roomImg};
        this.childSetState = this.childSetState.bind(this);
        this.updateDatabase = this.updateDatabase.bind(this);
    }

    updateDatabase(currentCharacter) {
        let characters = {};
        characters[currentCharacter._id] = currentCharacter;
        if (this.state.otherCharacter) {
            characters[this.state.otherCharacter._id] = this.state.otherCharacter;
        }
        let data = {
            lobbykey: localStorage.lobbykey,
            characters: characters
        }
        this.props.updateDatabase(data, currentCharacter._id, currentCharacter.room);
    }

    childSetState(state) {
        let currentState = Object.assign({}, this.state);
        if (state._id === localStorage.lobbycharacter) {
            currentState.currentCharacter = state;
        }
        this.setState(currentState);
    }

    componentDidMount() {
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.fetchLobby(localStorage.lobbykey);
        }
        // Change update speed 30fps for now
        window.interval = setInterval(() => {
            window.socket.emit("dungeonRefresh", 
            {
                room: localStorage.lobbykey, 
                char: this.state.currentCharacter
            });
        }, 1000 / 30)

        window.socket.on("receiveDungeon", data => {
            if (data._id !== localStorage.lobbycharacter) {
                let currentState = Object.assign({}, this.state);
                currentState.otherCharacter = data;
                if (this.props.locations[currentState.otherCharacter._id].room !== data.room) {
                    this.props.updateLocation(data.room, currentState.otherCharacter._id);
                }
                if (this.props.characters[currentState.otherCharacter._id].currentHP !== data.currentHP) {
                    this.props.updateHP(currentState.otherCharacter._id, data.currentHP);
                }
                this.setState(currentState);
            }
        })
        this.setState({ roomImg: RoomSelector(this.state.currentCharacter.room) })
    }

    componentWillUnmount() {
        // still need to figure this out
        window.clearInterval(window.interval);
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.locations !== this.props.locations) {
    //         this.setState({ roomImg: RoomSelector(this.state.currentCharacter.room) })
    //     }
    // }

    render() {
        if (this.props.movingRooms) {
            console.log("changing rooms")
            return (<div>Changing Rooms!!!!</div>)
        }

        if (Object.keys(this.props.lobby).length === 0) return null;
        let { room, traps, locations, monsters } = this.props;
        let roomImg;
        let spriteInRoom;
        let currentChar;
        let otherChar;
        let trapsInRoom;
        let trapsDisplay;
        let monstersInRoom;

        if (this.state.currentCharacter) {
            let roomNumber = room[(this.state.currentCharacter.room % 16) * this.state.currentCharacter.floor];
            roomImg = RoomSelector(this.state.currentCharacter.room);
            trapsInRoom = TrapsHelper.GetTraps(roomNumber.id, traps);
            trapsDisplay = trapsInRoom.map(trap => (
                TrapsHelper.displayTraps(trap)
            ))
            currentChar = <DisplayCharacters 
                char={this.state.currentCharacter}
                movement={true}
                childSetState={this.childSetState}
                traps={trapsInRoom}
                moveRoom={this.props.moveRoom}
                roomNumber={roomNumber}
                floorNumber={Object.values(locations)[0].floor}
                updateHP={this.props.updateHP}
                updateDatabase={this.updateDatabase}
                />

            // tiles are 64 x 64
            // rooms 15x9, 960 x 576
            // rooms 17x11 with walls, 1088 x 704
            // min width-height = 64 x 64
            // max width-height = 1024 x 640
            // character sprite 48 x 82
            let player2X, player2Y;
            if (this.state.otherCharacter &&
                this.props.locations[this.state.currentCharacter._id].floor === this.props.locations[this.state.otherCharacter._id].floor &
                this.props.locations[this.state.currentCharacter._id].room === this.props.locations[this.state.otherCharacter._id].room
            ) {
                otherChar = <DisplayCharacters
                    char={this.state.otherCharacter}
                    movement={false}
                    childSetState={this.childSetState}
                    traps={trapsInRoom}
                />
                player2X = (this.state.otherCharacter.left + this.state.otherCharacter.right) / 2;
                player2Y = (this.state.otherCharacter.top + this.state.otherCharacter.bottom) / 2;
            } else {
                player2X = undefined;
                player2Y = undefined;
                otherChar = null;
            }

            let monsterCountPerRoom = [];
            for (let i = 0; i < monsters.length; i++) {
                if (monsters[i].roomId === roomNumber.id) {
                    monsterCountPerRoom.push(monsters[i])
                }
            }
            monstersInRoom = monsterCountPerRoom.map(monster => (
                monstersInRoom = <DisplayMonsters
                    monster={monster}
                    positionX={monster.xPos}
                    positionY={monster.yPos}
                    playerX={(this.state.currentCharacter.left + this.state.currentCharacter.right) / 2}
                    playerY={(this.state.currentCharacter.top + this.state.currentCharacter.bottom) / 2}
                    player2X={player2X}
                    player2Y={player2Y}
                />
            ))
        }

        
        return (
            <div className="room-main">
                <Stage width={1088} height={704}>
                    <Layer>
                        <Image image={roomImg} />
                        {monstersInRoom}
                        {trapsDisplay}
                    </Layer>
                        {currentChar}
                        {otherChar}
                </Stage>
            </div>
        )
    }
};

export default Room;