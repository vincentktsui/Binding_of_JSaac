import React from 'react'

class LevelUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.character;
        this.state.pointsSpent = 0;
        this.state.hitPoints += 25;
        this.increaseStat = this.increaseStat.bind(this);
        this.decreaseStat = this.decreaseStat.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    increaseStat(stat) {
        return e => {
            this.setState({
                [stat]: this.state.stat++,
                availableStatPoints: this.state.availableStatPoints--,
                pointsSpent: this.state.pointsSpent++
            });
        };
    };

    decreaseStat(stat) {
        return e => {
            this.setState({
                [stat]: this.state.stat--,
                availableStatPoints: this.state.availableStatPoints++,
                pointsSpent: this.state.pointsSpent--
            });
        };
    };

    handleClick(e) {
        this.props.updateCharacter(this.state)
    };

    render() {
        const increaseUnavailable = this.state.availableStatPoints === 0;
        const decreaseUnavailable = this.state.pointsSpent === 0;
        const finalizeUnavailable = this.state.pointsSpent != this.props.character.availableStatPoints;
        // const showLevelUp = this.props.character.availableStatPoints > 0 ? 'level-up-box' : 'level-up-box hidden-level-up';
        const showLevelUp = 'level-up-box';

        return (
            <div className={showLevelUp}>Level Up!
                <div className="level-up-options">
                    <div className="level-up-label">
                        <p>Melee Attack: </p>
                        <div className="level-up-item">
                            <button 
                                disabled={decreaseUnavailable} 
                                className="stat-decrease-button" 
                                onClick={this.decreaseStat('meleeAttack')}
                            >
                                -
                            </button>
                            <p>{this.state.meleeAttack}</p>
                            <button 
                                disabled={increaseUnavailable} 
                                className="stat-increase-button" 
                                onClick={this.increaseStat('meleeAttack')}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="level-up-label">
                        <p>Ranged Attack: </p>
                        <div className="level-up-item">
                            <button
                                disabled={decreaseUnavailable}
                                className="stat-decrease-button"
                                onClick={this.decreaseStat('rangedAttack')}
                            >
                                -
                            </button>
                            <p>{this.state.rangedAttack}</p>
                            <button 
                                disabled={increaseUnavailable} 
                                className="stat-increase-button" 
                                onClick={this.increaseStat('rangedAttack')}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="level-up-label">
                        <p>Defense: </p>
                        <div className="level-up-item">
                            <button
                                disabled={decreaseUnavailable}
                                className="stat-decrease-button"
                                onClick={this.decreaseStat('defense')}
                            >
                                -
                            </button>
                            <p>{this.state.defense}</p>
                            <button 
                                disabled={increaseUnavailable} 
                                className="stat-increase-button" 
                                onClick={this.increaseStat('defense')}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="level-up-finalize-label">
                    <button
                        disabled={finalizeUnavailable}
                        onClick={this.handleClick}
                    >
                        Finalize Choices
                    </button>
                </div>
            </div>
        );
    }
};

export default LevelUp;