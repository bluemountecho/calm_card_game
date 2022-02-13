// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import './AngelAndDemonToken.sol';

contract AngelAndDemonGame is Ownable {
    uint private _manaPoint;
    uint private _lifePoint;
    uint private _curBattleCounter;
    string private _name;
    string private _symbol;
    string private _baseURL;

    struct Monster {
        uint attackPoint;
        uint defensePoint;
        uint manaCost;
    }

    struct Spell {
        uint attackPoint;
        uint defensePoint;
        uint manaCost;
    }

    struct Equip {
        uint attackPoint;
        uint defensePoint;
        uint manaCost;
    }

    struct BattlePlayer {
        address playerAddress;
        uint lifePoint;
        uint manaPoint;
        uint[] cardsInHand;
        uint[] cardsInPlay;
        uint[] cardsDeck;
    }

    struct Battle {
        uint battleID;
        BattlePlayer player1;
        BattlePlayer player2;
        bool isAccepted;
        address winner;
        uint createdAt;
        uint playerState; //1 -> player1 attack, 2 -> player2 attack
        uint turn;
        uint isCalculated;
    }

    mapping (address => mapping (uint => Monster)) monsters;
    mapping (address => mapping (uint => Spell)) spells;
    mapping (address => mapping (uint => Equip)) equips;
    mapping (address => uint[]) monsterList;
    mapping (address => uint[]) spellList;
    mapping (address => uint[]) equipList;
    mapping (address => uint[]) deckList;
    mapping (address => string) playerNames;
    mapping (address => uint) currentBattles; //Battle.battleID
    mapping (address => uint[]) endedBattles; //Battle Index
    Battle[] currentBattleList;
    Battle[] endedBattleList;

    AngelAndDemonToken angelAndDemonToken;

    constructor(address andToken) {
        _manaPoint = 20;
        _lifePoint = 100;
        _name = "AngelsAndDemonsGame";
        _symbol = "ANGEL_AND_DEMON_GAME";
        _baseURL = "http://167.86.120.197:3000/images/";
        _curBattleCounter = 1;
        angelAndDemonToken = AngelAndDemonToken(andToken);
    }

    function addMonster(
        uint attackPoint,
        uint defensePoint,
        uint manaCost,
        string memory cardURL
    ) private {
        uint _monsterId = angelAndDemonToken.safeMintTo(msg.sender, string(abi.encodePacked(_baseURL, cardURL)));
        require(angelAndDemonToken.ownerOf(_monsterId) == msg.sender);
        monsters[msg.sender][_monsterId] = Monster(attackPoint, defensePoint, manaCost);
        monsterList[msg.sender].push(_monsterId);
    }

    function addSpell(
        uint attackPoint,
        uint defensePoint,
        uint manaCost,
        string memory cardURL
    ) private {
        uint _spellId = angelAndDemonToken.safeMintTo(msg.sender, string(abi.encodePacked(_baseURL, cardURL)));
        require(angelAndDemonToken.ownerOf(_spellId) == msg.sender);
        spells[msg.sender][_spellId] = Spell(attackPoint, defensePoint, manaCost);
        spellList[msg.sender].push(_spellId);
    }

    function addEquip(
        uint attackPoint,
        uint defensePoint,
        uint manaCost,
        string memory cardURL
    ) private {
        uint _equipId = angelAndDemonToken.safeMintTo(msg.sender, string(abi.encodePacked(_baseURL, cardURL)));
        require(angelAndDemonToken.ownerOf(_equipId) == msg.sender);
        equips[msg.sender][_equipId] = Equip(attackPoint, defensePoint, manaCost);
        equipList[msg.sender].push(_equipId);
    }

    function addCardsToPlayer(
        bytes calldata params
    ) public {
        (uint _monsterCount,
        Monster[] memory _monsters,
        string[] memory _monsterURLs,
        uint _sepllCount,
        Spell[] memory _spells,
        string[] memory _spellURLs,
        uint _equipCount,
        Equip[] memory _equips,
        string[] memory _equipURLs) = abi.decode(params, (uint, Monster[], string[], uint, Spell[], string[], uint, Equip[], string[]));
        
        for (uint i = 0; i < _monsterCount; i ++) {
            addMonster(_monsters[i].attackPoint, _monsters[i].defensePoint, _monsters[i].manaCost, _monsterURLs[i]);
        }

        for (uint i = 0; i < _sepllCount; i ++) {
            addSpell(_spells[i].attackPoint, _spells[i].defensePoint, _spells[i].manaCost, _spellURLs[i]);
        }

        for (uint i = 0; i < _equipCount; i ++) {
            addEquip(_equips[i].attackPoint, _equips[i].defensePoint, _equips[i].manaCost, _equipURLs[i]);
        }
    }

    function getCardsOfPlayer(address _sender) public view returns(bytes memory) {
        // uint constant mLen = monsterList[_sender].length;
        // uint balance[] = new uint[](size);
        Monster[] memory _monsters = new Monster[](monsterList[_sender].length);
        string[] memory _monsterURLs = new string[](monsterList[_sender].length);
        uint[] memory _monsterIDs = new uint[](monsterList[_sender].length);
        Spell[] memory _spells = new Spell[](spellList[_sender].length);
        string[] memory _spellURLs = new string[](spellList[_sender].length);
        uint[] memory _spellIDs = new uint[](spellList[_sender].length);
        Equip[] memory _equips = new Equip[](equipList[_sender].length);
        string[] memory _equipURLs = new string[](equipList[_sender].length);
        uint[] memory _equipIDs = new uint[](equipList[_sender].length);

        for (uint i = 0; i < monsterList[_sender].length; i ++) {
            _monsters[i] = monsters[_sender][monsterList[_sender][i]];
            _monsterURLs[i] = angelAndDemonToken.tokenURI(monsterList[_sender][i]);
            _monsterIDs[i] = monsterList[_sender][i];
        }

        for (uint i = 0; i < spellList[_sender].length; i ++) {
            _spells[i] = spells[_sender][spellList[_sender][i]];
            _spellURLs[i] = angelAndDemonToken.tokenURI(spellList[_sender][i]);
            _spellIDs[i] = spellList[_sender][i];
        }

        for (uint i = 0; i < equipList[_sender].length; i ++) {
            _equips[i] = equips[_sender][equipList[_sender][i]];
            _equipURLs[i] = angelAndDemonToken.tokenURI(equipList[_sender][i]);
            _equipIDs[i] = equipList[_sender][i];
        }

        return abi.encode(_monsters, _monsterURLs, _monsterIDs, _spells, _spellURLs, _spellIDs, _equips, _equipURLs, _equipIDs);
    }

    function addCardsToDeck(uint[] memory cardIDs) public {
        delete deckList[msg.sender];

        for (uint i = 0; i < cardIDs.length; i ++) {
            deckList[msg.sender].push(cardIDs[i]);
        }
    }

    function getCardsFromDeck(address _sender) public view returns(bytes memory) {
        return abi.encode(deckList[_sender]);
    }

    function setPlayerName(string memory _playerName) public {
        playerNames[msg.sender] = _playerName;
    }

    function getPlayerName(address _playerAddress) public view returns(string memory) { 
        return playerNames[_playerAddress];
    }

    function findBattle() public {
        require(currentBattles[msg.sender] == 0, 'You are already in battle.');
        require(deckList[msg.sender].length == 40, 'Please select deck.');

        uint i;
        uint[] memory cardsDeck = new uint[](40);

        for (i = 0; i < 40; i ++) {
            cardsDeck[i] = deckList[msg.sender][i];
        }

        for (i = 0; i < currentBattleList.length; i ++) {
            if (currentBattleList[i].isAccepted == false) {
                break;
            }
        }

        if (i == currentBattleList.length) {
            currentBattleList.push(Battle(
                _curBattleCounter,
                BattlePlayer(
                    msg.sender,
                    100,
                    10,
                    new uint[](0),
                    new uint[](0),
                    cardsDeck
                ),
                BattlePlayer(
                    address(0),
                    0,
                    0,
                    new uint[](0),
                    new uint[](0),
                    new uint[](0)
                ),
                false,
                address(0),
                block.timestamp,
                1,
                1,
                0
            ));

            currentBattles[msg.sender] = _curBattleCounter;
            _curBattleCounter = _curBattleCounter + 1;
        } else {
            currentBattleList[i].player2 = BattlePlayer(
                msg.sender,
                100,
                10,
                new uint[](0),
                new uint[](0),
                cardsDeck
            );
            currentBattleList[i].isAccepted = true;
            currentBattles[msg.sender] = currentBattleList[i].battleID;
        }
    }

    function getBattle(address _sender) public view returns(Battle memory) {
        require(currentBattles[_sender] != 0, 'You have no battle.');

        uint i;

        for (i = 0; i < currentBattleList.length; i ++) {
            if (currentBattleList[i].battleID == currentBattles[_sender]) break;
        }

        require(i != currentBattleList.length, 'You have no battle.');

        return currentBattleList[i];
    }

    function getSumOfCards(address _playerAddresss, uint[] memory _cards) public view returns(uint, uint, uint) {
        Monster memory monster = monsters[_playerAddresss][_cards[0]];
        uint attack = 0;
        uint defense = 0;
        uint mana = 0;

        if (_cards.length == 2) {
            if (spells[_playerAddresss][_cards[1]].attackPoint > 0) {
                attack = spells[_playerAddresss][_cards[1]].attackPoint;
                defense = spells[_playerAddresss][_cards[1]].defensePoint;
                mana = spells[_playerAddresss][_cards[1]].manaCost;
            } else {
                attack = equips[_playerAddresss][_cards[1]].attackPoint;
                defense = equips[_playerAddresss][_cards[1]].defensePoint;
                mana = equips[_playerAddresss][_cards[1]].manaCost;
            }
        }
        
        return (monster.attackPoint + attack, monster.defensePoint + defense, monster.manaCost + mana);
    }

    function updateBattle(Battle memory _battle) public {
        require(currentBattles[msg.sender] != 0, 'You have no battle.');

        if (_battle.player1.cardsInPlay.length != 0 && _battle.player2.cardsInPlay.length != 0) {
            require(_battle.isCalculated == 0, 'Please end your turn.');

            (uint attack1, uint defense1, uint mana1) = getSumOfCards(_battle.player1.playerAddress, _battle.player1.cardsInPlay);
            (uint attack2, uint defense2, uint mana2) = getSumOfCards(_battle.player2.playerAddress, _battle.player2.cardsInPlay);

            require(mana1 <= _battle.player1.manaPoint, 'Player1 exceeds mana.');
            require(mana2 <= _battle.player2.manaPoint, 'Player2 exceeds mana.');

            _battle.player1.manaPoint = _battle.player1.manaPoint - mana1;
            _battle.player2.manaPoint = _battle.player2.manaPoint - mana2;

            if (_battle.playerState == 1 && attack1 > defense2) {
                if (_battle.player2.lifePoint <= (attack1 - defense2)) {
                    _battle.player2.lifePoint = 0;
                } else {
                    _battle.player2.lifePoint = _battle.player2.lifePoint - attack1 + defense2;
                }
            } else if (_battle.playerState == 2 && attack2 > defense1) {
                if (_battle.player1.lifePoint <= (attack2 - defense1)) {
                    _battle.player1.lifePoint = 0;
                } else {
                    _battle.player1.lifePoint = _battle.player1.lifePoint - attack2 + defense1;
                }
            }

            _battle.isCalculated = 1;
        }

        uint i;

        for (i = 0; i < currentBattleList.length; i ++) {
            if (currentBattleList[i].battleID == currentBattles[msg.sender]) break;
        }

        require(i != currentBattleList.length, 'You have no battle.');

        currentBattleList[i] = _battle;
    }

    function endTurn() public {
        require(currentBattles[msg.sender] != 0, 'You have no battle.');

        uint i;
        Battle storage _battle;

        for (i = 0; i < currentBattleList.length; i ++) {
            if (currentBattleList[i].battleID == currentBattles[msg.sender]) break;
        }

        require(i != currentBattleList.length, 'You have no battle.');

        _battle = currentBattleList[i];

        require(_battle.isCalculated == 1, 'Attack and defense is not calculated yet.');

        if (_battle.player1.lifePoint == 0 || _battle.player2.lifePoint == 0 || (_battle.playerState == 2 && _battle.turn == 5)) {
            currentBattles[_battle.player1.playerAddress] = 0;
            currentBattles[_battle.player2.playerAddress] = 0;
            endedBattles[_battle.player1.playerAddress].push(endedBattleList.length);
            endedBattles[_battle.player2.playerAddress].push(endedBattleList.length);
            endedBattleList.push(_battle);
            currentBattleList[i] = currentBattleList[currentBattleList.length - 1];
            delete currentBattleList[currentBattleList.length - 1];
            return;
        }

        _battle.isCalculated = 0;
        _battle.player1.cardsInPlay = new uint[](0);
        _battle.player2.cardsInPlay = new uint[](0);

        if (_battle.playerState == 2) {
            _battle.player1.cardsInHand = new uint[](0);
            _battle.player2.cardsInHand = new uint[](0);
            _battle.playerState = 1;
            _battle.turn = _battle.turn + 1;
            _battle.player1.manaPoint = _manaPoint;
            _battle.player2.manaPoint = _manaPoint;
        } else {
            _battle.playerState = 2;
        }

        currentBattleList[i] = _battle;
    }
}