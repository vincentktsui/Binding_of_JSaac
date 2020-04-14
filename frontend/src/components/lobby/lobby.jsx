import React from 'react';
import './lobby.css';
import knight from '../../assets/animations/knight/knight_idle_animations.png';
import rogue from '../../assets/animations/rogue/rogue_idle_animations.png';
import mage from '../../assets/animations/mage/mage_idle_animations.png';
import { Stage, Layer, Sprite } from 'react-konva';
import animationDetails from './animation_details';

class LobbyMain extends React.Component {
    componentDidMount() {
        if (localStorage.lobbykey && Object.keys(this.props.lobby).length === 0) {
            this.props.retrieve(localStorage.lobbykey);
        }
    }

    leaveLobby(e) {
        e.preventDefault();
        if (localStorage.lobbykey) {
            this.props.leaveLobby(localStorage.lobbykey, localStorage.lobbycharacter)
            .then( (res) => {
                if (res.type === 'REMOVE_LOBBY') {
                    this.props.history.push('/main')
                }
            });
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (Object.keys(prevProps.lobby).length !== Object.keys(this.props.lobby).length) {
    //         this.props.retrieve(this.props.lobby.lobbykey)
    //     }
    // }
    renderPlayer1() {
        const { lobby, gameCharacters } = this.props;
        let player1idle;
        let player1ImageObj = new Image();
        let player1Frames = 0;
        if (lobby && lobby.player1 && gameCharacters[lobby.player1]) {
            let player1Info = animationDetails(gameCharacters[lobby.player1].characterSprite)
            player1idle = player1Info.idle
            switch (player1Info.imageObj) {
                case "knight":
                    player1ImageObj.src = knight
                    break;
                case "rogue":
                    player1ImageObj.src = rogue
                    break;
                case "mage":
                    player1ImageObj.src = mage
                    break;
            }
            player1Frames = player1Info.frames
        return (
        <div className="lobby-player1-info">
            <div className="lobby-player1-username">
                {gameCharacters[lobby.player1].name}
            </div>
            <div className="lobby-player1-char-model">
                <Stage width={200} height={200}>
                    <Layer>
                        <Sprite
                            x={50}
                            y={50}
                            image={player1ImageObj}
                            animation='idle'
                            animations={player1idle}
                            frameRate={player1Frames}
                            frameIndex={0}
                            ref={(node => {
                                if (node && !node.isRunning()) {
                                    // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                                    node.start()
                                }
                            })
                            }
                        />
                    </Layer>
                </Stage>
            </div>
        </div> )
        } else {
            return null;
        }
    }
    renderPlayer2() {
        const { lobby, gameCharacters } = this.props;
        let player2idle;
        let player2ImageObj = new Image();
        let player2Frames = 0;

        if (lobby && lobby.player2 && gameCharacters[lobby.player2]) {
            let player2Info = animationDetails(gameCharacters[lobby.player2].characterSprite)
            player2idle = player2Info.idle
            switch (player2Info.imageObj) {
                case "knight":
                    player2ImageObj.src = knight
                    break;
                case "rogue":
                    player2ImageObj.src = rogue
                    break;
                case "mage":
                    player2ImageObj.src = mage
                    break;
            }
            player2Frames = player2Info.frames
        return (
            <div className="lobby-player2-info">
                <div className="lobby-player2-username">
                    {gameCharacters[lobby.player2].name}
                </div>
                <div className="lobby-player2-char-model">
                    <Stage width={200} height={200}>
                        <Layer>
                            <Sprite
                                x={50}
                                y={50}
                                image={player2ImageObj}
                                animation='idle'
                                animations={player2idle}
                                frameRate={player2Frames}
                                frameIndex={0}
                                ref={(node => {
                                    if (node && !node.isRunning()) {
                                        // setInterval(function() {node.move({x: (20 % 200), y: 0})}, 48)
                                        node.start()
                                    }
                                })
                                }
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>)
        }
        else {
            return null;
        } 
    }

    render() {
        const { lobby, gameCharacters } = this.props;

        const displayCharacterModels = (Object.values(gameCharacters).length > 0) ? (
            <div className="lobby-players-container">
                <div className="lobby-key-info">
                    <p className="lobby-key-title">Lobby Key</p>
                    <br/>
                    <p className="lobby-key">{lobby.lobbykey}</p>
                </div>
                <div className="player1-player2-container">
                    {this.renderPlayer1()}
                    {this.renderPlayer2()}
                </div>
                <div className="lobby-instructions">
                    <p className="lobby-title">
                        Adventure awaits!
                </p>
                    <ul>
                        <li className="instructions">
                            Invite a friend to join you or start your own adventure!
                        </li>
                    </ul>
                </div>
            </div>
        ) : (
            null
        )
        return (
            <div className="lobby-game-select">
                {displayCharacterModels}
            </div>
        )
    }
}

export default LobbyMain;