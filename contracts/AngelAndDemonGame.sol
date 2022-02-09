// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import './AngelAndDemonToken.sol';

contract AngelAndDemonGame is Ownable {
    uint private _manaPoint;
    uint private _lifePoint;
    //uint gameTurn;
    bool battleStart;
    string private _name;

    // Token symbol
    string private _symbol;
    struct Monster {
        uint attackPoint;
        uint defensePoint;
        uint manaCost;
        uint healthPoint;
    }
    struct BattlePlayer {
        address player;
        uint[] MonsterCardId;
        uint ManaPoint;
        uint LifePoint;
        uint[] SpellCardId;
        uint[] EquipCardId;
        uint FieldCardId;
        uint LastResortCardId;
    }
    struct Battle {
        uint index;
        BattlePlayer player1;
        //add fee and other variable
        BattlePlayer player2;
        //add fee and other variable
        
        address winner;
        bool ended;
        uint createdAt;
        uint playerstate;//0->p1 attack, 1->p2 attack
        uint gameTurn;
    }

    // mapping (address => mapping (uint => Monster)) public monsters;
    // mapping (address => uint[]) public monsterList;
    // mapping (address => uint[]) public spellCardList;
    // mapping (address => uint[]) public equipCardList;

    // mapping (address =>mapping (uint => uint)) MonsterCardCheck;
    // mapping (address =>mapping (uint => uint)) SpellCardCheck;
    // mapping (address =>mapping (uint => uint)) EquipCardCheck;
    // mapping (address => uint) FieldCardCheck;
    // mapping (address => uint) LastResortCardCheck;
    mapping (uint => uint) monsterCardCheck;
    mapping (uint => uint) spellCardCheck;
    mapping (uint => uint) equipCardCheck;
    struct CardCheck {// if 0 then don't use, 1 then use;
        uint[] MonsterCardIds;
        uint[] SpellCardIds;
        uint[] EquipCardIds;
        uint FieldCardCheck;
        uint LastResortCardCheck;        
    }

    mapping (address => mapping (uint => Monster)) public monsters;
    mapping (address => uint[]) public monsterList;
    mapping (address => uint[]) public spellCardList;
    mapping (address => uint[]) public equipCardList;
    mapping (address => CardCheck) public cardChecks;
    //Monster[] public monsters;
    Battle[] public battles;
    AngelAndDemonToken angelAndDemonToken;

    constructor(address andToken) {
        _manaPoint = 2;
        _lifePoint = 100;
        _name = "AngelsAndDemonsGame";
        _symbol = "ANGEL_AND_DEMON_GAME";
        angelAndDemonToken = AngelAndDemonToken(andToken);
    }

    function addMonster(uint _monsterId, uint attackPoint, uint defensePoint, uint manaCost, uint healthPoint) 
        public onlyOwner
    {
        require(angelAndDemonToken.ownerOf(_monsterId) == msg.sender);
        monsters[msg.sender][_monsterId] = Monster(attackPoint, defensePoint, manaCost);
        monsterList[msg.sender].push(_monsterId);
    }
    
    function createBattle (uint[] memory  _p1MonsterCardId, uint _p1ManaPoint, uint _p1LifePoint, uint[] memory _p1SpellCardId, uint[] memory _p1EquipCardId, uint _p1FieldCardId, uint _p1LastResortCardId) 
        public payable 
        returns(uint256 ind)
    {
        require(msg.value > 0);
        uint i;
        for(i = 0; i< _p1MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p1MonsterCardId[i]) == msg.sender);
        }
        for(i = 0; i< _p1MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p1SpellCardId[i]) == msg.sender);
        }
        for(i = 0; i< _p1MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p1EquipCardId[i]) == msg.sender);
        }
        require(angelAndDemonToken.ownerOf(_p1FieldCardId) == msg.sender);
        require(angelAndDemonToken.ownerOf(_p1LastResortCardId) == msg.sender);
        uint256 id = battles.length;
        uint[] memory buffer;
        buffer[buffer.length] = 0;        
        battleStart = false;
        battles.push(Battle(id, BattlePlayer(msg.sender, _p1MonsterCardId, _p1ManaPoint, _p1LifePoint, _p1SpellCardId, _p1EquipCardId, _p1FieldCardId,  _p1LastResortCardId), BattlePlayer(address(0), buffer, 0, 0, buffer, buffer, 0, 0), address(0), false, block.timestamp, 1, 0));
        return id;
    }
    
    function acceptBattle (uint _battleId, uint[] memory _p2MonsterCardId, uint _p2ManaPoint, uint _p2LifePoint, uint[] memory _p2SpellCardId, uint[] memory _p2EquipCardId, uint _p2FieldCardId, uint _p2LastResortCardId) 
        public payable 
    {
         // require(msg.sender != battles[_battleId].p1);
        require(msg.value > 0);
        uint i;
        for(i = 0; i< _p2MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p2MonsterCardId[i]) == msg.sender);
        }
        for(i = 0; i< _p2MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p2SpellCardId[i]) == msg.sender);
        }
        for(i = 0; i< _p2MonsterCardId.length; i++){
            require(angelAndDemonToken.ownerOf(_p2EquipCardId[i]) == msg.sender);
        }
        require(angelAndDemonToken.ownerOf(_p2FieldCardId) == msg.sender);
        require(angelAndDemonToken.ownerOf(_p2LastResortCardId) == msg.sender);
        
        Battle storage b = battles[_battleId];
        b.player2.player = msg.sender;
        b.player2.MonsterCardId = _p2MonsterCardId;
        b.player2.ManaPoint = _p2ManaPoint;
        b.player2.LifePoint = _p2LifePoint;
        b.player2.SpellCardId = _p2SpellCardId;
        b.player2.EquipCardId = _p2EquipCardId;
        b.player2.FieldCardId = _p2FieldCardId;
        b.player2.LastResortCardId = _p2LastResortCardId;
        b.gameTurn++;
        battleStart = true;
    }
    
    function endBattle (uint _battleId) 
        public 
    {
        Battle storage b = battles[_battleId];
        b.ended = true;
        //
        //delete monsters[b.p1];
        //delete monsters[b.p2];
        //delete battles[_battleId];
    }
    
    function upgradeMonster(uint _monsterId, uint _attackPoint, uint _defensePoint, uint _manaCost) 
        internal 
    {
        Monster storage m = monsters[msg.sender][_monsterId];
        m.attackPoint = _attackPoint;
        m.defensePoint = _defensePoint;
        m.manaCost = _manaCost;
    }
    
    function cancelBattle (uint _battleId) 
        public 
    {
        require( block.timestamp > battles[_battleId].createdAt + 86400);
        Battle storage b = battles[_battleId];
        b.ended = true;
    }
    
    function getBattlesCount() 
        public view 
        returns(uint) 
    {
        return battles.length;
    }

    function getplayerState(uint _battleId) 
        public view 
        returns(uint)
    {
        Battle storage b = battles[_battleId];
        return b.playerstate;
    }

    function setLifepoint(uint _battleId, uint _setLifePoint) 
        public 
    {
        Battle storage b = battles[_battleId];
        require(b.player1.player == msg.sender|| b.player2.player == msg.sender);
        if(b.player1.player == msg.sender){
            b.player1.LifePoint = _setLifePoint;
        }
        else{
            b.player2.LifePoint = _setLifePoint;
        }
    }

    function getMonsterListInBattle(address monsterOwner) 
        public view 
        returns(uint[] memory)
    {
        return monsterList[monsterOwner];
    }

    function getSpellListInBattle(address spellCardOwner) 
        public view 
        returns(uint[] memory)
    {
        return spellCardList[spellCardOwner];
    }

    function getEquipListInBattle(address equipCardOwner) 
        public view 
        returns(uint[] memory)
    {
        return equipCardList[equipCardOwner];
    }

    function setCardCheck(uint[][] memory _MonsterCardCheck, uint[][] memory _SpellCardCheck, uint[][] memory _EquipCardCheck, uint _FieldCardCheck, uint _LastResortCardCheck) 
        public 
    {
        uint i;
        uint[] memory bufferMonsterIds;
        uint[] memory bufferSpellIds;
        uint[] memory bufferEquipIds;

       for (i = 0; i < _MonsterCardCheck.length; i++){
            monsterCardCheck[_MonsterCardCheck[i][0]] = _MonsterCardCheck[i][1];
            bufferMonsterIds[i] = _MonsterCardCheck[i][0];
        }

        for (i = 0; i < _SpellCardCheck.length; i++){
            spellCardCheck[_SpellCardCheck[i][0]] = _SpellCardCheck[i][1];
            bufferSpellIds[i] = _SpellCardCheck[i][0];
        }
        
        for (i = 0; i < _EquipCardCheck.length; i++){
            equipCardCheck[_EquipCardCheck[i][0]] = _EquipCardCheck[i][1];
            bufferEquipIds[i] = _EquipCardCheck[i][0];
        }
        
       cardChecks[msg.sender] = CardCheck(bufferMonsterIds, bufferSpellIds, bufferEquipIds, _FieldCardCheck, _LastResortCardCheck);
    }

    function battleMission(uint _battleId) 
        public 
    {
        Battle storage b = battles[_battleId];
        if(b.playerstate> 0){
            require(sumTotalAttack(b.player2.player)>=sumTotalDefense(b.player1.player));
            b.player1.LifePoint = sumTotalAttack(b.player2.player) - sumTotalDefense(b.player1.player);
        }
        else{
            require(sumTotalAttack(b.player1.player)>=sumTotalDefense(b.player2.player));
            b.player2.LifePoint = sumTotalAttack(b.player1.player) - sumTotalDefense(b.player2.player);
        }

        b.playerstate = 1- b.playerstate;
        if (b.playerstate > 0){
            b.gameTurn++;
        }
    }

    function canUseLastResortCard(uint _battleId) 
        public view 
        returns(bool)
    {     
        Battle storage b = battles[_battleId]; 
        return b.gameTurn >= 5 ? true : false;
    }

    function sumTotalAttack(address monsterOwner) public view returns(uint){
        uint sum = 0;
        for (uint i = 0; i < cardChecks[monsterOwner].MonsterCardIds.length; i++){
            if(monsterCardCheck[cardChecks[monsterOwner].MonsterCardIds[i]] > 0){
                sum+= monsters[monsterOwner][cardChecks[monsterOwner].MonsterCardIds[i]].attackPoint;
            }
        }
        return sum;
    }

    function sumTotalDefense(address monsterOwner) 
        public view 
        returns(uint)
    {
        uint sum = 0;
        for (uint i = 0; i < cardChecks[monsterOwner].MonsterCardIds.length; i++){
            if(monsterCardCheck[cardChecks[monsterOwner].MonsterCardIds[i]] > 0){
                sum+= monsters[monsterOwner][cardChecks[monsterOwner].MonsterCardIds[i]].defensePoint;
            }
        }
        return sum;
    }

    // function _transferOwnership(address recipient)
    //     public onlyOwner
    // {      
    //     transferOwnership(recipient);
    // } 

    function _ownerOfContract() 
        public view 
        returns(address)
    {      
        return owner();
    }

}